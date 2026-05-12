import { EventBus } from "../event-bus";
import { Scene } from "phaser";
import FpsText from "../objects/fps-text";
import { SelectorButton, type ModeInfo } from "./main-menu";
import { type Question, QUESTION_BANK } from "../data/questions";

/** An interface representing coordinates for an object, has a starting x and starting y
 *
 * Fields:
 *  x: number, the x coordinate of the object
 *  y: number, the y coordinate of the object
 */
interface Coordinate {
    x: number;
    y: number;
}
/**
 * Scales text to fit within the given width and height by reducing the font size until it fits
 * @param fontSize The starting font size of the text   * @param maxWidth The maximum width the text can be before it needs to be scaled down
 * @param maxHeight The maximum height the text can be before it needs to be scaled down
 * @param text The text object to scale
 *
 * Side Effects: Modifies the font size of the text snippet
 */
function scaleText(
    fontSize: number,
    maxWidth: number,
    maxHeight: number,
    text: Phaser.GameObjects.Text,
): void {
    // Font size of the code snippet
    text.setFontSize(fontSize);

    // The width and height of the TV (configurable)

    // Keep reducing the font size while the code snippet is larger than the screen
    while (text.displayWidth > maxWidth || text.displayHeight > maxHeight) {
        // Decrease and update the font size
        fontSize = Math.floor(fontSize * 0.9);
        text.setFontSize(fontSize);
        text.updateText();
    }
}

/** An interface representing the final stats. Contains final score, total questions answered by category, and the total number of incorrect questions by category
 *
 *
 */
export interface FinalStats {
    final_score: number;
    totalCategoriesAnswered: Record<string, number>;
    incorrectCategoriesAnswered: Record<string, number>;
    gameMode: string;
}

// Lookup table for an ingredient's starting location
const BIN_LOCATIONS: Record<string, Coordinate> = {
    patty: { x: 70, y: 400 },
    bottom_bun: { x: 70, y: 485 },
    top_bun: { x: 250, y: 495 },
    cheese: { x: 250, y: 400 },
    lettuce: { x: 250, y: 600 },
    tomato: { x: 70, y: 600 },
};

// Lookup table for an ingredient's sprite scale
const SPRITE_SCALES: Record<string, number> = {
    patty: 0.11,
    bottom_bun: 0.11,
    top_bun: 0.11,
    cheese: 0.15,
    lettuce: 0.11,
    tomato: 0.1,
    plate: 0.16,
    screen: 0.13,
};

// Lookup table for an ingredient's height, used for determining ingredient placement on the plate
const INGREDIENT_HEIGHTS: Record<string, number> = {
    patty: 20,
    bottom_bun: 12,
    top_bun: 20,
    cheese: 5,
    lettuce: 12,
    tomato: 5,
};

/** An ingredient class to represent every ingredient object on the screen
 *
 * Fields:
 * scene: Phaser.Scene, the scene to add the ingredient to
 * x: number, the x coordinate of the ingredient
 * y: number, the y coordinate of the ingredient
 * texture: string, the ingredient type (ex: patty, lettuce)
 * isFromBin: boolean, whether ingredient is in starting bin
 */
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
        this.setScale(SPRITE_SCALES[this.ingredientType]);
        this.setDepth(100);

        // Enable Input & Hand Cursor
        this.setInteractive({
            useHandCursor: true,
            pixelPerfect: true,
            alphaTolerance: 1,
        });

        // Enable dragging object
        scene.input.setDraggable(this);

        // Highlight ingredient when the mouse hovers over it
        this.on("pointerover", () => {
            // color, outerStrength, innerStrength, knockout
            this.postFX.addGlow(0xffbf00, 5, 0, false);
        });
        this.on("pointerout", () => {
            // Remove glow when mouse is removed
            this.postFX.clear();
        });
    }
}

/** An order class to represent the current code snippet
 *
 * Fields:
 * scene: Phaser.Scene, the scene to add the code snippet to
 * x: number, the x coordinate of the order
 * y: number, the y coordinate of the order
 * orderType: string, the code snippet contents
 * answer: string[], the list of correct ingredients
 * orderScreen: the TV order screen (used for code snippet size scaling)
 */
