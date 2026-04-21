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
    //private accuracyTableText!: Phaser.GameObjects.Text;

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
            .text(centerX, 40, `Game Over\nScore: ${this.score}`, {
                fontSize: "32px",
                color: "#000000",
                fontFamily: "Arial",
                fontStyle: "bold",
            })
            .setOrigin(0.5, 0.5);
        console.log(this.scoreText);

        // Style for header of table
        const headerStyle: Phaser.Types.GameObjects.Text.TextStyle = {
            fontSize: "24px", // 32px might be too wide for 3 columns on smaller screens
            color: "#000000",
            fontFamily: "Arial",
            fontStyle: "bold",
        };

        // Style for rows of table
        const rowStyle: Phaser.Types.GameObjects.Text.TextStyle = {
            fontSize: "20px", // 32px might be too wide for 3 columns on smaller screens
            color: "#000000",
            fontFamily: "Arial",
        };

        // Positions for table
        const columnWidth = 250;
        const startX = centerX - columnWidth;
        const headerY = centerY / 4;
        const rowHeight = 40;
        const startY = headerY + 50;

        // Draw the header for the table
        const headers = [
            { text: "Question Category", x: startX },
            { text: "Accuracy", x: centerX },
            { text: "Total Questions", x: startX + columnWidth * 2 },
        ];

        headers.forEach((h) => {
            this.add
                .text(h.x, headerY, h.text, headerStyle)
                .setOrigin(0.5, 0.5);
        });
        // Draw a red line at startX to see where the text should be touching
        this.add
            .graphics()
            .lineStyle(2, 0x0)
            .lineBetween(120, headerY + 30, centerX + 350, headerY + 30);

        let index: number = 0;

        // Loop through each category and calculate the percent of questions answered correctly
        for (const [category, totalCategoryQuestions] of Object.entries(
            this.totalCategoriesAnswered,
        )) {
            const incorrectCount =
                this.incorrectCategoriesAnswered[category] ?? 0;
            const yPos = startY + index * rowHeight;
            let accuracy: number = 0;

            // Calculate the % correct for each category
            if (totalCategoryQuestions > 0) {
                accuracy = (1 - incorrectCount / totalCategoryQuestions) * 100;
                accuracy = Math.round(accuracy);
            }

            // Row Column 1: Category Name (Left Aligned)
            this.add.text(startX, yPos, category, rowStyle).setOrigin(0.5, 0.5);

            // Row Column 2: Accuracy (Centered)
            //const accColor = accuracy >= 70 ? "#008800" : "#aa0000"; // Green for pass, Red for fail

            this.add
                .text(centerX, yPos, `${accuracy}%`, rowStyle)
                .setOrigin(0.5, 0.5);

            // Row Column 3: Total Questions (Right Aligned or Offset)
            this.add
                .text(
                    startX + columnWidth * 2,
                    yPos,
                    totalCategoryQuestions.toString(),
                    rowStyle,
                )
                .setOrigin(1, 0.5);

            index++;
        }

        /*
        this.accuracyTableText = this.add
            .text(centerX, centerY + 200, accuracyTable, {
                fontSize: "32px",
                color: "#000000",
                fontFamily: "Arial",
                fontStyle: "bold",
            })
            .setOrigin(0.5, 0.5);
        console.log(this.accuracyTableText);*/

        EventBus.emit("current-scene-ready", this);
    }

    changeScene() {
        this.scene.start("MainMenu");
    }
}
