import { EventBus } from "../event-bus";
import { Scene } from "phaser";
import FpsText from "../objects/fps-text";

interface Coordinate {
    x: number;
    y: number;
}

// Need to make bin locations (x and y) for each ingredient
const BIN_LOCATIONS: Record<string, Coordinate> = {
    patty: { x: 0, y: 0 },
    bottom_bun: { x: 500, y: 0 },
};

// An ingredient class to represent every ingredient object on the screen
export class Ingredient extends Phaser.GameObjects.Image {
    public isFromBin: boolean;
    public ingredientType: string;

    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        texture: string,
        isFromBin: boolean,
    ) {
        super(scene, x, y, texture);
        this.isFromBin = isFromBin;
        this.ingredientType = texture;

        // Add ingredient to scene
        scene.add.existing(this);
        this.setScale(0.2);
        this.setDepth(100);

        // Enable Input & Hand Cursor
        this.setInteractive({ useHandCursor: true });

        // Enable dragging object
        scene.input.setDraggable(this);
    }
}

export class Level1 extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    //background: Phaser.GameObjects.Image;
    fpsText: FpsText;

    // Save coordinates for center of screen
    private screenCenterX!: number;
    private screenCenterY!: number;

    // Current items on the plate
    private burgerStack: Ingredient[] = [];

    // Current items on the screen
    private activeSprites: Ingredient[] = [];

    private plate!: Phaser.GameObjects.Image;

    constructor() {
        super("Level1");
    }

    private snapToPlate(ingredient: Ingredient): void {
        // Disable the previous top item so you can't grab from the middle
        if (this.burgerStack.length > 0) {
            const previousTop = this.burgerStack[this.burgerStack.length - 1];
            previousTop.disableInteractive();
        }

        // Snap the new ingredient and add to array
        ingredient.x = this.plate.x;
        ingredient.y = this.plate.y - (this.burgerStack.length + 1) * 12;
        this.burgerStack.push(ingredient);

        // Remove ingredient from bin
        ingredient.isFromBin = false;

        // Make the new top item interactive
        ingredient.setInteractive({ useHandCursor: true });

        // Set depth so the new item is always rendered on top
        ingredient.setDepth(this.burgerStack.length + 1);
    }

    create() {
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor(0x00ff00);

        //this.background = this.add.image(512, 384, "background");
        //this.background.setAlpha(0.5);

        this.fpsText = new FpsText(this);

        // Save x and y coordinates for center of screen
        this.screenCenterX =
            this.cameras.main.worldView.x + this.cameras.main.width / 2;
        this.screenCenterY =
            this.cameras.main.worldView.y + this.cameras.main.height / 2;

        // Add plate to the middle of the screen
        this.plate = this.add.image(
            this.screenCenterX,
            this.screenCenterY,
            "plate",
        );
        this.plate.setScale(0.2);

        // Add ingredient bins to screen
        this.activeSprites.push(
            new Ingredient(
                this,
                BIN_LOCATIONS["patty"].x,
                BIN_LOCATIONS["patty"].y,
                "patty",
                true,
            ),
        );
        this.activeSprites.push(
            new Ingredient(
                this,
                BIN_LOCATIONS["bottom_bun"].x,
                BIN_LOCATIONS["bottom_bun"].y,
                "bottom_bun",
                true,
            ),
        );

        // Set up an event listener to watch for when dragging occurs, and update the object's location
        this.input.on(
            "drag",
            (
                pointer: Phaser.Input.Pointer,
                gameObject: Phaser.GameObjects.Image,
                dragX: number,
                dragY: number,
            ) => {
                gameObject.x = dragX;
                gameObject.y = dragY;
                console.log(pointer);
            },
        );

        // Set up event listener to watch for when dragging begins, if item is on top of plate, remove it
        this.input.on(
            "dragstart",
            (pointer: Phaser.Input.Pointer, gameObject: Ingredient) => {
                // Find which item from plate is being dragged
                const index = this.burgerStack.indexOf(gameObject);
                const isTopItem = index === this.burgerStack.length - 1;

                // If the item being dragged is coming from the top of the plate, remove it from array
                if (this.burgerStack.length > 0 && isTopItem) {
                    // Remove the item from the array
                    this.burgerStack.pop();

                    // Visual cue that it's no longer part of the "Struct"
                    gameObject.setDepth(100);

                    // Re-enable the new top item so it's draggable
                    if (this.burgerStack.length > 0) {
                        this.burgerStack[
                            this.burgerStack.length - 1
                        ].setInteractive();
                    }
                }
                // If the patty is from the bin, then spawn a new one in the bin
                else if (gameObject.isFromBin) {
                    const ingredientType: string = gameObject.ingredientType;

                    this.activeSprites.push(
                        new Ingredient(
                            this,
                            BIN_LOCATIONS[ingredientType].x,
                            BIN_LOCATIONS[ingredientType].y,
                            ingredientType,
                            true,
                        ),
                    );
                }

                console.log(pointer);
            },
        );

        // Set up event listener for when object is done being dragged. If on top of plate, add item to plate.
        this.input.on(
            "dragend",
            (pointer: Phaser.Input.Pointer, gameObject: Ingredient) => {
                // Calculate the distance between the ingredient and the plate
                const distance = Phaser.Math.Distance.Between(
                    gameObject.x,
                    gameObject.y,
                    this.plate.x,
                    this.plate.y,
                );

                // If ingredient was dropped close to plate, add it to stack
                if (distance < 60) {
                    this.snapToPlate(gameObject);
                } else {
                    // Destroy ingredient if it misses plate
                    const indexOfDeletedElement: number =
                        this.activeSprites.indexOf(gameObject);
                    if (indexOfDeletedElement > -1) {
                        this.activeSprites.splice(indexOfDeletedElement, 1);
                    }
                    gameObject.destroy();
                    console.log(this.activeSprites);
                }

                console.log(pointer);
            },
        );

        EventBus.emit("current-scene-ready", this);
    }

    update() {
        this.fpsText.update();
    }

    changeScene() {
        this.scene.start("GameOver");
    }
}
