import { GameObjects, Scene } from "phaser";
import { EventBus } from "../event-bus";
import type { ChangeableScene } from "../reactable-scene";

// Mode Selector Button Class for Main Game Scren
export class SelectorButton extends Phaser.GameObjects.Container {
    private buttonBackground: Phaser.GameObjects.Graphics;
    private label: Phaser.GameObjects.Text;
    private buttonOutline: Phaser.GameObjects.Graphics;

    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        text: string,
        width: number = 200,
        height: number = 60,
    ) {
        super(scene, x, y);

        // Draw the button background
        this.buttonBackground = scene.add.graphics();
        this.buttonBackground.fillStyle(0x2ecc71, 1);
        this.buttonBackground.fillRoundedRect(
            -width / 2,
            -height / 2,
            width,
            height,
            15,
        );

        // Draw text for button
        this.label = scene.add.text(0, 0, text, {
            fontSize: "24px",
            color: "#ffffff",
            fontStyle: "bold",
            fontFamily: "Arial", // Or a "terminal" font for your networking game
        });

        // Center the text inside the button
        this.label.setOrigin(0.5);

        // Set the container's internal size
        this.setSize(width, height);

        // Make button interactive
        this.setInteractive({ useHandCursor: true });

        // Create an outline for the button that is only shown when the button is hovered over
        this.buttonOutline = scene.add.graphics();
        this.buttonOutline.lineStyle(4, 0xffffff, 1);
        this.buttonOutline.strokeRoundedRect(
            -width / 2,
            -height / 2,
            width,
            height,
            15,
        );
        this.buttonOutline.setVisible(false);

        // Add the button, label, and outline to the container
        this.add([this.buttonBackground, this.label, this.buttonOutline]);

        // Make button increase size when hovered over
        this.on("pointerover", () => {
            scene.tweens.add({
                targets: this,
                scale: 1.1,
                duration: 100,
                ease: "Back.easeOut",
            });
            this.buttonOutline.setVisible(true);
        });
        this.on("pointerout", () => {
            scene.tweens.add({
                targets: this,
                scale: 1.0,
                duration: 100,
                ease: "Power1",
            });
            this.buttonOutline.setVisible(false);
        });

        // Add button container to screen
        scene.add.existing(this);
    }
}

export class MainMenu extends Scene implements ChangeableScene {
    background: GameObjects.Image;
    title: GameObjects.Text;
    modeButtons: SelectorButton[] = [];

    constructor() {
        super("MainMenu");
    }

    create() {
        this.background = this.add.image(512, 384, "background");

        const centerX: number = this.cameras.main.width / 2;

        // Add title to the top center of the screen
        this.title = this.add.text(centerX, 80, "That's Not My Programmer", {
            fontSize: "64px",
            color: "#000000",
            stroke: "#000000",
            strokeThickness: 6,
        });
        this.title.setOrigin(0.5);

        // Add animation to title text to move up and down slowly
        this.tweens.add({
            targets: this.title,
            y: 110, // Move down slightly
            duration: 2000, // Over 2 seconds
            ease: "Power1",
            yoyo: true, // Go back to the original position
            loop: -1, // Loop forever
        });

        // Add mode selector buttons to the screen, and have them start their scenes when pressed
        this.modeButtons.push(
            new SelectorButton(this, centerX, 400, "Basic Mode").on(
                "pointerdown",
                () => this.scene.start("Level1"),
            ),
            new SelectorButton(this, centerX, 500, "Function Frenzy").on(
                "pointerdown",
                () => this.scene.start("Level1"),
            ),
            new SelectorButton(this, centerX, 600, "Pointer Mode").on(
                "pointerdown",
                () => this.scene.start("Level1"),
            ),
        );

        EventBus.emit("current-scene-ready", this);
    }

    changeScene() {
        this.scene.start("Level1");
    }
}
