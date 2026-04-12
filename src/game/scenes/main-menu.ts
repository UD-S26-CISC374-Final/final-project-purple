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

    constructor() {
        super("MainMenu");
    }

    create() {
        this.background = this.add.image(512, 384, "background");

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
