import { EventBus } from "../event-bus";
import { Scene } from "phaser";
import type { FinalStats } from "./level1";

export class GameOver extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    //background: Phaser.GameObjects.Image;

    private score: number;
    private scoreText!: Phaser.GameObjects.Text;

    constructor() {
        super("GameOver");
    }

    init(gameData: FinalStats) {
        this.score = gameData.final_score;
    }

    create() {
        this.camera = this.cameras.main;
        //this.camera.setBackgroundColor(0xff0000);

        //this.background = this.add.image(512, 384, "background");
        //this.background.setAlpha(0.5);

        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;

        this.scoreText = this.add
            .text(centerX, centerY, `Game Over\nScore: ${this.score}`, {
                fontSize: "32px",
                color: "#000000",
                fontFamily: "Arial",
                fontStyle: "bold",
            })
            .setOrigin(0.5, 0.5);
        console.log(this.scoreText);

        EventBus.emit("current-scene-ready", this);
    }

    changeScene() {
        this.scene.start("MainMenu");
    }
}
