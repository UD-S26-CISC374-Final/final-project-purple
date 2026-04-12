import { GameObjects, Scene } from "phaser";
import { EventBus } from "../event-bus";
import type { ChangeableScene } from "../reactable-scene";

// Mode Selector Button Class for Main Game Scren
export class ModeButton extends Phaser.GameObjects.Text {
    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        label: string,
        targetScene: string,
    ) {
        // Add button to screen
        super(scene, x, y, label, {
            backgroundColor: "#000",
            padding: { x: 10, y: 5 },
        });

        // Set button to be clickable and start the scene named in targetScene
        this.setInteractive({ useHandCursor: true });
        this.on("pointerdown", () => {
            scene.scene.start(targetScene);
        });

        scene.add.existing(this);
    }
}

export class MainMenu extends Scene implements ChangeableScene {
    background: GameObjects.Image;
    title: GameObjects.Text;

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

        // Add animation to title to move up and down slowly
        this.tweens.add({
            targets: this.title,
            y: 110, // Move down slightly
            duration: 2000, // Over 2 seconds
            ease: "Power1",
            yoyo: true, // Go back to the original position
            loop: -1, // Loop forever
        });

        // Add mode selector buttons to the screen
        const basicModeSelector = new ModeButton(
            this,
            400,
            400,
            "Basic Mode",
            "Level1",
        );
        const functionModeSelector = new ModeButton(
            this,
            400,
            500,
            "Function Frenzy",
            "Level1",
        );
        const pointerModeSelector = new ModeButton(
            this,
            400,
            600,
            "Pointer Mode",
            "Level1",
        );
        console.log(basicModeSelector);
        console.log(functionModeSelector);
        console.log(pointerModeSelector);

        EventBus.emit("current-scene-ready", this);
    }

    changeScene() {
        this.scene.start("Level1");
    }
}
