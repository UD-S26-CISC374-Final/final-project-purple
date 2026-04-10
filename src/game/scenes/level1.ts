import { EventBus } from "../event-bus";
import { Scene } from "phaser";

import PhaserLogo from "../objects/phaser-logo";
import FpsText from "../objects/fps-text";

// Need to make bin locations (x and y) for each ingredient

// An ingredient class to represent every ingredient object on the screen
export class Ingredient extends Phaser.GameObjects.Image {
    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        texture: string,
        type: string,
    ) {
        super(scene, x, y, texture);

        // Add ingredient to scene
        scene.add.existing(this);
        this.setScale(0.2);

        // Enable Input & Hand Cursor
        this.setInteractive({ useHandCursor: true });

        // Enable dragging object
        scene.input.setDraggable(this);

        // Store the type of ingredient (patty, cheese)
        this.setData("type", type);
    }
}

export class Level1 extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    phaserLogo: PhaserLogo;
    fpsText: FpsText;

    // Save coordinates for center of screen
    private screenCenterX!: number;
    private screenCenterY!: number;

    // Current items on the plate
    private burgerStack: Ingredient[] = [];

    private plate!: Phaser.GameObjects.Image;
    private patty!: Phaser.GameObjects.Image;

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
        ingredient.setDepth(this.burgerStack.length + 1);

        this.burgerStack.push(ingredient);

        // Make the new top item IS interactive
        ingredient.setInteractive({ useHandCursor: true });

        // Set depth so the new item is always rendered on top
        ingredient.setDepth(this.burgerStack.length + 1);

        // Trigger "Success" visual on the plate
        this.plate.setTint(0x00ff00);
        this.time.delayedCall(200, () => this.plate.clearTint());
    }

    create() {
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor(0x00ff00);

        this.background = this.add.image(512, 384, "background");
        this.background.setAlpha(0.5);

        this.fpsText = new FpsText(this);

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

        // Add patty to (0, 0) and enable it to be draggable
        this.patty = new Ingredient(this, 0, 0, "patty", "meat");
        console.log(this.patty);

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
                // Find where item is on plate
                const index = this.burgerStack.indexOf(gameObject);
                const isTopItem = index === this.burgerStack.length - 1;

                // If the item being dragged is coming from the top of the plate, remove it
                if (isTopItem) {
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
                    // Return to the ingredient bin with the corresponding coordinates if they missed
                    gameObject.x = 0;
                    gameObject.y = 0;
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
