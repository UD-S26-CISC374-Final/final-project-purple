import { EventBus } from "../event-bus";
import { Scene } from "phaser";
import FpsText from "../objects/fps-text";
import { SelectorButton } from "./main-menu";

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

/** An interface representing a question, contains a question, its correct answer, and a category
 *
 * Fields:
 *  question: string, the code snippet to be displayed to the player
 *  answer: string[], the ingredients required in the correct answer
 *  category: string, the category of the question
 */
interface Question {
    question: string;
    answer: string[];
    category: string;
}

/** An interface representing the final stats. Contains final score, total questions answered by category, and the total number of incorrect questions by category
 *
 *
 */
export interface FinalStats {
    final_score: number;
    totalCategoriesAnswered: Record<string, number>;
    incorrectCategoriesAnswered: Record<string, number>;
}

// Lookup table for an ingredient's starting location
const BIN_LOCATIONS: Record<string, Coordinate> = {
    patty: { x: 70, y: 400 },
    bottom_bun: { x: 70, y: 500 },
    top_bun: { x: 250, y: 500 },
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

// A list of easy questions
const EASY_QUESTIONS: Question[] = [
    {
        question:
            'class Cheeseburger {\n\tpublic ingredients: string[];\n\tpublic buns: boolean;\n\tconstructor(ingredients: string[], buns: boolean) {\n\t\tthis.ingredients = ingredients;\n\t\tthis.buns = buns;\n\t}\n}\n\nlet order1: Cheeseburger = new Cheeseburger(\n\t\t["patty", \n\t\t"cheese"],\n\ttrue,\n);',
        answer: ["bottom_bun", "patty", "cheese", "top_bun"],
        category: "Static Initialization",
    },
    {
        question:
            'class Burger {\n\tpublic ingredients: string[];\n\tpublic buns: boolean;\n\tconstructor(ingredients: string[], buns: boolean) {\n\t\tthis.ingredients = ingredients;\n\t\tthis.buns = buns;\n\t}\n}\n\nlet extraLettuce: Burger = new Burger(\n\t\t["patty", "lettuce", "lettuce"],\n\ttrue,\n);',
        answer: ["bottom_bun", "patty", "lettuce", "lettuce", "top_bun"],
        category: "Static Initialization",
    },
    {
        question:
            'class Salad {\n\tpublic ingredients: string[];\n\tconstructor(ingredients: string[]) {\n\t\tthis.ingredients = ingredients;\n\t}\n}\n\nlet salad1: Salad = new Salad(\n\t\t["lettuce", \n\t\t"lettuce"],\n);',
        answer: ["lettuce", "lettuce"],
        category: "Static Initialization",
    },
    {
        question:
            'class VeggieBurger {\n\tpublic ingredients: string[];\n\tpublic vegan: boolean;\n\tpublic buns: boolean;\n\tconstructor(ingredients: string[], vegan: boolean, buns: boolean) {\n\t\tthis.ingredients = ingredients;\n\t\tthis.vegan = vegan;\n\t\tthis.buns = buns;\n\t}\n}\n\nlet veggieBurger1: VeggieBurger = new VeggieBurger(\n\t\t["lettuce"],\n\ttrue,\n\ttrue,\n);',
        answer: ["bottom_bun", "lettuce", "top_bun"],
        category: "Static Initialization",
    },
    {
        question:
            'class DoubleBurger {\n\tpublic ingredients: string[];\n\tpublic buns: boolean;\n\tconstructor(ingredients: string[], buns: boolean) {\n\t\tthis.ingredients = ingredients;\n\t\tthis.buns = buns;\n\t}\n}\n\nlet doubleBurger1: DoubleBurger = new DoubleBurger(\n\t\t["patty", "patty"],\n\ttrue,\n);\ndoubleBurger1.ingredients.push("cheese");',
        answer: ["bottom_bun", "patty", "patty", "cheese", "top_bun"],
        category: "Basic Methods",
    },
    {
        question:
            'class Cheeseburger {\n\tpublic ingredients: string[];\n\tpublic buns: boolean;\n\tconstructor(ingredients: string[], buns: boolean) {\n\t\tthis.ingredients = ingredients;\n\t\tthis.buns = buns;\n\t}\n}\n\nlet order1: Cheeseburger = new Cheeseburger(\n\t\t["patty", \n\t\t"cheese", \n\t\t"cheese"],\n\ttrue,\n);',
        answer: ["bottom_bun", "patty", "cheese", "cheese", "top_bun"],
        category: "Basic Methods",
    },
    {
        question:
            'class Burger {\n\tpublic ingredients: string[];\n\tpublic buns: boolean;\n\tconstructor(ingredients: string[], buns: boolean) {\n\t\tthis.ingredients = ingredients;\n\t\tthis.buns = buns;\n\t}\n}\n\nlet burger: Burger = new Burger(\n\t\t["patty", \n\t\t"cheese", \n\t\t"lettuce"],\n\ttrue,\n);',
        answer: ["bottom_bun", "patty", "cheese", "lettuce", "top_bun"],
        category: "Static Initialization",
    },
    {
        question:
            'class Burger {\n\tpublic ingredients: string[];\n\tpublic buns: boolean;\n\tconstructor(ingredients: string[], buns: boolean) {\n\t\tthis.ingredients = ingredients;\n\t\tthis.buns = buns;\n\t}\n}\n\nburgerWithCheese: Burger = new Burger(\n\t\t["patty", \n\t\t"cheese", \n\t\t"lettuce"],\n\ttrue,\n);\nfunction addCheese(burger: Burger): void {\n\tburger.ingredients.splice(1, 0, "cheese");\n}\naddCheese(burgerWithCheese);',
        answer: ["bottom_bun", "patty", "cheese", "lettuce", "top_bun"],
        category: "Intermediate Methods",
    },
    {
        question:
            'class Burger {\n\tpublic ingredients: string[];\n\tpublic buns: boolean;\n\tconstructor(ingredients: string[], buns: boolean) {\n\t\tthis.ingredients = ingredients;\n\t\tthis.buns = buns;\n\t}\n}\n\ncheesyBurger: Burger = new Burger(\n\t\t["patty", \n\t\t"cheese"],\n\ttrue,\n);\ncheesyBurger.push("cheese")',
        answer: ["bottom_bun", "patty", "cheese", "cheese", "top_bun"],
        category: "Procedural Logic",
    },
    {
        question:
            'class Burger {\n\tpublic ingredients: string[];\n\tpublic buns: boolean;\n\tconstructor(ingredients: string[], buns: boolean) {\n\t\tthis.ingredients = ingredients;\n\t\tthis.buns = buns;\n\t}\n}\n\nburger: Burger = new Burger(\n\t\t["patty", \n\t\t"cheese", \n\t\t"lettuce"],\n\ttrue,\n);\nfunction addThreePatties(): void {\n\tburger.ingredients.push("patty");\n\tburger.ingredients.push("patty");\n\tburger.ingredients.push("patty");\n}\naddThreePatties();',
        answer: [
            "bottom_bun",
            "patty",
            "cheese",
            "lettuce",
            "patty",
            "patty",
            "patty",
            "top_bun",
        ],
        category: "Static Initialization",
    },
    {
        question:
            'class Burger {\n\tpublic ingredients: string[];\n\tpublic buns: boolean;\n\tconstructor(ingredients: string[], buns: boolean) {\n\t\tthis.ingredients = ingredients;\n\t\tthis.buns = buns;\n\t}\n}\n\nburger: Burger = new Burger(\n\t\t["patty", \n\t\t"cheese", \n\t\t"lettuce"],\n\ttrue,\n);\nburger.push("tomato");',
        answer: [
            "bottom_bun",
            "patty",
            "cheese",
            "lettuce",
            "tomato",
            "top_bun",
        ],
        category: "Static Initialization",
    },
    {
        question:
            'class Burger {\n\tpublic ingredients: string[];\n\tpublic buns: boolean;\n\tconstructor(ingredients: string[], buns: boolean) {\n\t\tthis.ingredients = ingredients;\n\t\tthis.buns = buns;\n\t}\n}\n\nburger: Burger = new Burger(\n\t\t["patty", \n\t\t"cheese", \n\t\t"lettuce"],\n\ttrue,\n);',
        answer: ["bottom_bun", "patty", "cheese", "lettuce", "top_bun"],
        category: "Basic Methods",
    },
    {
        question:
            'class Burger {\n\tpublic ingredients: string[];\n\tpublic buns: boolean;\n\tconstructor(ingredients: string[], buns: boolean) {\n\t\tthis.ingredients = ingredients;\n\t\tthis.buns = buns;\n\t}\n}\n\nnoBuns: Burger = new Burger(\n\t\t["patty", \n\t\t"lettuce"],\n\tfalse,\n);',
        answer: ["patty", "lettuce"],
        category: "Basic Methods",
    },
    {
        question:
            'class Burger {\n\tpublic ingredients: string[];\n\tpublic buns: boolean;\n\tconstructor(ingredients: string[], buns: boolean) {\n\t\tthis.ingredients = ingredients;\n\t\tthis.buns = buns;\n\t}\n}\n\nhealthyBurger: Burger = new Burger(\n\t\t["patty", \n\t\t"cheese",\n\t\t"patty", \n\t\t"cheese", \n\t\t"patty", \n\t\t"cheese",\n\t\t"patty", \n\t\t"cheese", \n\t\t"lettuce"],\n\ttrue,\n);',
        answer: [
            "bottom_bun",
            "patty",
            "cheese",
            "patty",
            "cheese",
            "patty",
            "cheese",
            "patty",
            "cheese",
            "lettuce",
            "top_bun",
        ],
        category: "Static Initialization",
    },
    {
        question:
            'class Burger {\n\tpublic ingredients: string[];\n\tpublic buns: boolean;\n\tconstructor(ingredients: string[], buns: boolean) {\n\t\tthis.ingredients = ingredients;\n\t\tthis.buns = buns;\n\t}\n}\n\nburger: Burger = new Burger(\n\t\t["patty", \n\t\t"cheese", \n\t\t"tomato"],\n\ttrue,\n);',
        answer: ["bottom_bun", "patty", "cheese", "tomato", "top_bun"],
        category: "Procedural Logic",
    },
    {
        question:
            'class Burger {\n\tpublic ingredients: string[];\n\tpublic buns: boolean;\n\tconstructor(ingredients: string[], buns: boolean) {\n\t\tthis.ingredients = ingredients;\n\t\tthis.buns = buns;\n\t}\n}\n\nburger: Burger = new Burger(\n\t\t["patty", \n\t\t"cheese", \n\t\t"lettuce", \n\t\t"lettuce", \n\t\t"lettuce",\n\t\t"lettuce",\n\t\t"lettuce"],\n\ttrue,\n);',
        answer: [
            "bottom_bun",
            "patty",
            "cheese",
            "lettuce",
            "lettuce",
            "lettuce",
            "lettuce",
            "lettuce",
            "top_bun",
        ],
        category: "Static Initialization",
    },
    {
        question:
            "class Burger {\n\tpublic ingredients: string[];\n\tpublic buns: boolean;\n\tconstructor(ingredients: string[], buns: boolean) {\n\t\tthis.ingredients = ingredients;\n\t\tthis.buns = buns;\n\t}\n}\n\nnothingBurger: Burger = new Burger(\n\t\t[],\n\tfalse,\n);",
        answer: [],
        category: "Static Initialization",
    },
    {
        question:
            'class Burger {\n\tpublic ingredients: string[];\n\tpublic buns: boolean;\n\tconstructor(ingredients: string[], buns: boolean) {\n\t\tthis.ingredients = ingredients;\n\t\tthis.buns = buns;\n\t}\n}\n\nburger: Burger = new Burger(\n\t\t["patty", \n\t\t"cheese", \n\t\t"lettuce"],\n\ttrue,\n);burger.ingredients.unshift("lettuce");',
        answer: [
            "bottom_bun",
            "lettuce",
            "patty",
            "cheese",
            "lettuce",
            "top_bun",
        ],
        category: "Basic Methods",
    },
    {
        question:
            'class Burger {\n\tpublic ingredients: string[];\n\tpublic buns: boolean;\n\tconstructor(ingredients: string[], buns: boolean) {\n\t\tthis.ingredients = ingredients;\n\t\tthis.buns = buns;\n\t}\n}\n\nburger: Burger = new Burger(\n\t\t["patty", \n\t\t"cheese", \n\t\t"lettuce"],\n\ttrue,\n);burger.ingredients.shift();',
        answer: ["bottom_bun", "cheese", "lettuce", "top_bun"],
        category: "Basic Methods",
    },
    {
        question:
            'class Burger {\n\tpublic ingredients: string[];\n\tpublic buns: boolean;\n\tconstructor(ingredients: string[], buns: boolean) {\n\t\tthis.ingredients = ingredients;\n\t\tthis.buns = buns;\n\t}\n}\n\nburger: Burger = new Burger(\n\t\t["patty", \n\t\t"cheese", \n\t\t"lettuce"],\n\ttrue,\n);',
        answer: ["bottom_bun", "patty", "cheese", "lettuce", "top_bun"],
        category: "Procedural Logic",
    },
    {
        question:
            'class Burger {\n\tpublic ingredients: string[];\n\tpublic buns: boolean;\n\tconstructor(ingredients: string[], buns: boolean) {\n\t\tthis.ingredients = ingredients;\n\t\tthis.buns = buns;\n\t}\n}\n\nburger: Burger = new Burger(\n\t\t["patty", \n\t\t"cheese", \n\t\t"lettuce"],\n\ttrue,\n);burger.ingredients.splice(1, 0, "lettuce");',
        answer: [
            "bottom_bun",
            "patty",
            "lettuce",
            "cheese",
            "lettuce",
            "top_bun",
        ],
        category: "Intermediate Methods",
    },
];

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
        this.setInteractive({ useHandCursor: true });

        // Enable dragging object
        scene.input.setDraggable(this);
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
 * isAnswered: boolean, whether the order has been answered
 */
export class Order extends Phaser.GameObjects.Container {
    public orderType: string;
    public text: Phaser.GameObjects.Text;
    public answer: string[];
    public category: string;
    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        orderType: string,
        answer: string[],
        category: string,
    ) {
        super(scene, x, y);
        this.orderType = orderType;
        this.category = category;
        this.text = scene.add
            .text(x, y, orderType, { fontSize: "16px", color: "#000" })
            .setOrigin(0.5);
        this.answer = answer;

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
        newCategory: string,
    ) {
        this.orderType = newQuestion;
        this.answer = newAnswer;
        this.category = newCategory;

        this.text.setText(newQuestion);
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
    private instructionGroup: Phaser.GameObjects.Container;

    private confirmButton: SelectorButton;
    private clearPlateButton: SelectorButton;

    private currentOrder: Order;
    private orderList: Phaser.GameObjects.Text[] = [];

    // Question tracking variables
    private questions: Question[];
    private questionIndex: number;
    private numQuestionsAnswered: number = 0;
    private totalCategoriesAnswered: Record<string, number> = {};
    private incorrectCategoriesAnswered: Record<string, number> = {};

    private score: number = 0;
    private scoreText!: Phaser.GameObjects.Text;

    constructor() {
        super("Level1");
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

        // Calculate height of stack
        let stackHeight = 0;
        this.burgerStack.forEach((currentIngredient: Ingredient) => {
            stackHeight +=
                INGREDIENT_HEIGHTS[currentIngredient.ingredientType] ?? 10;
        });

        // Snap the new ingredient and add to array
        ingredient.x = this.plate.x;
        ingredient.y = this.plate.y - stackHeight;
        this.burgerStack.push(ingredient);

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
    }

    /**
     * Removes all ingredients from the plate
     *
     * Notes: Destroys all ingredient objects on plate
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
     * Create and display the instructions to the player
     */
    private displayInstructions(): void {
        // Create a darkened background overlay
        const overlay = this.add
            .rectangle(
                0,
                0,
                this.cameras.main.width,
                this.cameras.main.height,
                0x000000,
                0.7,
            )
            .setOrigin(0);

        // Create the rounded box
        const helpBox = this.add.graphics();
        helpBox.fillStyle(0xffffff, 1);
        helpBox.lineStyle(4, 0x000000, 1);
        helpBox.fillRoundedRect(
            this.screenCenterX - 250,
            this.screenCenterY - 220,
            500,
            350,
            15,
        );
        helpBox.strokeRoundedRect(
            this.screenCenterX - 250,
            this.screenCenterY - 220,
            500,
            350,
            15,
        );

        // Instruction text to be shown in the popup
        const instructionText = `Welcome to That's Not my Programmer!\n
            Build the burger by stacking the correct 
            ingredients in the order they appear in the code
            snippet by dragging and dropping the ingredients
            onto the plate, based on the value for that 
            burger object. When you have finished building
            the burger, click the confirm button. Click the
            clear plate button to reset.
            Remember that buns always go on the outside!\n
            Press the 'X' to start!`;

        // Add the instruction text
        const blurb = this.add
            .text(
                this.screenCenterX,
                this.screenCenterY - 20,
                instructionText,
                {
                    fontSize: "20px",
                    color: "#000000",
                    align: "center",
                    fontFamily: "Arial",
                },
            )
            .setOrigin(0.5, 0.5);

        // Create the "X" Close Button
        const closeBtn = this.add
            .text(this.screenCenterX + 220, this.screenCenterY - 200, "X", {
                fontSize: "32px",
                color: "#ff0000",
                fontStyle: "bold",
            })
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true });

        // Group everything into a Container
        this.instructionGroup = this.add
            .container(0, 0, [overlay, helpBox, blurb, closeBtn])
            .setDepth(1000);

        // Close the popup if the X button is clicked
        closeBtn.on("pointerdown", () => {
            this.instructionGroup.setVisible(false);
            // You could also trigger your game timer or spawning logic here!
        });
    }

    /**
     * Display and set up confirm and clear plate buttons
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
            // Check if the question was answered correctly
            if (
                this.CheckOrder(
                    this.burgerStack.map(
                        (ingredient) => ingredient.ingredientType,
                    ),
                    this.currentOrder.answer,
                )
            ) {
                // Increment the player's score
                this.score++;
                this.scoreText.setText(`Score: ${this.score}`);
            } else {
                // Increment the count of incorrect questions for that category of question
                this.incorrectCategoriesAnswered[
                    this.questions[this.questionIndex].category
                ] =
                    (this.incorrectCategoriesAnswered[
                        this.questions[this.questionIndex].category
                    ] ?? 0) + 1;
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
                this.questions[this.questionIndex].category,
            );

            this.numQuestionsAnswered++;

            // Switch to Game Over Screen after 10 questions
            if (this.numQuestionsAnswered >= 10) {
                // Send stats to Game Over Screen
                const finalStats: FinalStats = {
                    final_score: this.score,
                    totalCategoriesAnswered: this.totalCategoriesAnswered,
                    incorrectCategoriesAnswered:
                        this.incorrectCategoriesAnswered,
                };
                this.changeScene(finalStats);
            }
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
    }

    create() {
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor(0x00ff00);
        const OrderX = this.cameras.main.width - this.cameras.main.width / 6;
        const OrderY = this.cameras.main.height / 4;

        console.log(this.orderList);

        //this.background = this.add.image(512, 384, "background");
        //this.background.setAlpha(0.5);

        // Display the FPS and score
        this.fpsText = new FpsText(this);
        this.scoreText = this.add.text(0, 50, `Score: ${this.score}`, {
            fontSize: "32px",
            color: "#ffffff",
            fontFamily: "Arial",
            fontStyle: "bold",
        });
        console.log(this.scoreText);

        // Save x and y coordinates for center of screen
        this.screenCenterX =
            this.cameras.main.worldView.x + this.cameras.main.width / 2;
        this.screenCenterY =
            this.cameras.main.worldView.y + this.cameras.main.height / 2;

        // Add plate to the middle of the screen
        this.plate = this.add.image(
            this.screenCenterX,
            this.screenCenterY + 200,
            "plate",
        );
        this.plate.setScale(SPRITE_SCALES["plate"]);

        this.questions = EASY_QUESTIONS;

        // Choose a random question to start the player with
        this.questionIndex = Math.floor(Math.random() * this.questions.length);
        this.currentOrder = new Order(
            this,
            OrderX,
            OrderY,
            this.questions[this.questionIndex].question,
            this.questions[this.questionIndex].answer,
            this.questions[this.questionIndex].category,
        );

        // Display the 'confirm' and 'clear plate' buttons
        this.displayButtons();

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
                if (distance < 80) {
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

        this.displayInstructions();

        EventBus.emit("current-scene-ready", this);
    }

    update() {
        this.fpsText.update();
    }

    changeScene(finalStats: FinalStats) {
        this.scene.start("GameOver", finalStats);
    }
}
