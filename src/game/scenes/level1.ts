import { EventBus } from "../event-bus";
import { Scene } from "phaser";

import PhaserLogo from "../objects/phaser-logo";
import FpsText from "../objects/fps-text";

// An ingredient class to represent every ingredient object on the screen
export class Ingredient extends Phaser.GameObjects.Image {
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, type: string) {
        super(scene, x, y, texture);
        
        // Add ingredient to scene
        scene.add.existing(this);
        this.setScale(0.2);
        
        // Enable Input & Hand Cursor
        this.setInteractive({ useHandCursor: true });
        
        // Enable dragging object
        scene.input.setDraggable(this);
        
        // Store the type of ingredient (patty, cheese)
        this.setData('type', type);
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
    
    private plate!: Phaser.GameObjects.Image;
    private patty!: Phaser.GameObjects.Image;


    constructor() {
        super("Level1");
    }

    create() {
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor(0x00ff00);

        this.background = this.add.image(512, 384, "background");
        this.background.setAlpha(0.5);

        this.fpsText = new FpsText(this);

        this.screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        this.screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

        // Add plate to the middle of the screen
        this.plate = this.add.image(this.screenCenterX, this.screenCenterY, 'plate');
        this.plate.setScale(0.2);

        this.patty = new Ingredient(this, 0, 0, 'patty', 'meat');
        console.log(this.patty);
        this.input.on('drag', (pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.Image, dragX: number, dragY: number) => {
            gameObject.x = dragX;
            gameObject.y = dragY;
            console.log(pointer);
        });

        EventBus.emit("current-scene-ready", this);
    }

    update() {
        this.fpsText.update();
    }

    changeScene() {
        this.scene.start("GameOver");
    }
}
