import { EventBus } from "../event-bus";
import { Scene } from "phaser";
import FpsText from "../objects/fps-text";
import { SelectorButton } from "./main-menu";

// An interface representing coordinates for an object, has a starting x and starting y
interface Coordinate {
    x: number;
    y: number;
}

// An interface representing a question, contains a question, its correct answer, and a category
interface Question {
    question: string;
    answer: string[];
    category: string;
}

// Dictionary mapping an ingredient type to their starting coordinates
const BIN_LOCATIONS: Record<string, Coordinate> = {
    patty: { x: 0, y: 0 },
    bottom_bun: { x: 500, y: 0 },
    top_bun: { x: 800, y: 0 },
    cheese: { x: 0, y: 400 },
    lettuce: { x: 800, y: 600 },
    tomato: { x: 0, y: 800 },
};

// Dictionary mapping an ingredient type to its scale (for sprite)
const SPRITE_SCALES: Record<string, number> = {
    patty: 0.2,
    bottom_bun: 2.5,
    top_bun: 2.5,
    cheese: 2.5,
    lettuce: 0.2,
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

// An ingredient class to represent every ingredient object on the screen
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
export class Order extends Phaser.GameObjects.Container {
    public orderType: string;
    public text: Phaser.GameObjects.Text;
    public answer: string[];
    public isAnswered: boolean;
    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        //texture: string,
        orderType: string,
        answer: string[],
        isAnswered: boolean,
    ) {
        super(scene, x, y);
        this.orderType = orderType;
        this.text = scene.add
            .text(x, y, orderType, { fontSize: "16px", color: "#000" })
            .setOrigin(0.5);
        this.answer = answer;
        this.isAnswered = isAnswered;

        scene.add.existing(this);
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

    // Create orders for the player to complete
    private orders: Order[] = [];
    private currentOrder: Order;
    private orderList: Phaser.GameObjects.Text[] = [];
    private easyOrders: Order[] = [];
    private randomIndex: number;

    constructor() {
        super("Level1");
    }

    // Adds the given ingredient to the plate
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

    // Removes all ingredients from the plate
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

    private CheckOrder(answer: string[], order: string[]): boolean {
        if (answer.length !== order.length) {
            this.changeScene();
            return false;
        } else {
            for (let i = 0; i < answer.length; i++) {
                let innerCheck: boolean = false;
                for (let j = 0; j < order.length; j++) {
                    if (answer[i] === order[j]) {
                        innerCheck = true;
                        break;
                    }
                }
                if (!innerCheck) {
                    this.changeScene();
                    return false;
                }
            }
            return true;
        }
    }

    create() {
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor(0x00ff00);
        const OrderX = this.cameras.main.width - this.cameras.main.width / 6;
        const OrderY = this.cameras.main.height / 4;

        console.log(EASY_QUESTIONS);

        // Create Easy Orders
        this.easyOrders = [
            new Order(
                this,
                -1000,
                -1000,
                'struct Cheeseburger {\n\tchar[10][4] ingredients;\n\tbool buns;\n}\n\norder1: Cheeseburger = {\n\tingredients: \n\t\t["patty", \n\t\t"cheese"],\n\tbuns: true,\n};',
                ["bottom_bun", "patty", "cheese", "top_bun"],
                false,
            )
                .setActive(false)
                .setVisible(false),
            new Order(
                this,
                -1000,
                -1000,
                'struct Burger {\n\tchar[10][4] ingredients;\n\tbool buns;\n}\n\nextraLettuce: Burger = {\n\tingredients: \n\t\t["patty", \n\t\t"lettuce", "lettuce"],\n\tbuns: true,\n};',
                ["bottom_bun", "lettuce", "lettuce", "patty", "top_bun"],
                false,
            )
                .setActive(false)
                .setVisible(false),
            new Order(
                this,
                -1000,
                -1000,
                'struct Salad {\n\tchar[10][2] ingredients;\n}\n\nsalad1: Salad = {\n\tingredients: \n\t\t["lettuce", \n\t\t"lettuce"],\n};',
                ["lettuce", "lettuce"],
                false,
            ),
            new Order(
                this,
                -1000,
                -1000,
                'struct VeggieBurger {\n\tchar[10][4] ingredients;\n\tbool vegan;\n\tbool buns;\n}\n\nveggieBurger1: VeggieBurger = {\n\tingredients: \n\t\t["lettuce"],\n\tvegan: true,\n\tbuns: true,\n};',
                ["bottom_bun", "lettuce", "top_bun"],
                false,
            ),
            new Order(
                this,
                -1000,
                -1000,
                'struct DoubleBurger {\n\tchar[10][4] ingredients;\n\tbool buns;\n}\n\ndoubleBurger1: DoubleBurger = {\n\tingredients: \n\t\t["patty", "patty"],\n\tbuns: true,\n};\ndoubleBurger1.ingredients.push("cheese");',
                ["bottom_bun", "patty", "patty", "top_bun"],
                false,
            ),
            new Order(
                this,
                -1000,
                -1000,
                'struct Cheeseburger {\n\tchar[7][3] ingredients;\n\tbool buns;\n}\n\norder1: Cheeseburger = {\n\tingredients: \n\t\t["patty", \n\t\t"cheese", \n\t\t"lettuce"],\n\tbuns: true,\n};\norder1.ingredients.pop();\norder1.ingredients.push("lettuce");',
                ["bottom_bun", "patty", "cheese", "top_bun"],
                false,
            ),
            new Order(
                this,
                -1000,
                -1000,
                'struct Burger {\n\tchar[10][4] ingredients;\n\tbool buns;\n}\n\nburger: Burger = {\n\tingredients: \n\t\t["patty", \n\t\t"cheese", \n\t\t"lettuce"],\n\tbuns: true,\n};\nburger1.ingredients.splice(1, 1);',
                ["bottom_bun", "patty", "lettuce", "top_bun"],
                false,
            ),
            new Order(
                this,
                -1000,
                -1000,
                'struct Burger {\n\tchar[10][4] ingredients;\n\tbool buns;\n}\n\nburgerWithCheese: Burger = {\n\tingredients: \n\t\t["patty", \n\t\t"cheese", \n\t\t"lettuce"],\n\tbuns: true,\n};\nburger1.ingredients.splice(1, 1, "cheese");',
                ["bottom_bun", "patty", "cheese", "top_bun"],
                false,
            ),
            new Order(
                this,
                -1000,
                -1000,
                'struct Burger {\n\tchar[10][4] ingredients;\n\tbool buns;\n}\n\ncheesyBurger: Burger = {\n\tingredients: \n\t\t["patty", \n\t\t"cheese"],\n\tbuns: true,\n};\nvoid addCheese(){\n\tcheesyBurger.ingredients.push("cheese");\n}\naddCheese();',
                ["bottom_bun", "patty", "cheese", "cheese", "top_bun"],
                false,
            ),
            new Order(
                this,
                -1000,
                -1000,
                'struct Burger {\n\tchar[10][4] ingredients;\n\tbool buns;\n}\n\nburger: Burger = {\n\tingredients: \n\t\t["patty", \n\t\t"cheese", \n\t\t"lettuce"],\n\tbuns: true,\n};',
                ["bottom_bun", "patty", "cheese", "lettuce", "top_bun"],
                false,
            ),
            new Order(
                this,
                -1000,
                -1000,
                'struct Burger {\n\tchar[9][3] ingredients;\n\tbool buns;\n}\n\nburger: Burger = {\n\tingredients: \n\t\t["patty", \n\t\t"cheese", \n\t\t"lettuce"],\n\tbuns: true,\n};\nburger.ingredients.length = 2;',
                ["bottom_bun", "patty", "top_bun"],
                false,
            ),
            new Order(
                this,
                -1000,
                -1000,
                'struct Burger {\n\tchar[10][4] ingredients;\n\tbool buns;\n}\n\nnoBuns: Burger = {\n\tingredients: \n\t\t["patty", \n\t\t"lettuce"],\n\tbuns: true,\n};\nburger.ingredients.length = 0;\nbuns: false',
                ["patty", "lettuce"],
                false,
            ),
            new Order(
                this,
                -1000,
                -1000,
                'struct Burger {\n\tchar[10][10] ingredients;\n\tbool buns;\n}\n\nhealthyBurger: Burger = {\n\tingredients: \n\t\t["patty", \n\t\t"cheese",\n\t\t"patty", \n\t\t"cheese", \n\t\t"patty", \n\t\t"cheese",\n\t\t"patty", \n\t\t"cheese", \n\t\t"lettuce"],\n\tbuns: true,\n};',
                [
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
                false,
            ),
            new Order(
                this,
                -1000,
                -1000,
                'struct Burger {\n\tchar[10][4] ingredients;\n\tbool buns;\n}\n\nburger: Burger = {\n\tingredients: \n\t\t["patty", \n\t\t"cheese", \n\t\t"lettuce"],\n\tbuns: true,\n};\nvoid addCheese(burger: Burger) {\n\tburger.ingredients.push("cheese");\n}',
                [
                    "bottom_bun",
                    "lettuce",
                    "patty",
                    "cheese",
                    "lettuce",
                    "top_bun",
                ],
                false,
            ) /* This order is meant to trick the player into adding cheese to the burger twice, but the function only adds it once because the burger is passed by reference, so the original burger object is mutated and updated with the new cheese ingredient. */,
            new Order(
                this,
                -1000,
                -1000,
                'struct Burger {\n\tchar[10][8] ingredients;\n\tbool buns;\n}\n\nburger: Burger = {\n\tingredients: \n\t\t["patty", \n\t\t"cheese", \n\t\t"lettuce", \n\t\t"lettuce", \n\t\t"lettuce",\n\t\t"lettuce",\n\t\t"lettuce"],\n\tbuns: true,\n};',
                [
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
                false,
            ),
            new Order(
                this,
                -1000,
                -1000,
                "struct Burger {\n\tchar[10][4] ingredients;\n\tbool buns;\n}\n\nnothingBurger: Burger = {\n\tingredients: \n\t\t[],\n\tbuns: false,\n};",
                [],
                false,
            ),
            new Order(
                this,
                -1000,
                -1000,
                'struct Burger {\n\tchar[10][4] ingredients;\n\tbool buns;\n}\n\nburger: Burger = {\n\tingredients: \n\t\t["patty", \n\t\t"cheese", \n\t\t"lettuce"],\n\tbuns: true,\n};\nburger.ingredients.unshift("lettuce");',
                [
                    "bottom_bun",
                    "lettuce",
                    "patty",
                    "cheese",
                    "lettuce",
                    "top_bun",
                ],
                false,
            ),
            new Order(
                this,
                -1000,
                -1000,
                'struct Burger {\n\tchar[10][4] ingredients;\n\tbool buns;\n}\n\nburger: Burger = {\n\tingredients: \n\t\t["patty", \n\t\t"cheese", \n\t\t"lettuce"],\n\tbuns: true,\n};\nburger.ingredients.shift();',
                ["bottom_bun", "cheese", "lettuce", "top_bun"],
                false,
            ),
            new Order(
                this,
                -1000,
                -1000,
                'struct Burger {\n\tchar[10][4] ingredients;\n\tbool buns;\n}\n\nburger: Burger = {\n\tingredients: \n\t\t["patty", \n\t\t"cheese", \n\t\t"lettuce"],\n\tbuns: true,\n};\nvoid LettuceForBurger() {\n\tfor(int i = 0; i < burger.ingredients.length; i++) {\n\t\tif(burger.ingredients[i] == "lettuce") {\n\t\t\tburger.ingredients[i] = "burger";\n\t\t}\n\t}\n}',
                ["bottom_bun", "cheese", "burger", "burger", "top_bun"],
                false,
            ),
            new Order(
                this,
                -1000,
                -1000,
                'struct Burger {\n\tchar[10][4] ingredients;\n\tbool buns;\n}\n\nburger: Burger = {\n\tingredients: \n\t\t["patty", \n\t\t"cheese", \n\t\t"lettuce"],\n\tbuns: true,\n};\nburger.ingredients.splice(1, 0, "lettuce");',
                [
                    "bottom_bun",
                    "patty",
                    "lettuce",
                    "cheese",
                    "lettuce",
                    "top_bun",
                ],
                false,
            ),
        ];
        console.log(this.orderList);

        //this.background = this.add.image(512, 384, "background");
        //this.background.setAlpha(0.5);

        this.fpsText = new FpsText(this);

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

        this.randomIndex = Math.floor(Math.random() * this.easyOrders.length);
        this.currentOrder = new Order(
            this,
            OrderX,
            OrderY,
            this.easyOrders[this.randomIndex].text.text,
            this.easyOrders[this.randomIndex].answer,
            false,
        );
        this.orders.push(this.currentOrder);

        // Add confirm button to screen
        this.confirmButton = new SelectorButton(
            this,
            this.screenCenterX + 100,
            OrderY + 300,
            "Confirm",
            140,
        );
        this.confirmButton.on("pointerdown", () => {
            if (
                this.CheckOrder(
                    this.burgerStack.map(
                        (ingredient) => ingredient.ingredientType,
                    ),
                    this.currentOrder.answer,
                )
            ) {
                console.log("successful");
                while (this.burgerStack.length > 0) {
                    this.burgerStack.pop()?.destroy();
                    console.log("stack popped");
                }
                console.log("finished");
                if (this.easyOrders.every((order) => order.isAnswered)) {
                    this.changeScene();
                } else {
                    this.easyOrders[this.randomIndex].isAnswered = true;
                    while (this.easyOrders[this.randomIndex].isAnswered) {
                        this.randomIndex = Math.floor(
                            Math.random() * this.easyOrders.length,
                        );
                    }
                    this.currentOrder.text.setText(
                        this.easyOrders[this.randomIndex].text.text,
                    );
                    this.currentOrder.answer =
                        this.easyOrders[this.randomIndex].answer;
                }
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

    changeScene() {
        this.scene.start("GameOver");
    }
}