export class Order extends Phaser.GameObjects.Container {
    public orderType: string;
    public text: Phaser.GameObjects.Text;
    public targetType: string;
    public target: Phaser.GameObjects.Text;
    public answer: string[];
    public category: string;
    public orderScreen: Phaser.GameObjects.Image;
    public explanation: string;
    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        orderType: string,
        targetType: string,
        answer: string[],
        category: string,
        explanation: string,
    ) {
        super(scene, x, y);

        const screenCenterX =
            scene.cameras.main.worldView.x + scene.cameras.main.width / 2;

        // Add Order TV to the sreen
        this.orderScreen = scene.add
            .image(screenCenterX * 2 + 80, -115, "screen")
            .setScale(SPRITE_SCALES["screen"])
            .setOrigin(1, 0);

        // Initialize the details of the order
        this.orderType = orderType;
        this.category = category;
        this.answer = answer;
        this.explanation = explanation;

        // Update code snippet and its size
        this.text = scene.add
            .text(x, y, orderType, { fontSize: "24px", color: "white" })
            .setOrigin(0.5);
        scaleText(
            24,
            this.orderScreen.displayWidth - 185,
            this.orderScreen.displayHeight - 280,
            this.text,
        );

        // Update current order to make
        this.target = scene.add
            .text(10, 150, "Current Order:\n'" + targetType + "'", {
                fontSize: "30px",
                color: "white",
                backgroundColor: "black",
            })
            .setOrigin(0);

        scene.add.existing(this);
    }

    /**
     * Updates the order to the new question and answer
     * @param newQuestion The new question in the code snippet
     * @param newAnswer The new answer for the code snippet
     * @param newCategory The new category for the code snippet
     */
    public updateOrder(
        newQuestion: string,
        newAnswer: string[],
        newTarget: string,
        newCategory: string,
        newExplanation: string,
    ) {
        // Update order details
        this.orderType = newQuestion;
        this.answer = newAnswer;
        this.targetType = newTarget;
        this.category = newCategory;
        this.explanation = newExplanation;

        // Update code snippet text on TV and scale the text
        this.text.setText(newQuestion);
        scaleText(
            24,
            this.orderScreen.displayWidth - 185,
            this.orderScreen.displayHeight - 280,
            this.text,
        );
        this.target.setText(newTarget);
    }
}

