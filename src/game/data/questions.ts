/** An interface representing a question, contains a question, its correct answer, and a category
 *
 * Fields:
 *  question: string, the code snippet to be displayed to the player
 *  answer: string[], the ingredients required in the correct answer
 *  category: string, the category of the question
 */
export interface Question {
    question: string;
    target: string;
    answer: string[];
    category: string;
}

// A list of easy questions
export const EASY_QUESTIONS: Question[] = [
    {
        question:
            'class Cheeseburger {\n\tpublic ingredients: string[];\n\tpublic buns: boolean;\n\tconstructor(\n\t\tingredients: string[], \n\t\tbuns: boolean) {\n\t\tthis.ingredients = ingredients;\n\t\tthis.buns = buns;\n\t}\n}\n\nlet order1: Cheeseburger = new Cheeseburger(\n\t\t["patty", \n\t\t"cheese"],\n\ttrue,\n);',
        target: "order1",
        answer: ["bottom_bun", "patty", "cheese", "top_bun"],
        category: "Static Initialization",
    },
    {
        question:
            'class Burger {\n\tpublic ingredients: string[];\n\tpublic buns: boolean;\n\tconstructor(\n\t\tingredients: string[], \n\t\tbuns: boolean) {\n\t\tthis.ingredients = ingredients;\n\t\tthis.buns = buns;\n\t}\n}\n\nlet extraLettuce: Burger = new Burger(\n\t\t["patty", "lettuce", "lettuce"],\n\t\ttrue,\n);',
        target: "extraLettuce",
        answer: ["bottom_bun", "patty", "lettuce", "lettuce", "top_bun"],
        category: "Static Initialization",
    },
    {
        question:
            'class Salad {\n\tpublic ingredients: string[];\n\tconstructor(\n\t\tingredients: string[]) {\n\t\tthis.ingredients = ingredients;\n\t}\n}\n\nlet salad1: Salad = new Salad(\n\t\t["lettuce", \n\t\t"lettuce"],\n);',
        target: "salad1",
        answer: ["lettuce", "lettuce"],
        category: "Static Initialization",
    },
    {
        question:
            'class VeggieBurger {\n\tpublic ingredients: string[];\n\tpublic vegan: boolean;\n\tpublic buns: boolean;\n\tconstructor(\n\t\tingredients: string[], \n\t\tvegan: boolean, \n\t\tbuns: boolean) {\n\t\tthis.ingredients = ingredients;\n\t\tthis.vegan = vegan;\n\t\tthis.buns = buns;\n\t}\n}\n\nlet veggieBurger1: VeggieBurger \n= new VeggieBurger(\n\t\t["lettuce"],\n\ttrue,\n\ttrue,\n);',
        target: "veggieBurger1",
        answer: ["bottom_bun", "lettuce", "top_bun"],
        category: "Static Initialization",
    },
    {
        question:
            'class DoubleBurger {\n\tpublic ingredients: string[];\n\tpublic buns: boolean;\n\tconstructor(\n\t\tingredients: string[], \n\t\tbuns: boolean) {\n\t\tthis.ingredients = ingredients;\n\t\tthis.buns = buns;\n\t}\n}\n\nlet doubleBurger1: DoubleBurger \n= new DoubleBurger(\n\t\t["patty", "patty"],\n\ttrue,\n);\ndoubleBurger1.ingredients.push("cheese");',
        target: "doubleBurger1",
        answer: ["bottom_bun", "patty", "patty", "cheese", "top_bun"],
        category: "Basic Methods",
    },
    {
        question:
            'class Cheeseburger {\n\tpublic ingredients: string[];\n\tpublic buns: boolean;\n\tconstructor(\n\t\tingredients: string[], \n\t\tbuns: boolean) {\n\t\tthis.ingredients = ingredients;\n\t\tthis.buns = buns;\n\t}\n}\n\nlet order1: Cheeseburger = new Cheeseburger(\n\t\t["patty", \n\t\t"cheese", \n\t\t"cheese"],\n\ttrue,\n);',
        target: "order1",
        answer: ["bottom_bun", "patty", "cheese", "cheese", "top_bun"],
        category: "Basic Methods",
    },
    {
        question:
            'class Burger {\n\tpublic ingredients: string[];\n\tpublic buns: boolean;\n\tconstructor(\n\t\tingredients: string[], \n\t\tbuns: boolean) {\n\t\tthis.ingredients = ingredients;\n\t\tthis.buns = buns;\n\t}\n}\n\nlet burger: Burger = new Burger(\n\t\t["patty", \n\t\t"cheese", \n\t\t"lettuce"],\n\ttrue,\n);',
        target: "burger",
        answer: ["bottom_bun", "patty", "cheese", "lettuce", "top_bun"],
        category: "Static Initialization",
    },
    {
        question:
            'class Burger {\n\tpublic ingredients: string[];\n\tpublic buns: boolean;\n\tconstructor(\n\t\tingredients: string[], \n\t\tbuns: boolean) {\n\t\tthis.ingredients = ingredients;\n\t\tthis.buns = buns;\n\t}\n}\n\nburgerWithCheese: Burger = new Burger(\n\t\t["patty", \n\t\t"cheese", \n\t\t"lettuce"],\n\ttrue,\n);\nfunction addCheese(burger: Burger): void {\n\tburger.ingredients.splice(1, 0, "cheese");\n}\naddCheese(burgerWithCheese);',
        target: "burgerWithCheese",
        answer: ["bottom_bun", "patty", "cheese", "lettuce", "top_bun"],
        category: "Intermediate Methods",
    },
    {
        question:
            'class Burger {\n\tpublic ingredients: string[];\n\tpublic buns: boolean;\n\tconstructor(\n\t\tingredients: string[], \n\t\tbuns: boolean) {\n\t\tthis.ingredients = ingredients;\n\t\tthis.buns = buns;\n\t}\n}\n\ncheesyBurger: Burger = new Burger(\n\t\t["patty", \n\t\t"cheese"],\n\ttrue,\n);\ncheesyBurger.push("cheese");',
        target: "cheesyBurger",
        answer: ["bottom_bun", "patty", "cheese", "cheese", "top_bun"],
        category: "Procedural Logic",
    },
    {
        question:
            'class Burger {\n\tpublic ingredients: string[];\n\tpublic buns: boolean;\n\tconstructor(\n\t\tingredients: string[], \n\t\tbuns: boolean) {\n\t\tthis.ingredients = ingredients;\n\t\tthis.buns = buns;\n\t}\n}\n\nburger: Burger = new Burger(\n\t\t["patty", \n\t\t"cheese", \n\t\t"lettuce"],\n\ttrue,\n);\nfunction addThreePatties(): void {\n\tburger.ingredients.push("patty");\n\tburger.ingredients.push("patty");\n\tburger.ingredients.push("patty");\n}\naddThreePatties();',
        target: "burger",
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
            'class Burger {\n\tpublic ingredients: string[];\n\tpublic buns: boolean;\n\tconstructor(\n\t\tingredients: string[], \n\t\tbuns: boolean) {\n\t\tthis.ingredients = ingredients;\n\t\tthis.buns = buns;\n\t}\n}\n\nburger: Burger = new Burger(\n\t\t["patty", \n\t\t"cheese", \n\t\t"lettuce"],\n\ttrue,\n);\nburger.push("tomato");',
        target: "burger",
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
            'class Burger {\n\tpublic ingredients: string[];\n\tpublic buns: boolean;\n\tconstructor(\n\t\tingredients: string[], \n\t\tbuns: boolean) {\n\t\tthis.ingredients = ingredients;\n\t\tthis.buns = buns;\n\t}\n}\n\nburger: Burger = new Burger(\n\t\t["patty", \n\t\t"cheese", \n\t\t"lettuce"],\n\ttrue,\n);',
        target: "burger",
        answer: ["bottom_bun", "patty", "cheese", "lettuce", "top_bun"],
        category: "Basic Methods",
    },
    {
        question:
            'class Burger {\n\tpublic ingredients: string[];\n\tpublic buns: boolean;\n\tconstructor(\n\t\tingredients: string[], \n\t\tbuns: boolean) {\n\t\tthis.ingredients = ingredients;\n\t\tthis.buns = buns;\n\t}\n}\n\nnoBuns: Burger = new Burger(\n\t\t["patty", \n\t\t"lettuce"],\n\tfalse,\n);',
        target: "noBuns",
        answer: ["patty", "lettuce"],
        category: "Basic Methods",
    },
    {
        question:
            'class Burger {\n\tpublic ingredients: string[];\n\tpublic buns: boolean;\n\tconstructor(\n\t\tingredients: string[], \n\t\tbuns: boolean) {\n\t\tthis.ingredients = ingredients;\n\t\tthis.buns = buns;\n\t}\n}\n\nhealthyBurger: Burger = new Burger(\n\t\t["patty", \n\t\t"cheese",\n\t\t"patty", \n\t\t"cheese", \n\t\t"patty", \n\t\t"cheese",\n\t\t"patty", \n\t\t"cheese", \n\t\t"lettuce"],\n\ttrue,\n);',
        target: "healthyBurger",
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
            'class Burger {\n\tpublic ingredients: string[];\n\tpublic buns: boolean;\n\tconstructor(\n\t\tingredients: string[], \n\t\tbuns: boolean) {\n\t\tthis.ingredients = ingredients;\n\t\tthis.buns = buns;\n\t}\n}\n\nburger: Burger = new Burger(\n\t\t["patty", \n\t\t"cheese", \n\t\t"tomato"],\n\ttrue,\n);',
        target: "burger",
        answer: ["bottom_bun", "patty", "cheese", "tomato", "top_bun"],
        category: "Procedural Logic",
    },
    {
        question:
            'class Burger {\n\tpublic ingredients: string[];\n\tpublic buns: boolean;\n\tconstructor(\n\t\tingredients: string[], \n\t\tbuns: boolean) {\n\t\tthis.ingredients = ingredients;\n\t\tthis.buns = buns;\n\t}\n}\n\nburger: Burger = new Burger(\n\t\t["patty", \n\t\t"cheese", \n\t\t"lettuce", \n\t\t"lettuce", \n\t\t"lettuce",\n\t\t"lettuce",\n\t\t"lettuce"],\n\ttrue,\n);',
        target: "burger",
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
            "class Burger {\n\tpublic ingredients: string[];\n\tpublic buns: boolean;\n\tconstructor(\n\t\tingredients: string[], \n\t\tbuns: boolean) {\n\t\tthis.ingredients = ingredients;\n\t\tthis.buns = buns;\n\t}\n}\n\nnothingBurger: Burger = new Burger(\n\t\t[],\n\tfalse,\n);",
        target: "nothingBurger",
        answer: [],
        category: "Static Initialization",
    },
    {
        question:
            'class Burger {\n\tpublic ingredients: string[];\n\tpublic buns: boolean;\n\tconstructor(\n\t\tingredients: string[], \n\t\tbuns: boolean) {\n\t\tthis.ingredients = ingredients;\n\t\tthis.buns = buns;\n\t}\n}\n\nburger: Burger = new Burger(\n\t\t["patty", \n\t\t"cheese", \n\t\t"lettuce"],\n\ttrue,\n);\nburger.ingredients.unshift("lettuce");',
        target: "burger",
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
            'class Burger {\n\tpublic ingredients: string[];\n\tpublic buns: boolean;\n\tconstructor(\n\t\tingredients: string[], \n\t\tbuns: boolean) {\n\t\tthis.ingredients = ingredients;\n\t\tthis.buns = buns;\n\t}\n}\n\nburger: Burger = new Burger(\n\t\t["patty", \n\t\t"cheese", \n\t\t"lettuce"],\n\ttrue,\n);\nburger.ingredients.shift();',
        target: "burger",
        answer: ["bottom_bun", "cheese", "lettuce", "top_bun"],
        category: "Basic Methods",
    },
    {
        question:
            'class Burger {\n\tpublic ingredients: string[];\n\tpublic buns: boolean;\n\tconstructor(\n\t\tingredients: string[], \n\t\tbuns: boolean) {\n\t\tthis.ingredients = ingredients;\n\t\tthis.buns = buns;\n\t}\n}\n\nburger: Burger = new Burger(\n\t\t["patty", \n\t\t"cheese", \n\t\t"lettuce"],\n\ttrue,\n);',
        target: "burger",
        answer: ["bottom_bun", "patty", "cheese", "lettuce", "top_bun"],
        category: "Procedural Logic",
    },
    {
        question:
            'class Burger {\n\tpublic ingredients: string[];\n\tpublic buns: boolean;\n\tconstructor(\n\t\tingredients: string[], \n\t\tbuns: boolean) {\n\t\tthis.ingredients = ingredients;\n\t\tthis.buns = buns;\n\t}\n}\n\nburger: Burger = new Burger(\n\t\t["patty", \n\t\t"cheese", \n\t\t"lettuce"],\n\ttrue,\n);\nburger.ingredients.splice(1, 0, "lettuce");',
        target: "burger",
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

// A list of medium questions
export const MEDIUM_QUESTIONS: Question[] = [
    {
        question:
            'class Burger {\n\tpublic ingredients: string[];\n\tpublic bun: boolean;\n\tconstructor(\n\t\tingredients: string[];, \n\t\tbuns:boolean) {\n\t\tthis.ingredients = ingredients;\n\t\tthis.buns = buns;\n\t}\npublic ExtraCheese(): void {\n\t\tthis.ingredients.push("cheese");\n\t\tthis.ingredients.push("cheese");\n}\n\ndoubleBurger: Burger = new Burger(\n\t["patty",\n\t"patty"],\n\ttrue\n);\ndoubleBurger.ExtraCheese();\ndoubleBurger.ExtraCheese();',
        target: "doubleBurger",
        answer: [
            "bottom_bun",
            "patty",
            "patty",
            "cheese",
            "cheese",
            "cheese",
            "cheese",
            "top_bun",
        ],
        category: "Class Function",
    },
    {
        question:
            'class Burger {\n\tpublic ingredients: string[]; \n\tpublic buns: boolean;\n\tconstructor(\n\t\tingredients: string[], \n\t\tbuns: boolean) {\n\t\tthis.ingredients = ingredients;\n\t\tthis.buns = buns;\n\t}\n\n\tpublic LettuceBuns(): void {\n\t\tthis.ingredients[0] = "lettuce";\n\t\tthis.ingredients[this.ingredients.length - 1] = "lettuce";\n\t}\n}\n\nlet burger: Burger = new Burger(\n\t\t["patty", \n\t\t"cheese", \n\t\t"lettuce"],\n\t\ttrue,\n);\nburger.ingredients.splice(1, 0, "lettuce");\nburger.ingredients.splice(1, 0, "tomato");\nburger.LettuceBuns();',
        target: "burger",
        answer: [
            "bottom_bun",
            "lettuce",
            "lettuce",
            "tomato",
            "cheese",
            "lettuce",
        ],
        category: "Intermediate Methods",
    },
    {
        question:
            'class Burger {\n\tpublic ingredients: string[];\n\tpublic buns: boolean;\n\tconstructor(\n\t\tingredients: string[], \n\t\tbuns: boolean) {\n\t\tthis.ingredients = ingredients;\n\t\tthis.buns = buns;\n\t}\n}\n\nburger: Burger = new Burger(\n\t\t["patty", \n\t\t"cheese", \n\t\t"lettuce"],\n\t\ttrue,\n);\nfunction extraTomatos(burger: Burger) {\n\tburger.ingredients.push("tomato");\n}\nextraTomatos(burger);',
        target: "burger",
        answer: [
            "bottom_bun",
            "patty",
            "cheese",
            "lettuce",
            "tomato",
            "top_bun",
        ],
        category: "Procedural Logic",
    },
    {
        question:
            'class Burger {\n\tpublic ingredients: string[];\n\tpublic buns: boolean;\n\tconstructor(\n\t\tingredients: string[], \n\t\tbuns: boolean) {\n\t\tthis.ingredients = ingredients;\n\t\tthis.buns = buns;\n\t}\n}\n\nburger: Burger = new Burger(\n\t\t["patty", \n\t\t"cheese", \n\t\t"lettuce"],\n\t\ttrue,\n);\nburger.ingredients.unshift("tomato");\nburger.ingredients.push("tomato");\nfunction extraLettuce(burger: Burger) {\n\tburger.ingredients.push("lettuce");\n}\nextraLettuce(burger);',
        target: "burger",
        answer: [
            "bottom_bun",
            "tomato",
            "patty",
            "cheese",
            "lettuce",
            "tomato",
            "lettuce",
            "top_bun",
        ],
        category: "Procedural Logic",
    },
    {
        question:
            'class Burger {\n\tpublic ingredients: string[];\n\tpublic buns: boolean;\n\tconstructor(\n\t\tingredients: string[], \n\t\tbuns: boolean) {\n\t\tthis.ingredients = ingredients;\n\t\tthis.buns = buns;\n\t}\n}\n\nburger: Burger = new Burger(\n\t\t["patty", \n\t\t"cheese", \n\t\t"lettuce"],\n\t\ttrue,\n);\nfunction removeBuns(burger: Burger) {\n\tburger.buns = false;\n}\nremoveBuns(burger);',
        target: "burger",
        answer: ["bottom_bun", "patty", "cheese", "lettuce", "top_bun"],
        category: "Procedural Logic",
    },
    {
        question:
            'class Burger {\n\tpublic ingredients: string[];\n\tpublic buns: boolean;\n\tconstructor(\n\t\tingredients: string[], \n\t\tbuns: boolean) {\n\t\tthis.ingredients = ingredients;\n\t\tthis.buns = buns;\n\t}\n}\n\nburger: Burger = new Burger(\n\t\t["patty", \n\t\t"cheese", \n\t\t"lettuce"],\n\t\ttrue,\n);\nfunction extraPatties(burger: Burger) {\n\tburger.ingredients.push("patty");\n}\nextraPatties(burger);',
        target: "burger",
        answer: ["patty", "cheese", "lettuce"],
        category: "Procedural Logic",
    },
    {
        question:
            'class Burger {\n\tpublic ingredients: string[];\n\tpublic buns: boolean;\n\tconstructor(\n\t\tingredients: string[], \n\t\tbuns: boolean) {\n\t\tthis.ingredients = ingredients;\n\t\tthis.buns = buns;\n\t}\n}\n\nburger: Burger = new Burger(\n\t\t["patty", \n\t\t"cheese", \n\t\t"lettuce"],\n\ttrue,\n);\nburger.ingredients.splice(1, 0, "tomato");\nfunction veganBurger() {\n\tfor(let i = 0; i < burger.ingredients.length; i++) {\n\t\tif(burger.ingredients[i] === "cheese" || \n\t\t\tburger.ingredients[i] === "patty") {\n\t\t\tburger.ingredients.splice(i, 1);\n\t\t\ti--;\n\t\t}\n\t}\n}\nveganBurger();',
        target: "burger",
        answer: ["bottom_bun", "tomato", "lettuce", "top_bun"],
        category: "Intermediate Methods",
    },
    {
        question:
            'class Burger {\n\tpublic ingredients: string[];\n\tpublic buns: boolean;\n\tconstructor(\n\t\tingredients: string[], \n\t\tbuns: boolean) {\n\t\tthis.ingredients = ingredients;\n\t\tthis.buns = buns;\n\t}\n}\n\nburger: Burger = new Burger(\n\t\t["patty", \n\t\t"cheese", \n\t\t"lettuce"],\n\ttrue,\n);\nburger.ingredients.splice(1, 0, "lettuce");\nfunction vegetarianBurger() {\n\tfor(let i = 0; i < burger.ingredients.length; i++) {\n\t\tif(burger.ingredients[i] === "patty") {\n\t\t\tburger.ingredients.splice(i, 1);\n\t\t\ti--;\n\t\t}\n\t}\n\n\tburger.buns = false;\n\tburger.ingredients.unshift("lettuce");\n\tburger.ingredients.push("lettuce");\n}\nvegetarianBurger();',
        target: "burger",
        answer: ["lettuce", "cheese", "tomato", "lettuce", "lettuce"],
        category: "Intermediate Methods",
    },
    {
        question:
            'class Burger {\n\tpublic ingredients: string[];\n\tpublic buns: boolean;\n\tconstructor(\n\t\tingredients: string[], \n\t\tbuns: boolean) {\n\t\tthis.ingredients = ingredients;\n\t\tthis.buns = buns;\n\t}\n\n\tpublic inverseBuns() {\n\t\tthis.buns = !this.buns;\n\t}\n}\n\nburger: Burger = new Burger(\n\t\t["patty", \n\t\t"cheese", \n\t\t"lettuce"],\n\t\ttrue,\n);\nburger.ingredients.splice(1, 0, "tomato");\nburger.inverseBuns();',
        target: "burger",
        answer: ["patty", "cheese", "tomato", "lettuce"],
        category: "Intermediate Methods",
    },
    {
        question:
            'class Burger {\n\tpublic ingredients: string[];\n\tpublic buns: boolean;\n\tconstructor(\n\t\tingredients: string[], \n\t\tbuns: boolean) {\n\t\tthis.ingredients = ingredients;\n\t\tthis.buns = buns;\n\t}\n\tpublic doubleIngredients() {\n\t\tlet originalIngredients = [...this.ingredients];\n\t\tfor(let i = 0; i < originalIngredients.length; i++) {\n\t\t\tthis.ingredients.push(originalIngredients[i]);\n\t\t}\n\t}\n}\n\nburger: Burger = new Burger(\n\t\t["patty", \n\t\t"cheese", \n\t\t"lettuce"],\n\t\ttrue,\n);\nburger.doubleIngredients();',
        target: "burger",
        answer: [
            "bottom_bun",
            "patty",
            "cheese",
            "lettuce",
            "patty",
            "cheese",
            "lettuce",
            "top_bun",
        ],
        category: "Class Function",
    },
    {
        question:
            'class Burger {\n\tpublic ingredients: string[];\n\tpublic buns: boolean;\n\tconstructor(\n\t\tingredients: string[], \n\t\tbuns: boolean) {\n\t\tthis.ingredients = ingredients;\n\t\tthis.buns = buns;\n\t}\n\n\tpublic removeIngredient(ingredient: string) {\n\t\tfor(let i = 0; i < this.ingredients.length; i++) {\n\t\t\tif(this.ingredients[i] === ingredient) {\n\t\t\t\tthis.ingredients.splice(i, 1);\n\t\t\t\ti--;\n\t\t\t}\n\t\t}\n\t}\n}\n\nburger: Burger = new Burger(\n\t\t["patty", \n\t\t"cheese", \n\t\t"lettuce", \n\t\t"tomato"],\n\t\ttrue,\n);\nburger.removeIngredient("cheese");',
        target: "burger",
        answer: ["bottom_bun", "patty", "lettuce", "tomato", "top_bun"],
        category: "Class Function",
    },
    {
        question:
            'class Burger {\n\tpublic ingredients: string[];\n\tpublic buns: boolean;\n\tconstructor(\n\t\tingredients: string[], \n\t\tbuns: boolean) {\n\t\tthis.ingredients = ingredients;\n\t\tthis.buns = buns;\n\t}\n\n\tpublic removeIngredient(ingredient: string) {\n\t\tfor(let i = 0; i < this.ingredients.length; i++) {\n\t\t\tif(this.ingredients[i] === ingredient) {\n\t\t\t\tthis.ingredients.splice(i, 1);\n\t\t\t\ti--;\n\t\t\t}\n\t\t}\n\t}\n}\n\nburger: Burger = new Burger(\n\t\t["patty", \n\t\t"cheese", \n\t\t"lettuce", \n\t\t"tomato"],\n\t\ttrue,\n);\nburger.removeIngredient("tomato"); \nremoveIngredient("patty");',
        target: "burger",
        answer: ["bottom_bun", "cheese", "lettuce", "top_bun"],
        category: "Class Function",
    },
    {
        question:
            'class Burger {\n\tpublic ingredients: string[];\n\tpublic buns: boolean;\n\tconstructor(\n\t\tingredients: string[], \n\t\tbuns: boolean) {\n\t\tthis.ingredients = ingredients;\n\t\tthis.buns = buns;\n\t}\n\n\tpublic ReplacePatty(ingredient: string) {\n\t\tfor(let i = 0; i < this.ingredients.length; i++) {\n\t\t\tif(this.ingredients[i] === "patty") {\n\t\t\t\tthis.ingredients[i] = ingredient; \n\t\t\t}\n\t\t}\n\t}\n}\n\nburger: Burger = new Burger(\n\t\t["patty", \n\t\t"cheese", \n\t\t"lettuce", \n\t\t"tomato"],\n\t\ttrue,\n);\nburger.removeIngredient("tomato"); \nburger.replacePatty("cheese");',
        target: "burger",
        answer: ["bottom_bun", "cheese", "cheese", "lettuce", "top_bun"],
        category: "Class Function",
    },
    {
        question:
            'class Burger {\n\tpublic ingredients: string[];\n\tpublic buns: boolean;\n\tconstructor(\n\t\tingredients: string[], \n\t\tbuns: boolean) {\n\t\tthis.ingredients = ingredients;\n\t\tthis.buns = buns;\n\t}\n\n\tpublic ReplacePatty(ingredient: string) {\n\t\tfor(let i = 0; i < this.ingredients.length; i++) {\n\t\t\tif(this.ingredients[i] === "patty") {\n\t\t\t\tthis.ingredients[i] = ingredient; \n\t\t\t}\n\t\t}\n\t}\n}\n\nburger: Burger = new Burger(\n\t\t["patty", \n\t\t"cheese", \n\t\t"lettuce", \n\t\t"tomato"],\n\t\ttrue,\n);\nburger.replacePatty("lettuce");\nburger.splice(1, 0, "patty");\nburger.replacePatty("cheese");',
        target: "burger",
        answer: [
            "bottom_bun",
            "lettuce",
            "cheese",
            "cheese",
            "lettuce",
            "tomato",
            "top_bun",
        ],
        category: "Class Function",
    },
    {
        question:
            'class Salad {\n\tpublic ingredients: string[];\n\tconstructor(\n\tingredients: string[]) {\n\t\tthis.ingredients = ingredients;\n\t}\n\n\tpublic extraLarge() {\n\t\tthis.ingredients = [\n\t\t\t...this.ingredients, \n\t\t\t"tomato",\n\t\t\t"lettuce",\n\t\t\t"lettuce"\n\t\t];\n\t}\n}\n\nlet salad1: Salad = new Salad(\n\t\t["lettuce", \n\t\t"lettuce"],\n);\nsalad1.ingredients.push("tomato");\nsalad1.extraLarge();\nsalad1.ingredients.pop();\nsalad1.ingredients.shift();',
        target: "salad1",
        answer: [
            "lettuce",
            "lettuce",
            "tomato",
            "tomato",
            "lettuce",
            "lettuce",
        ],
        category: "Class Function",
    },
    {
        question:
            'class Salad {\n\tpublic ingredients: string[];\n\tconstructor(\n\tingredients: string[]) {\n\t\tthis.ingredients = ingredients;\n\t}\n\n\tpublic extraLarge() {\n\t\tthis.ingredients = [\n\t\t...this.ingredients, \n\t\t"tomato",\n\t\t"lettuce",\n\t\t"lettuce"\n\t\t];\n\t}\n}\n\nlet salad1: Salad = new Salad(\n\t\t["lettuce", \n\t\t"lettuce"],\n);\nsalad1.extraLarge();',
        target: "salad1",
        answer: ["lettuce", "lettuce", "tomato", "lettuce", "lettuce"],
        category: "Class Function",
    },
    {
        question:
            'class Salad {\n\tpublic ingredients: string[];\n\tconstructor(\n\tingredients: string[]) {\n\t\tthis.ingredients = ingredients;\n\t}\n}\n\nlet salad1: Salad = new Salad(\n\t\t["lettuce", \n\t\t"tomato"],\n);\nfunction doubleSalad() {\n\tfor(let i = 0; i < this.ingredients.length; i++) {\n\t\tthis.ingredients.push(this.ingredients[i]);\n\t}\n}',
        target: "salad1",
        answer: ["lettuce", "tomato", "lettuce", "tomato"],
        category: "Class Function",
    },
    {
        question:
            'class Salad {\n\tpublic ingredients: string[];\n\tconstructor(\n\tingredients: string[]) {\n\t\tthis.ingredients = ingredients;\n\t}\n}\n\nlet salad1: Salad = new Salad(\n\t\t["lettuce", \n\t\t"tomato"],\n);\nfunction addTomato() {\n\tthis.ingredients.push("tomato");\n\tthis.ingredients.push("tomato");\n}\naddTomato();',
        target: "salad1",
        answer: ["lettuce", "tomato", "tomato", "tomato"],
        category: "Class Function",
    },
    {
        question:
            'class Salad {\n\tpublic ingredients: string[];\n\tconstructor(\n\tingredients: string[]) {\n\t\tthis.ingredients = ingredients;\n\t}\n}\n\nlet salad1: Salad = new Salad(\n\t\t["lettuce", \n\t\t"tomato"],\n);\nsalad1.ingredients.push("tomato");\nsalad1.ingredients.push("lettuce");\nsalad1.ingredients.push("tomato");',
        target: "salad1",
        answer: ["lettuce", "tomato", "tomato", "lettuce", "tomato"],
        category: "Class Function",
    },
    {
        question:
            'class Burger {\n\tpublic ingredients: string[];\n\tpublic buns: boolean;\n\tconstructor(\n\t\tingredients: string[], \n\t\tbuns: boolean) {\n\t\tthis.ingredients = ingredients;\n\t\tthis.buns = buns;\n\t}\n}\n\nlet burger: Burger = new Burger(\n\t\t["patty", \n\t\t"cheese", \n\t\t"lettuce"],\n\ttrue,\n);\nburger.ingredients.unshift("tomato");\nfunction TomatoBuns() {\n\tburger.ingredients.push("tomato");\n\tburger.ingredients.unshift("tomato");\n\tburger.buns = false;\n}\nTomatoBuns();',
        target: "burger",
        answer: [
            "tomato",
            "bottom_bun",
            "patty",
            "cheese",
            "lettuce",
            "tomato",
        ],
        category: "Procedural Logic",
    },
];

// A list of hard questions
export const HARD_QUESTIONS: Question[] = [
    {
        question:
            'class Burger {\n\tpublic ingredients: string[]; \n\tpublic buns: boolean;\n\tconstructor(\n\t\tingredients: string[], \n\t\tbuns: boolean) {\n\t\t\tthis.ingredients = ingredients;\n\t\t\tthis.buns = buns;\n\t}\n}\n\nburger1: Burger = new Burger(\n\t\t["patty", \n\t\t"cheese", \n\t\t"lettuce"],\n\t\ttrue,\n);\nlet burger2: Burger = burger1;\nburger1.ingredients.push("tomato");',
        target: "burger1",
        answer: [
            "bottom_bun",
            "patty",
            "cheese",
            "lettuce",
            "tomato",
            "top_bun",
        ],
        category: "Shallow Copy",
    },
    {
        question:
            'class Burger {\n\tpublic ingredients: string[]; \n\tpublic buns: boolean;\n\tconstructor(\n\t\tingredients: string[], \n\t\tbuns: boolean) {\n\t\t\tthis.ingredients = ingredients;\n\t\t\tthis.buns = buns;\n\t}\n}\n\nburger1: Burger = new Burger(\n\t\t["patty", \n\t\t"cheese", \n\t\t"lettuce"],\n\t\ttrue,\n);\nlet burger2: Burger = burger1;\nburger2.ingredients.pop();',
        target: "burger1",
        answer: ["bottom_bun", "patty", "cheese", "top_bun"],
        category: "Shallow Copy",
    },
    {
        question:
            'class Salad {\n\tpublic ingredients: string[];\n\tconstructor(\n\t\tingredients: string[]) {\n\t\t\tthis.ingredients = ingredients;\n\t}\n}\n\nlet salad1: Salad = new Salad(\n\t\t["lettuce", \n\t\t"lettuce"],\n);\nlet salad2: Salad = salad1;\nsalad1.ingredients.push("tomato");',
        target: "salad1",
        answer: ["lettuce", "lettuce", "tomato"],
        category: "Shallow Copy",
    },
    {
        question:
            'class Salad {\n\tpublic ingredients: string[];\n\tconstructor(\n\t\tingredients: string[]) {\n\t\t\tthis.ingredients = ingredients;\n\t}\n}\n\nlet salad1: Salad = new Salad(\n\t\t["lettuce", \n\t\t"lettuce"],\n);\nlet salad2: Salad = new Salad(salad1.ingredients);\nsalad1.ingredients.pop();',
        target: "salad1",
        answer: ["lettuce", "lettuce", "tomato"],
        category: "Deep Copy",
    },
    {
        question:
            'class Cheeseburger {\n\tpublic ingredients: string[];\n\tpublic buns: boolean;\n\tconstructor(\n\t\tingredients: string[], \n\t\tbuns: boolean) {\n\t\t\tthis.ingredients = ingredients;\n\t\t\tthis.buns = buns;\n\t}\n}\n\nlet order1: Cheeseburger = new Cheeseburger(\n\t\t["patty", \n\t\t"cheese"],\n\t\ttrue,\n);\nlet order2: Cheeseburger = new Cheeseburger(\n\t[...order1.ingredients], \n\torder1.buns\n);\norder1.ingredients.unshift("lettuce");   ',
        target: "order1",
        answer: ["bottom_bun", "patty", "cheese", "top_bun"],
        category: "Deep Copy",
    },
    {
        question:
            'class Burger {\n\tpublic ingredients: string[]; \n\tpublic buns: boolean;\n\tconstructor(\n\t\tingredients: string[], \n\t\tbuns: boolean) {\n\t\t\tthis.ingredients = [...ingredients];\n\t\t\tthis.buns = buns;\n\t}\n}\n\nlet burger1: Burger = new Burger(\n\t\t["patty", \n\t\t"cheese", \n\t\t"lettuce", \n\t\t"tomato"],\n\t\ttrue,\n);\nlet burger2: Burger = new Burger(\n\t[...burger1.ingredients], \n\tburger1.buns\n);\nburger1.ingredients.push("patty");\nburger2.ingredients.shift();',
        target: "burger1",
        answer: [
            "bottom_bun",
            "patty",
            "cheese",
            "lettuce",
            "tomato",
            "top_bun",
        ],
        category: "Deep Copy",
    },
    {
        question:
            'class Burger {\n\tpublic ingredients: string[];\n\tbuns: boolean;\n\tconstructor(\n\t\tingredients: string[], \n\t\tbuns: boolean) {\n\t\t\tthis.ingredients = [...ingredients];\n\t\t\tthis.buns = buns;\n\t}\n}\n\nlet burger1: Burger = new Burger(\n\t\t["patty", \n\t\t"cheese", \n\t\t"lettuce", \n\t\t"tomato"],\n\t\ttrue,\n);\nlet burger2: Burger = new Burger(\n\t[...burger1.ingredients], \n\tburger1.buns\n);\nburger1.ingredients.push("patty");\nburger1.ingredients.unshift("tomato");',
        target: "burger1",
        answer: [
            "bottom_bun",
            "tomato",
            "patty",
            "cheese",
            "lettuce",
            "tomato",
            "patty",
            "top_bun",
        ],
        category: "Deep Copy",
    },
    {
        question:
            'class Burger {\n\tpublic ingredients: string[];\n\tbuns: boolean;\n\tconstructor(\n\t\tingredients: string[], \n\t\tbuns: boolean) {\n\t\t\tthis.ingredients = [...ingredients];\n\t\t\tthis.buns = buns;\n\t}\n}\n\nlet nothingBurger: Burger = new Burger(\n\t\t[],\n\tfalse,\n);\nlet somethingBurger: Burger = new Burger(\n\t[...burger1.ingredients], \n\tburger1.buns);\nsomethingBurger.buns = true;\nsomethingBurger.ingredients = ["patty", "cheese"];',
        target: "nothingBurger",
        answer: [],
        category: "Deep Copy",
    },
    {
        question:
            'class Burger {\n\tpublic ingredients: string[];\n\tbuns: boolean;\n\tconstructor(\n\t\tingredients: string[], \n\t\tbuns: boolean) {\n\t\t\tthis.ingredients = ingredients;\n\t\t\tthis.buns = buns;\n\t}\n}\n\nlet burger1: Burger = new Burger(\n\t\t["patty", \n\t\t"cheese", \n\t\t"lettuce", \n\t\t"tomato"],\n\t\ttrue,\n);\nlet burger2: Burger = burger1;\nburger1.ingredients.push("patty");\nburger2 = ["patty"];',
        target: "burger1",
        answer: ["bottom_bun", "patty", "top_bun"],
        category: "Shallow Copy",
    },
    {
        question:
            'class Burger {\n\tpublic ingredients: string[];\n\tbuns: boolean;\n\tconstructor(\n\t\tingredients: string[], \n\t\tbuns: boolean) {\n\t\t\tthis.ingredients = [...ingredients];\n\t\t\tthis.buns = buns;\n\t}\n}\n\nlet burger1: Burger = new Burger(\n\t\t["patty", \n\t\t"cheese", \n\t\t"lettuce", \n\t\t"tomato"],\n\t\ttrue,\n);\nlet burger2: Burger = new Burger(\n\t[...burger1.ingredients].push("tomato"), \n\tburger1.buns\n);\nburger1.ingredients = burger2.ingredients;',
        target: "burger1",
        answer: [
            "bottom_bun",
            "patty",
            "cheese",
            "lettuce",
            "tomato",
            "tomato",
            "top_bun",
        ],
        category: "Deep Copy",
    },
    {
        question:
            'class Salad {\n\tpublic ingredients: string[];\n\tconstructor(\n\t\tingredients: string[]) {\n\t\t\tthis.ingredients = [...ingredients];\n\t}\n\t}\n}\n\nlet salad1: Salad = new Salad(\n\t\t["lettuce", \n\t\t"tomato", \n\t\t"lettuce"],\n);\nlet salad2: Salad = new Salad(\n\t[...salad1.ingredients].pop()\n);\nsalad2.ingredients.push("tomato");\nsalad1 = salad2;',
        target: "salad1",
        answer: ["lettuce", "tomato", "tomato"],
        category: "Deep Copy",
    },
    {
        question:
            'class CheeseBurger {\n\tpublic ingredients: string[];\n\tbuns: boolean;\n\tconstructor(\n\t\tingredients: string[],\n\t\tbuns: boolean) {\n\t\t\tthis.ingredients = [...ingredients];\n\t\t\tthis.buns = buns;\n\t}\n\n\tpublic extraCheese() {\n\t\tthis.ingredients.push("cheese");\n\t\tthis.ingredients.push("cheese");\n\t}\n}\n\nlet cheeseBurger1: CheeseBurger = new CheeseBurger(\n\t\t["patty", \n\t\t"cheese"],\n\t\ttrue,\n);\nlet cheeseBurger2: CheeseBurger = cheeseBurger1;\ncheeseBurger2.extraCheese();',
        target: "cheeseBurger1",
        answer: [
            "bottom_bun",
            "patty",
            "cheese",
            "cheese",
            "cheese",
            "top_bun",
        ],
        category: "Shallow Copy",
    },
    {
        question:
            'class Burger {\n\tpublic ingredients: string[];\n\tbuns: boolean;\n\tconstructor(\n\t\tingredients: string[], \n\t\tbuns: boolean) {\n\t\t\tthis.ingredients = [...ingredients];\n\t\t\tthis.buns = buns;\n\t}\n}\nlet burger1: Burger = new Burger(\n\t\t["patty", \n\t\t"cheese", \n\t\t"lettuce", \n\t\t"tomato"],\n\t\ttrue,\n);\nlet burger2: Burger = new Burger(\n\t[...burger1.ingredients], \n\tburger1.buns\n);\nburger1.ingredients.push("patty");\nburger2 = ["patty", "cheese", "lettuce", "tomato"];',
        target: "burger1",
        answer: [
            "bottom_bun",
            "patty",
            "cheese",
            "lettuce",
            "tomato",
            "patty",
            "top_bun",
        ],
        category: "Deep Copy",
    },
    {
        question:
            'class Burger {\n\tpublic ingredients: string[];\n\tbuns: boolean;\n\tconstructor(\n\t\tingredients: string[], \n\t\tbuns: boolean) {\n\t\t\tthis.ingredients = ingredients;\n\t\t\tthis.buns = buns;\n\t}\n\tpublic function ReplaceBuns() {\n\t\tthis.buns = false;\n\t\tthis.ingredients.unshift("lettuce");\n\t\tthis.ingredients.push("lettuce");\n\t}\n}\nlet burger1: Burger = new Burger(\n\t["patty", "cheese", "tomato"], \n\ttrue\n);\nlet burger2 = new Burger(\n\t[...burger1.ingredients], \n\tburger1.buns);\nburger1.replaceBuns();\n',
        target: "burger1",
        answer: ["lettuce", "patty", "cheese", "tomato", "lettuce"],
        category: "Deep Copy",
    },
    {
        question:
            'class Burger {\n\tpublic ingredients: string[];\n\tbuns: boolean;\n\tconstructor(\n\t\tingredients: string[], \n\t\tbuns: boolean) {\n\t\t\tthis.ingredients = [...ingredients];\n\t\t\tthis.buns = buns;\n\t}\n}\n\nlet burger1: Burger = new Burger(\n\t\t["patty", \n\t\t"cheese", \n\t\t"lettuce", \n\t\t"tomato"],\n\t\ttrue,\n);\nlet burger2: Burger = new Burger(\n\t[...burger1.ingredients], \n\tburger1.buns\n);\nburger1.ingredients.push("patty");\nburger2 = ["patty", "cheese", "lettuce", "cheese"];\norder2.push("lettuce");',
        target: "burger1",
        answer: [
            "bottom_bun",
            "patty",
            "cheese",
            "lettuce",
            "tomato",
            "patty",
            "top_bun",
        ],
        category: "Deep Copy",
    },
    {
        question:
            'class Burger {\n\tpublic ingredients: string[];\n\tbuns: boolean;\n\tconstructor(\n\t\tingredients: string[], \n\t\tbuns: boolean) {\n\t\t\tthis.ingredients = [...ingredients];\n\t\t\tthis.buns = buns;\n\t}\n}\n\nlet burger1: Burger = new Burger(\n\t\t["patty", \n\t\t"cheese", \n\t\t"lettuce", \n\t\t"tomato"],\n\t\ttrue,\n);\nlet burger2: Burger = new Burger(\n\t[...burger1.ingredients], \n\tburger1.buns\n);\nburger1.ingredients.push("patty");\nburger2 = ["patty", "cheese", "lettuce", "tomato"];',
        target: "burger1",
        answer: [
            "bottom_bun",
            "patty",
            "cheese",
            "lettuce",
            "tomato",
            "patty",
            "top_bun",
        ],
        category: "Deep Copy",
    },
    {
        question:
            'class Burger {\n\tpublic ingredients: string[];\n\tbuns: boolean;\n\tconstructor(\n\t\tingredients: string[],\n\t\tbuns: boolean) {\n\t\t\tthis.ingredients = ingredients;\n\t\t\tthis.buns = buns;\n\t}\n}\n\nlet burger1: Burger = new Burger(\n\t\t["patty", \n\t\t"cheese", \n\t\t"cheese", \n\t\t"cheese"],\n\t\ttrue,\n);\nlet burger2: Burger = burger1;\nburger2.push("cheese");',
        target: "burger1",
        answer: [
            "bottom_bun",
            "patty",
            "cheese",
            "cheese",
            "cheese",
            "cheese",
            "top_bun",
        ],
        category: "Shallow Copy",
    },
    {
        question:
            'class Burger {\n\tpublic ingredients: string[];\n\tbuns: boolean;\n\tconstructor(\n\t\tingredients: string[], \n\t\tbuns: boolean) {\n\t\t\tthis.ingredients = [...ingredients];\n\t\t\tthis.buns = buns;\n\t}\n}\n\nlet burger1: Burger = new Burger(\n\t\t["patty", \n\t\t"cheese", \n\t\t"lettuce", \n\t\t"cheese"],\n\t\ttrue,\n);\nlet burger2: Burger = new Burger(\n\t[...burger1.ingredients], \n\tburger1.buns\n);\nburger2 = ["patty", "cheese", "lettuce", "tomato"];',
        target: "burger1",
        answer: [
            "bottom_bun",
            "patty",
            "cheese",
            "lettuce",
            "cheese",
            "top_bun",
        ],
        category: "Deep Copy",
    },
    {
        question:
            'class Burger {\n\tpublic ingredients: string[];\n\tbuns: boolean;\n\tconstructor(\n\t\tingredients: string[], \n\t\tbuns: boolean) {\n\t\t\tthis.ingredients = [...ingredients];\n\t\t\tthis.buns = buns;\n\t}\n}\n\nlet burger1: Burger = new Burger(\n\t\t["patty", \n\t\t"cheese"],\n\t\ttrue,\n);\nlet burger2: Burger = burger1;\nburger2 = ["patty", "cheese", "lettuce", "tomato"];\nburger2.buns = false;',
        target: "burger1",
        answer: ["patty", "cheese", "lettuce", "tomato"],
        category: "Shallow Copy",
    },
    {
        question:
            'class Salad {\n\tpublic ingredients: string[];\n\tconstructor(\n\t\tingredients: string[]) {\n\t\t\tthis.ingredients = [...ingredients];\n\t}\n\t}\n}\n\nlet salad1: Salad = new Salad(\n\t\t["lettuce", \n\t\t"tomato", \n\t\t"lettuce"],\n);\nlet salad2: Salad = new Salad(\n\t[...salad1.ingredients].push("tomato")\n);\nsalad2.ingredients.splice(2, 0, "tomato");\nsalad1 = salad2;',
        target: "salad1",
        answer: ["lettuce", "tomato", "lettuce", "tomato", "tomato"],
        category: "Deep Copy",
    },
];

export const QUESTION_BANK: Record<string, Question[]> = {
    easy: EASY_QUESTIONS,
    medium: MEDIUM_QUESTIONS,
    hard: HARD_QUESTIONS,
};
