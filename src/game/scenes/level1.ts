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

// Dictionary mapping an ingredient type to their starting coordinates
const BIN_LOCATIONS: Record<string, Coordinate> = {
    patty: { x: 50, y: 300 },
    bottom_bun: { x: 50, y: 500 },
    top_bun: { x: 250, y: 500 },
    cheese: { x: 250, y: 300 },
    lettuce: { x: 250, y: 700 },
    tomato: { x: 0, y: 700 },
};

// Dictionary mapping an ingredient type to its scale (for sprite)
const SPRITE_SCALES: Record<string, number> = {
    patty: 2.5,
    bottom_bun: 2.5,
    top_bun: 2.5,
    cheese: 2.5,
    lettuce: 2.5,
    tomato: 0.2,
    plate: 0.2,
};

// A list of easy questions
const EASY_QUESTIONS: Question[] = [
    {
        question:
            'struct Cheeseburger {\n\tchar[10][4] ingredients;\n\tbool buns;\n}\n\norder1: Cheeseburger = {\n\tingredients: \n\t\t["patty", \n\t\t"cheese"],\n\tbuns: true,\n};',
        answer: ["bottom_bun", "patty", "cheese", "top_bun"],
        category: "Static Initialization",
    },
    {
        question:
            'struct Burger {\n\tchar[10][4] ingredients;\n\tbool buns;\n}\n\nextraLettuce: Burger = {\n\tingredients: \n\t\t["patty", \n\t\t"lettuce", "lettuce"],\n\tbuns: true,\n};',
        answer: ["bottom_bun", "lettuce", "lettuce", "patty", "top_bun"],
        category: "Static Initialization",
    },
    {
        question:
            'struct Salad {\n\tchar[10][2] ingredients;\n}\n\nsalad1: Salad = {\n\tingredients: \n\t\t["lettuce", \n\t\t"lettuce"],\n};',
        answer: ["lettuce", "lettuce"],
        category: "Static Initialization",
    },
    {
        question:
            'struct VeggieBurger {\n\tchar[10][4] ingredients;\n\tbool vegan;\n\tbool buns;\n}\n\nveggieBurger1: VeggieBurger = {\n\tingredients: \n\t\t["lettuce"],\n\tvegan: true,\n\tbuns: true,\n};',
        answer: ["bottom_bun", "lettuce", "top_bun"],
        category: "Static Initialization",
    },
    {
        question:
            'struct DoubleBurger {\n\tchar[10][4] ingredients;\n\tbool buns;\n}\n\ndoubleBurger1: DoubleBurger = {\n\tingredients: \n\t\t["patty", "patty"],\n\tbuns: true,\n};\ndoubleBurger1.ingredients.push("cheese");',
        answer: ["bottom_bun", "patty", "patty", "top_bun"],
        category: "Basic Methods",
    },
    {
        question:
            'struct Cheeseburger {\n\tchar[7][3] ingredients;\n\tbool buns;\n}\n\norder1: Cheeseburger = {\n\tingredients: \n\t\t["patty", \n\t\t"cheese", \n\t\t"lettuce"],\n\tbuns: true,\n};\norder1.ingredients.pop();\norder1.ingredients.push("lettuce");',
        answer: ["bottom_bun", "patty", "cheese", "top_bun"],
        category: "Basic Methods",
    },
    {
        question:
            'struct Burger {\n\tchar[10][4] ingredients;\n\tbool buns;\n}\n\nburger: Burger = {\n\tingredients: \n\t\t["patty", \n\t\t"cheese", \n\t\t"lettuce"],\n\tbuns: true,\n};\nburger1.ingredients.splice(1, 1);',
        answer: ["bottom_bun", "patty", "lettuce", "top_bun"],
        category: "Intermediate Methods",
    },
    {
        question:
            'struct Burger {\n\tchar[10][4] ingredients;\n\tbool buns;\n}\n\nburgerWithCheese: Burger = {\n\tingredients: \n\t\t["patty", \n\t\t"cheese", \n\t\t"lettuce"],\n\tbuns: true,\n};\nburger1.ingredients.splice(1, 1, "cheese");',
        answer: ["bottom_bun", "patty", "cheese", "top_bun"],
        category: "Intermediate Methods",
    },
    {
        question:
            'struct Burger {\n\tchar[10][4] ingredients;\n\tbool buns;\n}\n\ncheesyBurger: Burger = {\n\tingredients: \n\t\t["patty", \n\t\t"cheese"],\n\tbuns: true,\n};\nvoid addCheese(){\n\tcheesyBurger.ingredients.push("cheese");\n}\naddCheese();',
        answer: ["bottom_bun", "patty", "cheese", "cheese", "top_bun"],
        category: "Procedural Logic",
    },
    {
        question:
            'struct Burger {\n\tchar[10][4] ingredients;\n\tbool buns;\n}\n\nburger: Burger = {\n\tingredients: \n\t\t["patty", \n\t\t"cheese", \n\t\t"lettuce"],\n\tbuns: true,\n};',
        answer: ["bottom_bun", "patty", "cheese", "lettuce", "top_bun"],
        category: "Static Initialization",
    },
    {
        question:
            'struct Burger {\n\tchar[9][3] ingredients;\n\tbool buns;\n}\n\nburger: Burger = {\n\tingredients: \n\t\t["patty", \n\t\t"cheese", \n\t\t"lettuce"],\n\tbuns: true,\n};\nburger.ingredients.length = 2;',
        answer: ["bottom_bun", "patty", "top_bun"],
        category: "Basic Methods",
    },
    {
        question:
            'struct Burger {\n\tchar[10][4] ingredients;\n\tbool buns;\n}\n\nnoBuns: Burger = {\n\tingredients: \n\t\t["patty", \n\t\t"lettuce"],\n\tbuns: true,\n};\nburger.ingredients.length = 0;\nbuns: false',
        answer: ["patty", "lettuce"],
        category: "Basic Methods",
    },
    {
        question:
            'struct Burger {\n\tchar[10][10] ingredients;\n\tbool buns;\n}\n\nhealthyBurger: Burger = {\n\tingredients: \n\t\t["patty", \n\t\t"cheese",\n\t\t"patty", \n\t\t"cheese", \n\t\t"patty", \n\t\t"cheese",\n\t\t"patty", \n\t\t"cheese", \n\t\t"lettuce"],\n\tbuns: true,\n};',
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
            'struct Burger {\n\tchar[10][4] ingredients;\n\tbool buns;\n}\n\nburger: Burger = {\n\tingredients: \n\t\t["patty", \n\t\t"cheese", \n\t\t"lettuce"],\n\tbuns: true,\n};\nvoid addCheese(burger: Burger) {\n\tburger.ingredients.push("cheese");\n}',
        answer: [
            "bottom_bun",
            "lettuce",
            "patty",
            "cheese",
            "lettuce",
            "top_bun",
        ],
        category: "Procedural Logic",
    },
    {
        question:
            'struct Burger {\n\tchar[10][8] ingredients;\n\tbool buns;\n}\n\nburger: Burger = {\n\tingredients: \n\t\t["patty", \n\t\t"cheese", \n\t\t"lettuce", \n\t\t"lettuce", \n\t\t"lettuce",\n\t\t"lettuce",\n\t\t"lettuce"],\n\tbuns: true,\n};',
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
            "struct Burger {\n\tchar[10][4] ingredients;\n\tbool buns;\n}\n\nnothingBurger: Burger = {\n\tingredients: \n\t\t[],\n\tbuns: false,\n};",
        answer: [],
        category: "Static Initialization",
    },
    {
        question:
            'struct Burger {\n\tchar[10][4] ingredients;\n\tbool buns;\n}\n\nburger: Burger = {\n\tingredients: \n\t\t["patty", \n\t\t"cheese", \n\t\t"lettuce"],\n\tbuns: true,\n};\nburger.ingredients.unshift("lettuce");',
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
            'struct Burger {\n\tchar[10][4] ingredients;\n\tbool buns;\n}\n\nburger: Burger = {\n\tingredients: \n\t\t["patty", \n\t\t"cheese", \n\t\t"lettuce"],\n\tbuns: true,\n};\nburger.ingredients.shift();',
        answer: ["bottom_bun", "cheese", "lettuce", "top_bun"],
        category: "Basic Methods",
    },
    {
        question:
            'struct Burger {\n\tchar[10][4] ingredients;\n\tbool buns;\n}\n\nburger: Burger = {\n\tingredients: \n\t\t["patty", \n\t\t"cheese", \n\t\t"lettuce"],\n\tbuns: true,\n};\nvoid LettuceForBurger() {\n\tfor(int i = 0; i < burger.ingredients.length; i++) {\n\t\tif(burger.ingredients[i] == "lettuce") {\n\t\t\tburger.ingredients[i] = "burger";\n\t\t}\n\t}\n}',
        answer: ["bottom_bun", "cheese", "burger", "burger", "top_bun"],
        category: "Procedural Logic",
    },
    {
        question:
            'struct Burger {\n\tchar[10][4] ingredients;\n\tbool buns;\n}\n\nburger: Burger = {\n\tingredients: \n\t\t["patty", \n\t\t"cheese", \n\t\t"lettuce"],\n\tbuns: true,\n};\nburger.ingredients.splice(1, 0, "lettuce");',
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

        // Snap the new ingredient and add to array
        ingredient.x = this.plate.x;
        ingredient.y = this.plate.y - (this.burgerStack.length + 1) * 12;
        this.burgerStack.push(ingredient);

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
            return false;
        }

        // Compare the order to the answer
        for (let index = 0; index < answer.length; index++) {
            // If the ingredients don't match, return false
            if (answer[index] !== order[index]) {
                return false;
            }
        }

        return true;
    }

    create() {
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor(0x00ff00);
        const OrderX = this.cameras.main.width - this.cameras.main.width / 6;
        const OrderY = this.cameras.main.height / 4;

        console.log(EASY_QUESTIONS);

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
            this.screenCenterY,
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

        // Add confirm button to screen
        this.confirmButton = new SelectorButton(
            this,
            this.screenCenterX + 100,
            OrderY + 300,
            "Confirm",
            140,
        );
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

            // Switch to Game Over Screen after 5 questions
            if (this.numQuestionsAnswered >= 5) {
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
            OrderY + 300,
            "Clear Plate",
            140,
        ).on("pointerdown", () => this.clearPlate());
        console.log(this.clearPlateButton);

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
                if (distance < 60) {
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

        EventBus.emit("current-scene-ready", this);
    }

    update() {
        this.fpsText.update();
    }

    changeScene(finalStats: FinalStats) {
        this.scene.start("GameOver", finalStats);
    }
}