export class Level1 extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    fpsText: FpsText;

    // Save coordinates for center of screen
    private screenCenterX!: number;
    private screenCenterY!: number;

    // Current items on the plate
    private burgerStack: Ingredient[];

    // Current items on the screen
    private activeSprites: Ingredient[];

    // Plate and plate hitbox
    private plate!: Phaser.GameObjects.Image;
    private plateHitBox: Phaser.Geom.Rectangle;
    //private debugGraphics: Phaser.GameObjects.Graphics;

    // Buttons on screen
    private confirmButton: SelectorButton;
    private clearPlateButton: SelectorButton;
    private explanationButton: SelectorButton;
    private mainMenuButton: SelectorButton;

    private currentOrder: Order;

    private plates: Phaser.GameObjects.Image[];

    // Question tracking variables
    private gameMode: string;
    private questions: Question[];
    private questionIndex: number;
    private numQuestionsAnswered: number;
    private totalCategoriesAnswered: Record<string, number>;
    private incorrectCategoriesAnswered: Record<string, number>;

    // Score tracking
    private score: number;
    private scoreText!: Phaser.GameObjects.Text;

    // Create the timer
    private timerX = 5;
    private timerY = 100;
    private timerWidth = 300;
    private timerHeight = 30;
    private timerRadius = this.timerHeight / 2;
    private timerOffset = 5;

    // Creates Explanation
    private orderExplanation: Phaser.GameObjects.Text;
    private orderAnswer: Phaser.GameObjects.Text;

    // Sound effects
    private popSound: Phaser.Sound.BaseSound;
    private cheeseSplatSound: Phaser.Sound.BaseSound;
    private lettuceCrunchSound: Phaser.Sound.BaseSound;
    private tomatoSquishSound: Phaser.Sound.BaseSound;
    private bunThudSound: Phaser.Sound.BaseSound;
    private pattyMooSound: Phaser.Sound.BaseSound;

    // Correct and incorrect answer sounds
    private correctSound: Phaser.Sound.BaseSound;
    private incorrectSound: Phaser.Sound.BaseSound;

    constructor() {
        super("Level1");
    }
    /**
     * Returns the current height of the burger
     */
    private getBurgerHeight(): number {
        // Calculate height of burger stack
        let stackHeight: number = 0;
        this.burgerStack.forEach((currentIngredient: Ingredient) => {
            stackHeight +=
                INGREDIENT_HEIGHTS[currentIngredient.ingredientType] ?? 10;
        });

        return stackHeight;
    }

    /**
     * Adds the given ingredient to the plate
     * @param ingredient The current ingredient to add to the plate
     *
     * Notes: Adds ingredient to burgerStack array
     */
    private snapToPlate(ingredient: Ingredient): void {
        // Disable the previous top item so you can't grab from the middle
        if (this.burgerStack.length > 0) {
            const previousTop = this.burgerStack[this.burgerStack.length - 1];
            previousTop.disableInteractive();
        }

        const stackHeight: number = this.getBurgerHeight();

        // Snap the new ingredient and add to array
        ingredient.x = this.plate.x;
        ingredient.y = this.plate.y - stackHeight;
        this.burgerStack.push(ingredient);
        if (ingredient.ingredientType === "cheese") {
            this.cheeseSplatSound.play();
        } else if (ingredient.ingredientType === "lettuce") {
            this.lettuceCrunchSound.play();
        } else if (ingredient.ingredientType === "tomato") {
            this.tomatoSquishSound.play();
        } else if (
            ingredient.ingredientType === "bottom_bun" ||
            ingredient.ingredientType === "top_bun"
        ) {
            this.bunThudSound.play();
        } else if (ingredient.ingredientType === "patty") {
            this.pattyMooSound.play();
        } else {
            this.popSound.play();
        }

        // Move the top bun up
        if (ingredient.ingredientType === "top_bun") {
            ingredient.y -= 25;
        }

        // Remove ingredient from bin
        ingredient.isFromBin = false;

        // Make the new top item interactive
        ingredient.setInteractive({ useHandCursor: true });

        // Set depth so the new item is always rendered on top
        ingredient.setDepth(this.burgerStack.length + 1);

        // Increase plate hitbox height as long as it doesn't go offscreen
        const ingredientHeight: number =
            INGREDIENT_HEIGHTS[ingredient.ingredientType] ?? 10;
        const newHitboxY = this.plateHitBox.y - ingredientHeight;
        if (newHitboxY >= 0) {
            this.plateHitBox.y = newHitboxY;
            this.plateHitBox.height += ingredientHeight;
        }
    }

    /**
     * Removes all ingredients from the plate and reset plate hitbox
     *
     * Notes:
     * Destroys all ingredient objects on plate
     * Resets plate hitbox
     */
    private clearPlate(): void {
        // Loop through burger stack and destroy all elements, and remove them from activeSprites list
        this.burgerStack.forEach((currentIngredient: Ingredient) => {
            const activeSpritesIndex: number =
                this.activeSprites.indexOf(currentIngredient);
            if (activeSpritesIndex > -1) {
                this.activeSprites.splice(activeSpritesIndex, 1);
            }
            currentIngredient.destroy();
        });

        this.burgerStack = [];

        // Reset plate hitbox size
        const plateHeight = this.plate.displayHeight;
        const hitboxHeight = plateHeight + 100;
        const topLeftCornerY = this.plate.y - plateHeight / 2 - 100;

        this.plateHitBox.height = hitboxHeight;
        this.plateHitBox.y = topLeftCornerY;
    }

    /**
     *  Check if the burger the player created is the same as the answer
     * @param answer The array of ingredients required in the answer
     * @param order The array of ingredients made by the player
     * @returns boolean, true if the orders match
     */
    private CheckOrder(answer: string[], order: string[]): boolean {
        // If there are not the same amount of ingredients, return false
        if (answer.length !== order.length) {
            //this.changeScene();
            console.log("not long enough");
            console.log(
                "order: [" +
                    order.join(", ") +
                    "]\nanswer: [" +
                    answer.join(", ") +
                    "]",
            );
            return false;
        }
        //checks if buns are present if they are supposed to be
        if (
            answer[0] === "bottom_bun" &&
            answer[answer.length - 1] === "top_bun" &&
            (order[0] !== "bottom_bun" || order[order.length - 1] !== "top_bun")
        ) {
            console.log("bun check failed");
            return false;
        }
        // Compare the order to the answer
        for (let i = 0; i < answer.length; i++) {
            if (answer[i] !== order[i]) {
                return false;
            }
        }

        return true;
    }

    /**
     * Display the explanation for the previous question if the player got it wrong
     */
    private displayExplanation(): void {
        const explanationText = this.add
            .text(0, 0, this.orderExplanation.text, {
                color: "#0",
            })
            .setOrigin(0.5, 0.5);

        // Create the popup container in the middle of the screen
        const popupWidth: number = explanationText.displayWidth + 20;
        const popupHeight: number = this.screenCenterY;
        const headerY: number = -(popupHeight / 2) + 25;
        const popupContainer = this.add.container(
            this.screenCenterX,
            this.screenCenterY,
        );

        const headerText = this.add
            .text(0, -popupHeight / 2 + 20, "Explanation", {
                color: "0x0",
                fontStyle: "bold",
                fontSize: "30px",
            })
            .setOrigin(0.5);

        // Configure the background for the popup to be a beige rounded rectangle
        const background = this.add.graphics();
        background.fillStyle(0xede8d0, 1);
        background.fillRoundedRect(
            -(popupWidth / 2),
            -(popupHeight / 2),
            popupWidth,
            popupHeight,
            20,
        );

        // Create the "X" Close Button
        const closeButton = this.add
            .text(popupWidth / 2 - 20, headerY, "X", {
                fontSize: "32px",
                color: "#ff0000",
                fontStyle: "bold",
            })
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true });
        closeButton.on("pointerdown", () => {
            popupContainer.destroy();
        });

        // Add background, title, arrows, description, video, and close button to the popup container
        popupContainer.add([
            background,
            headerText,
            explanationText,
            closeButton,
        ]);
        popupContainer.setDepth(1000);
    }

    /**
     * Display and set up:
     *  - Confirm button
     *  - Clear plate button
     *  - Explanation button
     *  - Main menu button
     */
    private displayButtons(): void {
        // Add confirm button to screen
        this.confirmButton = new SelectorButton(
            this,
            this.screenCenterX + 100,
            this.screenCenterY + 300,
            "Confirm",
            140,
        );

        // When confirm button pressed, check if question was answered correctly
        this.confirmButton.on("pointerdown", () => {
            // Makes the text pop out, regardless of whether the answer was correct or not
            if (!this.tweens.isTweening(this.scoreText)) {
                this.tweens.add({
                    targets: this.scoreText,
                    scale: 1.5,
                    duration: 300,
                    yoyo: true,
                    ease: "Power1",
                });
            }

            // Check if the question was answered correctly
            if (
                this.CheckOrder(
                    this.burgerStack.map(
                        (ingredient) => ingredient.ingredientType,
                    ),
                    this.currentOrder.answer,
                )
            ) {
                // Play correct sound effect
                this.correctSound.play();

                // Increment the player's score
                this.score++;
                this.scoreText.setText(`Score: ${this.score}`);

                //flashes the text green
                this.scoreText.setTint(0x00ff00);
                this.tweens.addCounter({
                    from: 0,
                    to: 100,
                    duration: 1000,
                    onUpdate: (tween) => {
                        const value = tween.getValue() ?? 0;

                        const colorObject =
                            Phaser.Display.Color.Interpolate.ColorWithColor(
                                Phaser.Display.Color.ValueToColor(0x00ff00),
                                Phaser.Display.Color.ValueToColor(0xffffff),
                                100,
                                value,
                            );

                        const color = Phaser.Display.Color.GetColor(
                            colorObject.r,
                            colorObject.g,
                            colorObject.b,
                        );
                        this.scoreText.setTint(color);
                    },
                });
                this.explanationButton.setVisible(false);
                this.orderAnswer.setVisible(false);
            } else {
                // Increment the count of incorrect questions for that category of question
                this.incorrectCategoriesAnswered[
                    this.questions[this.questionIndex].category
                ] =
                    (this.incorrectCategoriesAnswered[
                        this.questions[this.questionIndex].category
                    ] ?? 0) + 1;
                // Play incorrect sound effect
                this.incorrectSound.play();
                //flash the text red
                this.scoreText.setTint(0xff0000);
                this.tweens.addCounter({
                    from: 0,
                    to: 100,
                    duration: 1000,
                    onUpdate: (tween) => {
                        const value = tween.getValue() ?? 0;

                        const colorObject =
                            Phaser.Display.Color.Interpolate.ColorWithColor(
                                Phaser.Display.Color.ValueToColor(0xff0000),
                                Phaser.Display.Color.ValueToColor(0xffffff),
                                100,
                                value,
                            );

                        const color = Phaser.Display.Color.GetColor(
                            colorObject.r,
                            colorObject.g,
                            colorObject.b,
                        );
                        this.scoreText.setTint(color);
                    },
                });
                this.orderExplanation.setText(this.currentOrder.explanation);
                this.orderAnswer.setText(
                    "Answer is:\n[" + this.currentOrder.answer.join(", ") + "]",
                );
                scaleText(70, 475, 400, this.orderExplanation);
                this.explanationButton.setVisible(true);
                this.orderAnswer.setVisible(true);
            }

            // Clear the plate and display the next question
            this.clearPlate();

            // Increment the total count for that category of question
            this.totalCategoriesAnswered[
                this.questions[this.questionIndex].category
            ] =
                (this.totalCategoriesAnswered[
                    this.questions[this.questionIndex].category
                ] ?? 0) + 1;

            // Display the next question
            this.questionIndex = Math.floor(
                Math.random() * this.questions.length,
            );
            this.currentOrder.updateOrder(
                this.questions[this.questionIndex].question,
                this.questions[this.questionIndex].answer,
                "Current Order:\n'" +
                    this.questions[this.questionIndex].target +
                    "'",
                this.questions[this.questionIndex].category,
                this.questions[this.questionIndex].explanation,
            );

            this.numQuestionsAnswered++;
        });

        this.explanationButton = new SelectorButton(
            this,
            80,
            this.scale.height - 80,
            "Explanation",
            140,
            40,
        ).setVisible(false);
        this.explanationButton.on("pointerdown", () => {
            this.displayExplanation();
        });

        // Add clear plate button to the screen and have it clear the plate when clicked
        this.clearPlateButton = new SelectorButton(
            this,
            this.screenCenterX - 100,
            this.screenCenterY + 300,
            "Clear Plate",
            140,
        ).on("pointerdown", () => this.clearPlate());
        console.log(this.clearPlateButton);

        // Add main menu button to bottom right corner of screen
        this.mainMenuButton = new SelectorButton(
            this,
            this.scale.width - 80,
            this.scale.height - 20,
            "Main Menu",
            140,
            40,
        ).on("pointerdown", () => this.scene.start("MainMenu"));
        console.log(this.mainMenuButton);
    }

    /**
     * Create the plate and hitbox for ingredients to be dropped on
     *
     * Notes:
     * The hitbox is larger than the plate by 50 pixels on each side and 100 pixels on top
     * Saves the hitbox to this.plateHitBox
     */
    private createPlateHitbox(): void {
        // Add plate to the middle of the screen
        this.plate = this.add.image(
            this.screenCenterX,
            this.screenCenterY + 200,
            "plate",
        );
        this.plate.setScale(SPRITE_SCALES["plate"]);

        // Plate hitbox dimensions
        const plateWidth = this.plate.displayWidth;
        const plateHeight = this.plate.displayHeight;
        const hitboxWidth = plateWidth + 100;
        const hitboxHeight = plateHeight + 100;

        // Coordinates of top left of hitbox
        const topLeftCornerX = this.plate.x - plateWidth / 2 - 50;
        const topLeftCornerY = this.plate.y - plateHeight / 2 - 100;

        // Save the dropzone as a rectangle over the plate
        const dropZone = new Phaser.Geom.Rectangle(
            topLeftCornerX,
            topLeftCornerY,
            hitboxWidth,
            hitboxHeight,
        );
        this.plateHitBox = dropZone;

        /*
        // Draw hitbox for debugging
        this.debugGraphics = this.add.graphics();
        this.debugGraphics.lineStyle(2, 0x0, 1); // 2px thick, Green, 100% visible

        // Draw the plate hitbox
        this.debugGraphics.strokeRectShape(this.plateHitBox);
        this.debugGraphics.fillStyle(0x0, 0.2);
        this.debugGraphics.fillRectShape(this.plateHitBox);*/
    }

    /**
     * Displays ingredient bins and the plates underneath them
     *
     * Side Effects:
     * Modifies this.plates array
     * Modifies this.activeSprites array
     */
    private displayIngredientBins(): void {
        // Display the plates where the ingredients sit
        this.plates.push(
            this.add
                .image(70, 400, "plate")
                .setScale(SPRITE_SCALES["plate"] * 0.6),
            this.add
                .image(70, 500, "plate")
                .setScale(SPRITE_SCALES["plate"] * 0.6),
            this.add
                .image(250, 500, "plate")
                .setScale(SPRITE_SCALES["plate"] * 0.6),
            this.add
                .image(250, 400, "plate")
                .setScale(SPRITE_SCALES["plate"] * 0.6),
            this.add
                .image(250, 600, "plate")
                .setScale(SPRITE_SCALES["plate"] * 0.6),
            this.add
                .image(70, 600, "plate")
                .setScale(SPRITE_SCALES["plate"] * 0.6),
        );

        // Add ingredient bins to screen
        this.activeSprites.push(
            new Ingredient(
                this,
                BIN_LOCATIONS["patty"].x,
                BIN_LOCATIONS["patty"].y,
                "patty",
                true,
            ),
            new Ingredient(
                this,
                BIN_LOCATIONS["bottom_bun"].x,
                BIN_LOCATIONS["bottom_bun"].y,
                "bottom_bun",
                true,
            ),
            new Ingredient(
                this,
                BIN_LOCATIONS["top_bun"].x,
                BIN_LOCATIONS["top_bun"].y,
                "top_bun",
                true,
            ),
            new Ingredient(
                this,
                BIN_LOCATIONS["cheese"].x,
                BIN_LOCATIONS["cheese"].y,
                "cheese",
                true,
            ),
            new Ingredient(
                this,
                BIN_LOCATIONS["lettuce"].x,
                BIN_LOCATIONS["lettuce"].y,
                "lettuce",
                true,
            ),
            new Ingredient(
                this,
                BIN_LOCATIONS["tomato"].x,
                BIN_LOCATIONS["tomato"].y,
                "tomato",
                true,
            ),
        );
    }

    /**
     * Creates the timer and timer countdown
     */
    private createTimer(): void {
        // Create timer bar
        const timerBackground = this.add.graphics();
        timerBackground.fillStyle(0xd4d4d4, 1);
        timerBackground.fillRoundedRect(
            this.timerX - this.timerOffset,
            this.timerY - this.timerOffset,
            this.timerWidth + 2 * this.timerOffset,
            this.timerHeight + 2 * this.timerOffset,
            this.timerRadius + this.timerOffset,
        );

        const currentColor = { color: 0x00ff00 };

        this.tweens.addCounter({
            from: 0,
            to: 100,
            duration: 1000,
            yoyo: true,
            repeat: -1,
            onUpdate: (tween) => {
                const value = tween.getValue() ?? 0;
                const colorObject =
                    Phaser.Display.Color.Interpolate.ColorWithColor(
                        Phaser.Display.Color.ValueToColor(0x00ff00),
                        Phaser.Display.Color.ValueToColor(0xabffab),
                        100,
                        value,
                    );
                currentColor.color = Phaser.Display.Color.GetColor(
                    colorObject.r,
                    colorObject.g,
                    colorObject.b,
                );
            },
        });

        const timerBar = this.add.graphics();
        timerBar.fillStyle(0x00ff00, 1);

        // Decrease timer in timer bar and switch to Game Over screen when time is up
        let progress = 1.0;
        this.time.addEvent({
            delay: 20,
            callback: () => {
                if (progress - 0.1 > 0) {
                    progress -= 0.0001;
                    timerBar.clear();
                    timerBar.fillStyle(currentColor.color, 1);
                    timerBar.fillRoundedRect(
                        this.timerX,
                        this.timerY,
                        this.timerWidth * progress,
                        this.timerHeight,
                        this.timerRadius,
                    );
                } else {
                    // Switches to gameover screen
                    const finalStats: FinalStats = {
                        final_score: this.score,
                        totalCategoriesAnswered: this.totalCategoriesAnswered,
                        incorrectCategoriesAnswered:
                            this.incorrectCategoriesAnswered,
                        gameMode: this.gameMode,
                    };
                    this.changeScene(finalStats);
                }
            },
            loop: true,
        });
    }

    private displayTutorial(): void {
        // The list of tutorial videos, and their descriptions
        const tutorialVideos = [
            {
                key: "step1_video",
                text: "Read the code snippet in the top right to determine the value of \nthe given order. Then build the order with buns on the outside\n(if applicable) and place ingredients in the order they appear.",
            },
            {
                key: "step1_video",
                text: "Drag and drop the ingredients onto the plate in the order\nthey appear in the final order.",
            },
            {
                key: "step1_video",
                text: "Click the 'Clear Plate' button to empty the plate and restart.",
            },
            {
                key: "step1_video",
                text: "Click the 'Confirm' button to submit your order.",
            },
            {
                key: "step1_video",
                text: "Keep watch for the timer in the top left and the score of how \nmany points you have earned.",
            },
        ];
        let currentVideoIndex = 0;

        // Create the popup container in the middle of the screen
        const popupWidth: number = this.screenCenterX * 1.2;
        const popupHeight: number = this.screenCenterY * 1.7;
        const headerY: number = -(popupHeight / 2) + 25;
        const popupContainer = this.add.container(
            this.screenCenterX,
            this.screenCenterY,
        );

        // Configure the background for the popup to be a beige rounded rectangle
        const background = this.add.graphics();
        background.fillStyle(0xede8d0, 1);
        background.fillRoundedRect(
            -(popupWidth / 2),
            -(popupHeight / 2),
            popupWidth,
            popupHeight,
            20,
        );

        // Create the "X" Close Button
        const closeButton = this.add
            .text(popupWidth / 2 - 20, headerY, "X", {
                fontSize: "32px",
                color: "#5c5c5c",
                fontStyle: "bold",
            })
            .setOrigin(0.5);
        closeButton.on("pointerover", () => {
            closeButton.postFX.addGlow(0xffbf00, 5, 0, false);
        });
        closeButton.on("pointerout", () => {
            closeButton.postFX.clear();
        });
        closeButton.on("pointerdown", () => {
            popupContainer.destroy();
        });

        // Set the title to be "Tutorial" at the top of the popup
        const title = this.add
            .text(0, headerY, "Tutorial", {
                fontSize: "30px",
                color: "0x0",
                fontStyle: "bold",
            })
            .setOrigin(0.5);

        // Set the first tutorial to play
        const currentTutorialVideo = this.add
            .video(0, 0, tutorialVideos[currentVideoIndex].key)
            .setScale(0.35)
            .play(true);

        // The current tutorial description being displayed
        const bottomY = popupContainer.y + popupContainer.displayHeight / 2;
        const textY = bottomY - 170;
        const tutorialDescription = this.add
            .text(0, textY, tutorialVideos[0].text, {
                fontSize: "14px",
                color: "0x0",
            })
            .setOrigin(0.5);

        // When the "next" arrow is clicked, switch the tutorial video being displayed
        const nextArrowX = popupWidth / 2 - 50;
        const arrowY = popupHeight / 2 - 50;
        const nextArrow = this.add
            .sprite(nextArrowX, arrowY, "right_arrow")
            .setInteractive({ useHandCursor: true })
            .setScale(0.08);
        nextArrow.on("pointerdown", () => {
            // Change the video to the next tutorial
            currentVideoIndex = (currentVideoIndex + 1) % tutorialVideos.length;
            currentTutorialVideo.changeSource(
                tutorialVideos[currentVideoIndex].key,
            );
            currentTutorialVideo.play(true);

            // Update Text
            tutorialDescription.setText(tutorialVideos[currentVideoIndex].text);

            // Make the X button clickable if all slides have been viewed
            if (currentVideoIndex === tutorialVideos.length - 1) {
                closeButton.setColor("#ff0000");
                closeButton.setInteractive({ useHandCursor: true });
            }
        });
        // Highlight "next" arrow when the mouse hovers over it
        nextArrow.on("pointerover", () => {
            nextArrow.postFX.addGlow(0xffbf00, 5, 0, false);
        });
        nextArrow.on("pointerout", () => {
            nextArrow.postFX.clear();
        });

        // When the "previous" arrow is clicked, switch the tutorial video being displayed
        const prevArrowX = -(popupWidth / 2 - 50);
        const prevArrow = this.add
            .sprite(prevArrowX, arrowY, "left_arrow")
            .setInteractive({ useHandCursor: true })
            .setScale(0.08);
        prevArrow.on("pointerdown", () => {
            // Change the current tutorial slide being shown
            currentVideoIndex =
                (currentVideoIndex - 1 + tutorialVideos.length) %
                tutorialVideos.length;
            currentTutorialVideo.changeSource(
                tutorialVideos[currentVideoIndex].key,
            );
            currentTutorialVideo.play(true);

            // Update Text
            tutorialDescription.setText(tutorialVideos[currentVideoIndex].text);

            // Make the X button clickable if all slides have been viewed
            if (currentVideoIndex === tutorialVideos.length - 1) {
                closeButton.setColor("#ff0000");
                closeButton.setInteractive({ useHandCursor: true });
            }
        });

        // Highlight "previous" arrow when the mouse hovers over it
        prevArrow.on("pointerover", () => {
            prevArrow.postFX.addGlow(0xffbf00, 5, 0, false);
        });
        prevArrow.on("pointerout", () => {
            prevArrow.postFX.clear();
        });

        // Add background, title, arrows, description, video, and close button to the popup container
        popupContainer.add([
            background,
            title,
            nextArrow,
            prevArrow,
            tutorialDescription,
            currentTutorialVideo,
            closeButton,
        ]);
        popupContainer.setDepth(1000);
    }

    init(gameInfo: ModeInfo) {
        // Save x and y coordinates for center of screen
        this.screenCenterX =
            this.cameras.main.worldView.x + this.cameras.main.width / 2;
        this.screenCenterY =
            this.cameras.main.worldView.y + this.cameras.main.height / 2;

        this.gameMode = gameInfo.gameType;

        // Reset sprite tracking
        this.burgerStack = [];
        this.activeSprites = [];
        this.plates = [];

        // Reset stat tracking
        this.score = 0;
        this.numQuestionsAnswered = 0;
        this.incorrectCategoriesAnswered = {};
        this.totalCategoriesAnswered = {};
    }

    create() {
        this.background = this.add.image(512, 384, "Background");
        this.background.setScale(0.115);
        this.camera = this.cameras.main;
        const OrderX = 510;
        const OrderY = 20;

        // Create the timer bar
        this.createTimer();

        // Display the FPS and score
        this.fpsText = new FpsText(this);
        this.scoreText = this.add.text(0, 50, `Score: ${this.score}`, {
            fontSize: "32px",
            color: "#ffffff",
            fontFamily: "Arial",
            fontStyle: "bold",
            stroke: "#000000",
            strokeThickness: 10,
        });
        console.log(this.scoreText);

        // Display plate
        this.createPlateHitbox();
        console.log(this.plateHitBox);

        // Initialize the question bank
        this.questions = QUESTION_BANK[this.gameMode];

        // Display ingredients and the plates they sit on
        this.displayIngredientBins();

        // Choose a random question to start the player with
        this.questionIndex = Math.floor(Math.random() * this.questions.length);
        this.currentOrder = new Order(
            this,
            OrderX,
            OrderY,
            this.questions[this.questionIndex].question,
            this.questions[this.questionIndex].target,
            this.questions[this.questionIndex].answer,
            this.questions[this.questionIndex].category,
            this.questions[this.questionIndex].explanation,
        );
        console.log(
            "Current order explanation: " + this.currentOrder.explanation,
        );
        this.currentOrder.text.setOrigin(0, 0);

        // Display the 'confirm' and 'clear plate' buttons
        this.displayButtons();

        // Create sound effect
        this.popSound = this.sound.add("pop");
        this.cheeseSplatSound = this.sound.add("cheese_splat");
        this.lettuceCrunchSound = this.sound.add("lettuce_crunch");
        this.tomatoSquishSound = this.sound.add("tomato_squish");
        this.bunThudSound = this.sound.add("bun_thud");
        this.pattyMooSound = this.sound.add("patty_moo");
        this.correctSound = this.sound.add("correct");
        this.incorrectSound = this.sound.add("incorrect");

        // Creates explanation text;
        this.orderAnswer = this.add
            .text(
                10,
                this.scale.height - 40,
                "Answer is:\n[" + this.currentOrder.answer.join(", " + "]"),
                {
                    fontSize: "20px",
                    color: "#ff0000",
                    fontFamily: "Arial",
                    fontStyle: "bold",
                    stroke: "#000000",
                    backgroundColor: "#000000",
                    padding: { x: 10, y: 5 },
                },
            )
            .setOrigin(0, 0)
            .setScale(0.8)
            .setVisible(false);
        this.orderExplanation = this.add
            .text(10, 220, this.currentOrder.explanation, {
                fontSize: "32px",
                color: "#ff0000",
                fontFamily: "Arial",
                fontStyle: "bold",
                stroke: "#000000",
                backgroundColor: "#000000",
                strokeThickness: 10,
            })
            .setOrigin(0, 0)
            .setVisible(false);

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
                    console.log(
                        "removing " +
                            this.burgerStack[this.burgerStack.length - 1]
                                .ingredientType,
                    );
                    this.burgerStack.pop();
                    console.log(
                        this.burgerStack.map(
                            (ingredient) => ingredient.ingredientType,
                        ),
                    );

                    // Decrease the plate hitbox when an item is removed
                    const newHitboxY =
                        this.plateHitBox.y +
                        INGREDIENT_HEIGHTS[gameObject.ingredientType];
                    if (newHitboxY > 0 && newHitboxY < this.scale.height) {
                        this.plateHitBox.y = newHitboxY;
                        this.plateHitBox.height -=
                            INGREDIENT_HEIGHTS[gameObject.ingredientType];
                    }

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
                // If ingredient was dropped in plate hitbox, add it to stack
                if (
                    Phaser.Geom.Rectangle.Contains(
                        this.plateHitBox,
                        gameObject.x,
                        gameObject.y,
                    )
                ) {
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

        this.displayTutorial();

        EventBus.emit("current-scene-ready", this);
    }

    update() {
        this.fpsText.update();

        /*this.debugGraphics.clear();
        this.debugGraphics = this.add.graphics();
        this.debugGraphics.lineStyle(2, 0x0, 1); // 2px thick, Green, 100% visible

        // Draw the plate hitbox
        this.debugGraphics.strokeRectShape(this.plateHitBox);
        this.debugGraphics.fillStyle(0x0, 0.2);
        this.debugGraphics.fillRectShape(this.plateHitBox);*/
    }

    changeScene(finalStats: FinalStats) {
        this.scene.start("GameOver", finalStats);
    }
}
