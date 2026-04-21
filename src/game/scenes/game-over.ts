import { EventBus } from "../event-bus";
import { Scene } from "phaser";
import type { FinalStats } from "./level1";

export class GameOver extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    //background: Phaser.GameObjects.Image;

    // Score tracking variables
    private score: number;
    private scoreText!: Phaser.GameObjects.Text;

    // Variables for tracking question analytics by category
    private totalCategoriesAnswered: Record<string, number> = {};
    private incorrectCategoriesAnswered: Record<string, number> = {};
    private accuracyTableText!: Phaser.GameObjects.Text;

    constructor() {
        super("GameOver");
    }

    // Save the analytics data from the game
    init(gameData: FinalStats) {
        this.score = gameData.final_score;
        this.totalCategoriesAnswered = gameData.totalCategoriesAnswered;
        this.incorrectCategoriesAnswered = gameData.incorrectCategoriesAnswered;
    }

    create() {
        this.camera = this.cameras.main;
        //this.camera.setBackgroundColor(0xff0000);

        //this.background = this.add.image(512, 384, "background");
        //this.background.setAlpha(0.5);

        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;

        // Display the score in the center of the screen
        this.scoreText = this.add
            .text(centerX, centerY, `Game Over\nScore: ${this.score}`, {
                fontSize: "32px",
                color: "#000000",
                fontFamily: "Arial",
                fontStyle: "bold",
            })
            .setOrigin(0.5, 0.5);
        console.log(this.scoreText);

        console.log(this.totalCategoriesAnswered);
        console.log(this.incorrectCategoriesAnswered);

        let accuracyTable: string = "";

        // Loop through each category and calculate the percent of questions answered correctly
        for (const [category, totalCategoryQuestions] of Object.entries(
            this.totalCategoriesAnswered,
        )) {
            const incorrectCount =
                this.incorrectCategoriesAnswered[category] ?? 0;
            let accuracy: number = 0;

            // Calculate the % correct for each category
            if (totalCategoryQuestions > 0) {
                accuracy = (1 - incorrectCount / totalCategoryQuestions) * 100;
                accuracy = Math.round(accuracy);
            }

            accuracyTable += `\n${category}: ${accuracy}% ${totalCategoryQuestions}`;
        }
        console.log(accuracyTable);

        this.accuracyTableText = this.add
            .text(centerX, centerY + 200, accuracyTable, {
                fontSize: "32px",
                color: "#000000",
                fontFamily: "Arial",
                fontStyle: "bold",
            })
            .setOrigin(0.5, 0.5);
        console.log(this.accuracyTableText);

        EventBus.emit("current-scene-ready", this);
    }

    changeScene() {
        this.scene.start("MainMenu");
    }
}
