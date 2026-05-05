/** An interface representing a question, contains a question, its correct answer, and a category
 *
 * Fields:
 *  question: string, the code snippet to be displayed to the player
 *  answer: string[], the ingredients required in the correct answer
 *  category: string, the category of the question
 */
export interface Question {
    question: string;
    answer: string[];
    category: string;
}

// A list of easy questions
export const EASY_QUESTIONS: Question[] = [
    {
        question:
            'class Cheeseburger {\n\tpublic ingredients: string[];\n\tpublic buns: boolean;\n\tconstructor(\ningredients: string[], \nbuns: boolean) {\n\t\tthis.ingredients = ingredients;\n\t\tthis.buns = buns;\n\t}\n}\n\nlet order1: Cheeseburger = new Cheeseburger(\n\t\t["patty", \n\t\t"cheese"],\n\ttrue,\n);',
        answer: ["bottom_bun", "patty", "cheese", "top_bun"],
        category: "Static Initialization",
    },
    {
        question:
            'class Burger {\n\tpublic ingredients: string[];\n\tpublic buns: boolean;\n\tconstructor(\ningredients: string[], \nbuns: boolean) {\n\t\tthis.ingredients = ingredients;\n\t\tthis.buns = buns;\n\t}\n}\n\nlet extraLettuce: Burger = new Burger(\n\t\t["patty", "lettuce", "lettuce"],\n\ttrue,\n);',
        answer: ["bottom_bun", "patty", "lettuce", "lettuce", "top_bun"],
        category: "Static Initialization",
    },
    {
        question:
            'class Salad {\n\tpublic ingredients: string[];\n\tconstructor(\ningredients: string[]) {\n\t\tthis.ingredients = ingredients;\n\t}\n}\n\nlet salad1: Salad = new Salad(\n\t\t["lettuce", \n\t\t"lettuce"],\n);',
        answer: ["lettuce", "lettuce"],
        category: "Static Initialization",
    },
    {
        question:
            'class VeggieBurger {\n\tpublic ingredients: string[];\n\tpublic vegan: boolean;\n\tpublic buns: boolean;\n\tconstructor(\ningredients: string[], \nvegan: boolean, \nbuns: boolean) {\n\t\tthis.ingredients = ingredients;\n\t\tthis.vegan = vegan;\n\t\tthis.buns = buns;\n\t}\n}\n\nlet veggieBurger1: VeggieBurger \n= new VeggieBurger(\n\t\t["lettuce"],\n\ttrue,\n\ttrue,\n);',
        answer: ["bottom_bun", "lettuce", "top_bun"],
        category: "Static Initialization",
    },
    {
        question:
            'class DoubleBurger {\n\tpublic ingredients: string[];\n\tpublic buns: boolean;\n\tconstructor(\ningredients: string[], \nbuns: boolean) {\n\t\tthis.ingredients = ingredients;\n\t\tthis.buns = buns;\n\t}\n}\n\nlet doubleBurger1: DoubleBurger \n= new DoubleBurger(\n\t\t["patty", "patty"],\n\ttrue,\n);\ndoubleBurger1.ingredients.push("cheese");',
        answer: ["bottom_bun", "patty", "patty", "cheese", "top_bun"],
        category: "Basic Methods",
    },
    {
        question:
            'class Cheeseburger {\n\tpublic ingredients: string[];\n\tpublic buns: boolean;\n\tconstructor(\ningredients: string[], \nbuns: boolean) {\n\t\tthis.ingredients = ingredients;\n\t\tthis.buns = buns;\n\t}\n}\n\nlet order1: Cheeseburger = new Cheeseburger(\n\t\t["patty", \n\t\t"cheese", \n\t\t"cheese"],\n\ttrue,\n);',
        answer: ["bottom_bun", "patty", "cheese", "cheese", "top_bun"],
        category: "Basic Methods",
    },
    {
        question:
            'class Burger {\n\tpublic ingredients: string[];\n\tpublic buns: boolean;\n\tconstructor(\ningredients: string[], \nbuns: boolean) {\n\t\tthis.ingredients = ingredients;\n\t\tthis.buns = buns;\n\t}\n}\n\nlet burger: Burger = new Burger(\n\t\t["patty", \n\t\t"cheese", \n\t\t"lettuce"],\n\ttrue,\n);',
        answer: ["bottom_bun", "patty", "cheese", "lettuce", "top_bun"],
        category: "Static Initialization",
    },
    {
        question:
            'class Burger {\n\tpublic ingredients: string[];\n\tpublic buns: boolean;\n\tconstructor(\ningredients: string[], \nbuns: boolean) {\n\t\tthis.ingredients = ingredients;\n\t\tthis.buns = buns;\n\t}\n}\n\nburgerWithCheese: Burger = new Burger(\n\t\t["patty", \n\t\t"cheese", \n\t\t"lettuce"],\n\ttrue,\n);\nfunction addCheese(burger: Burger): void {\n\tburger.ingredients.splice(1, 0, "cheese");\n}\naddCheese(burgerWithCheese);',
        answer: ["bottom_bun", "patty", "cheese", "lettuce", "top_bun"],
        category: "Intermediate Methods",
    },
    {
        question:
            'class Burger {\n\tpublic ingredients: string[];\n\tpublic buns: boolean;\n\tconstructor(\ningredients: string[], \nbuns: boolean) {\n\t\tthis.ingredients = ingredients;\n\t\tthis.buns = buns;\n\t}\n}\n\ncheesyBurger: Burger = new Burger(\n\t\t["patty", \n\t\t"cheese"],\n\ttrue,\n);\ncheesyBurger.push("cheese")',
        answer: ["bottom_bun", "patty", "cheese", "cheese", "top_bun"],
        category: "Procedural Logic",
    },
    {
        question:
            'class Burger {\n\tpublic ingredients: string[];\n\tpublic buns: boolean;\n\tconstructor(\ningredients: string[], \nbuns: boolean) {\n\t\tthis.ingredients = ingredients;\n\t\tthis.buns = buns;\n\t}\n}\n\nburger: Burger = new Burger(\n\t\t["patty", \n\t\t"cheese", \n\t\t"lettuce"],\n\ttrue,\n);\nfunction addThreePatties(): void {\n\tburger.ingredients.push("patty");\n\tburger.ingredients.push("patty");\n\tburger.ingredients.push("patty");\n}\naddThreePatties();',
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
            'class Burger {\n\tpublic ingredients: string[];\n\tpublic buns: boolean;\n\tconstructor(\ningredients: string[], \nbuns: boolean) {\n\t\tthis.ingredients = ingredients;\n\t\tthis.buns = buns;\n\t}\n}\n\nburger: Burger = new Burger(\n\t\t["patty", \n\t\t"cheese", \n\t\t"lettuce"],\n\ttrue,\n);\nburger.push("tomato");',
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
            'class Burger {\n\tpublic ingredients: string[];\n\tpublic buns: boolean;\n\tconstructor(\ningredients: string[], \nbuns: boolean) {\n\t\tthis.ingredients = ingredients;\n\t\tthis.buns = buns;\n\t}\n}\n\nburger: Burger = new Burger(\n\t\t["patty", \n\t\t"cheese", \n\t\t"lettuce"],\n\ttrue,\n);',
        answer: ["bottom_bun", "patty", "cheese", "lettuce", "top_bun"],
        category: "Basic Methods",
    },
    {
        question:
            'class Burger {\n\tpublic ingredients: string[];\n\tpublic buns: boolean;\n\tconstructor(\ningredients: string[], \nbuns: boolean) {\n\t\tthis.ingredients = ingredients;\n\t\tthis.buns = buns;\n\t}\n}\n\nnoBuns: Burger = new Burger(\n\t\t["patty", \n\t\t"lettuce"],\n\tfalse,\n);',
        answer: ["patty", "lettuce"],
        category: "Basic Methods",
    },
    {
        question:
            'class Burger {\n\tpublic ingredients: string[];\n\tpublic buns: boolean;\n\tconstructor(\ningredients: string[], \nbuns: boolean) {\n\t\tthis.ingredients = ingredients;\n\t\tthis.buns = buns;\n\t}\n}\n\nhealthyBurger: Burger = new Burger(\n\t\t["patty", \n\t\t"cheese",\n\t\t"patty", \n\t\t"cheese", \n\t\t"patty", \n\t\t"cheese",\n\t\t"patty", \n\t\t"cheese", \n\t\t"lettuce"],\n\ttrue,\n);',
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
            'class Burger {\n\tpublic ingredients: string[];\n\tpublic buns: boolean;\n\tconstructor(\ningredients: string[], \nbuns: boolean) {\n\t\tthis.ingredients = ingredients;\n\t\tthis.buns = buns;\n\t}\n}\n\nburger: Burger = new Burger(\n\t\t["patty", \n\t\t"cheese", \n\t\t"tomato"],\n\ttrue,\n);',
        answer: ["bottom_bun", "patty", "cheese", "tomato", "top_bun"],
        category: "Procedural Logic",
    },
    {
        question:
            'class Burger {\n\tpublic ingredients: string[];\n\tpublic buns: boolean;\n\tconstructor(\ningredients: string[], \nbuns: boolean) {\n\t\tthis.ingredients = ingredients;\n\t\tthis.buns = buns;\n\t}\n}\n\nburger: Burger = new Burger(\n\t\t["patty", \n\t\t"cheese", \n\t\t"lettuce", \n\t\t"lettuce", \n\t\t"lettuce",\n\t\t"lettuce",\n\t\t"lettuce"],\n\ttrue,\n);',
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
            "class Burger {\n\tpublic ingredients: string[];\n\tpublic buns: boolean;\n\tconstructor(\ningredients: string[], \nbuns: boolean) {\n\t\tthis.ingredients = ingredients;\n\t\tthis.buns = buns;\n\t}\n}\n\nnothingBurger: Burger = new Burger(\n\t\t[],\n\tfalse,\n);",
        answer: [],
        category: "Static Initialization",
    },
    {
        question:
            'class Burger {\n\tpublic ingredients: string[];\n\tpublic buns: boolean;\n\tconstructor(\ningredients: string[], \nbuns: boolean) {\n\t\tthis.ingredients = ingredients;\n\t\tthis.buns = buns;\n\t}\n}\n\nburger: Burger = new Burger(\n\t\t["patty", \n\t\t"cheese", \n\t\t"lettuce"],\n\ttrue,\n);burger.ingredients.unshift("lettuce");',
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
            'class Burger {\n\tpublic ingredients: string[];\n\tpublic buns: boolean;\n\tconstructor(\ningredients: string[], \nbuns: boolean) {\n\t\tthis.ingredients = ingredients;\n\t\tthis.buns = buns;\n\t}\n}\n\nburger: Burger = new Burger(\n\t\t["patty", \n\t\t"cheese", \n\t\t"lettuce"],\n\ttrue,\n);burger.ingredients.shift();',
        answer: ["bottom_bun", "cheese", "lettuce", "top_bun"],
        category: "Basic Methods",
    },
    {
        question:
            'class Burger {\n\tpublic ingredients: string[];\n\tpublic buns: boolean;\n\tconstructor(\ningredients: string[], \nbuns: boolean) {\n\t\tthis.ingredients = ingredients;\n\t\tthis.buns = buns;\n\t}\n}\n\nburger: Burger = new Burger(\n\t\t["patty", \n\t\t"cheese", \n\t\t"lettuce"],\n\ttrue,\n);',
        answer: ["bottom_bun", "patty", "cheese", "lettuce", "top_bun"],
        category: "Procedural Logic",
    },
    {
        question:
            'class Burger {\n\tpublic ingredients: string[];\n\tpublic buns: boolean;\n\tconstructor(\ningredients: string[], \nbuns: boolean) {\n\t\tthis.ingredients = ingredients;\n\t\tthis.buns = buns;\n\t}\n}\n\nburger: Burger = new Burger(\n\t\t["patty", \n\t\t"cheese", \n\t\t"lettuce"],\n\ttrue,\n);\nburger.ingredients.splice(1, 0, "lettuce");',
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
            'class Burger {\n\tpublic ingredients: string[];\n\tpublic bun: boolean;\n\tconstructor(\ningredients: string[];, \nbuns:boolean) {\n\t\tthis.ingredients = ingredients;\n\t\tthis.buns = buns;\n\t}\npublic ExtraCheese(): void {\n\t\tthis.ingredients.push("cheese");\n\t\tthis.ingredients.push("cheese");\n}\n\ndoubleBurger: Burger = new Burger(["patty","patty"], true);\ndoubleBurger.ExtraCheese();\ndoubleBurger.ExtraCheese();',
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
            'class Burger {\n\tpublic ingredients: string[]; \n\tpublic buns: boolean;\n\tconstructor(\ningredients: string[], \nbuns: boolean) {\n\t\tthis.ingredients = ingredients;\n\t\tthis.buns = buns;\n\t}\npublic LettuceBuns(): void {\n\t\tthis.ingredients[0] = "lettuce";\n\t\tthis.ingredients[this.ingredients.length - 1] = "lettuce";\n\t}\n}\n\nburger: Burger = new Burger(\n\t\t["patty", \n\t\t"cheese", \n\t\t"lettuce"],\n\ttrue,\n);\nburger.ingredients.splice(1, 0, "lettuce");\nburger.ingredients.splice(1, 0, "tomato"); burger.LettuceBuns();',
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
            'class Burger {\n\tpublic ingredients: string[];\n\tpublic buns: boolean;\n\tconstructor(\ningredients: string[], \nbuns: boolean) {\n\t\tthis.ingredients = ingredients;\n\t\tthis.buns = buns;\n\t}\n}\n\nburger: Burger = new Burger(\n\t\t["patty", \n\t\t"cheese", \n\t\t"lettuce"],\n\ttrue,\n);\nfunction extraTomatos(burger: Burger) {\n\tburger.ingredients.push("tomato");\n}\nextraTomatos(burger);',
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
            'class Burger {\n\tpublic ingredients: string[];\n\tpublic buns: boolean;\n\tconstructor(\ningredients: string[], \nbuns: boolean) {\n\t\tthis.ingredients = ingredients;\n\t\tthis.buns = buns;\n\t}\n}\n\nburger: Burger = new Burger(\n\t\t["patty", \n\t\t"cheese", \n\t\t"lettuce"],\n\ttrue,\n);\nburger.ingredients.unshift("tomato");\nburger.ingredients.push("tomato");\nfunction extraLettuce(burger: Burger) {\n\tburger.ingredients.push("lettuce");\n}\nextraLettuce(burger);',
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
            'class Burger {\n\tpublic ingredients: string[];\n\tpublic buns: boolean;\n\tconstructor(\ningredients: string[], \nbuns: boolean) {\n\t\tthis.ingredients = ingredients;\n\t\tthis.buns = buns;\n\t}\n}\n\nburger: Burger = new Burger(\n\t\t["patty", \n\t\t"cheese", \n\t\t"lettuce"],\n\ttrue,\n);\nfunction removeBuns(burger: Burger) {\n\tburger.buns = false;\n}\nremoveBuns(burger);',
        answer: ["bottom_bun", "patty", "cheese", "lettuce", "top_bun"],
        category: "Procedural Logic",
    },
    {
        question:
            'class Burger {\n\tpublic ingredients: string[];\n\tpublic buns: boolean;\n\tconstructor(\ningredients: string[], \nbuns: boolean) {\n\t\tthis.ingredients = ingredients;\n\t\tthis.buns = buns;\n\t}\n}\n\nburger: Burger = new Burger(\n\t\t["patty", \n\t\t"cheese", \n\t\t"lettuce"],\n\ttrue,\n);\nfunction extraPatties(burger: Burger) {\n\tburger.ingredients.push("patty");\n}\nextraPatties(burger);',
        answer: ["patty", "cheese", "lettuce"],
        category: "Procedural Logic",
    },
    {
        question:
            'class Burger {\n\tpublic ingredients: string[];\n\tpublic buns: boolean;\n\tconstructor(\ningredients: string[], \nbuns: boolean) {\n\t\tthis.ingredients = ingredients;\n\t\tthis.buns = buns;\n\t}\n}\n\nburger: Burger = new Burger(\n\t\t["patty", \n\t\t"cheese", \n\t\t"lettuce"],\n\ttrue,\n);\nburger.ingredients.splice(1, 0, "tomato"); function veganBurger() {\n\tfor(let i = 0; i < burger.ingredients.length; i++) {\n\t\tif(burger.ingredients[i] === "cheese" || burger.ingredients[i] === "patty") {\n\t\t\tburger.ingredients.splice(i, 1);\n\t\t\ti--;\n\t\t}\n\t}\n}\nveganBurger();',
        answer: ["bottom_bun", "tomato", "lettuce", "top_bun"],
        category: "Intermediate Methods",
    },
    {
        question:
            'class Burger {\n\tpublic ingredients: string[];\n\tpublic buns: boolean;\n\tconstructor(\ningredients: string[], \nbuns: boolean) {\n\t\tthis.ingredients = ingredients;\n\t\tthis.buns = buns;\n\t}\n}\n\nburger: Burger = new Burger(\n\t\t["patty", \n\t\t"cheese", \n\t\t"lettuce"],\n\ttrue,\n);\nburger.ingredients.splice(1, 0, "lettuce"); function vegetarianBurger() {\n\tfor(let i = 0; i < burger.ingredients.length; i++) {\n\t\tif(burger.ingredients[i] === "patty") {\n\t\t\tburger.ingredients.splice(i, 1);\n\t\t\ti--;\n\t\t}\n\t}\nburger.buns = false;\nburger.ingredients.unshift("lettuce");\nburger.ingredients.push("lettuce");\n}\nvegetarianBurger();',
        answer: ["lettuce", "cheese", "tomato", "lettuce", "lettuce"],
        category: "Intermediate Methods",
    },
    {
        question:
            'class Burger {\n\tpublic ingredients: string[];\n\tpublic buns: boolean;\n\tconstructor(\ningredients: string[], \nbuns: boolean) {\n\t\tthis.ingredients = ingredients;\n\t\tthis.buns = buns;\n\t}\npublic inverseBuns() {\n\tthis.buns = !this.buns;\n}\n}\n\nburger: Burger = new Burger(\n\t\t["patty", \n\t\t"cheese", \n\t\t"lettuce"],\n\ttrue,\n);\nburger.ingredients.splice(1, 0, "tomato");\nburger.inverseBuns();',
        answer: ["patty", "cheese", "tomato", "lettuce"],
        category: "Intermediate Methods",
    },
    {
        question:
            'class Burger {\n\tpublic ingredients: string[];\n\tpublic buns: boolean;\n\tconstructor(\ningredients: string[], \nbuns: boolean) {\n\t\tthis.ingredients = ingredients;\n\t\tthis.buns = buns;\n\t}\npublic doubleIngredients() {\n\tlet originalIngredients = [...this.ingredients];\n\tfor(let i = 0; i < originalIngredients.length; i++) {\n\t\tthis.ingredients.push(originalIngredients[i]);\n\t}\n}\n}\n\nburger: Burger = new Burger(\n\t\t["patty", \n\t\t"cheese", \n\t\t"lettuce"],\n\ttrue,\n);\nburger.doubleIngredients();',
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
            'class Burger {\n\tpublic ingredients: string[];\n\tpublic buns: boolean;\n\tconstructor(\ningredients: string[], \nbuns: boolean) {\n\t\tthis.ingredients = ingredients;\n\t\tthis.buns = buns;\n\t}\npublic removeIngredient(ingredient: string) {\n\tfor(let i = 0; i < this.ingredients.length; i++) {\n\t\tif(this.ingredients[i] === ingredient) {\n\t\t\tthis.ingredients.splice(i, 1);\n\t\t\ti--;\n\t\t}\n\t}\n}\n}\n\nburger: Burger = new Burger(\n\t\t["patty", \n\t\t"cheese", \n\t\t"lettuce", \n\t\t"tomato"],\n\ttrue,\n);\nburger.removeIngredient("cheese");',
        answer: ["bottom_bun", "patty", "lettuce", "tomato", "top_bun"],
        category: "Class Function",
    },
    {
        question:
            'class Burger {\n\tpublic ingredients: string[];\n\tpublic buns: boolean;\n\tconstructor(\ningredients: string[], \nbuns: boolean) {\n\t\tthis.ingredients = ingredients;\n\t\tthis.buns = buns;\n\t}\npublic removeIngredient(ingredient: string) {\n\tfor(let i = 0; i < this.ingredients.length; i++) {\n\t\tif(this.ingredients[i] === ingredient) {\n\t\t\tthis.ingredients.splice(i, 1);\n\t\t\ti--;\n\t\t}\n\t}\n}\n}\n\nburger: Burger = new Burger(\n\t\t["patty", \n\t\t"cheese", \n\t\t"lettuce", \n\t\t"tomato"],\n\ttrue,\n);\nburger.removeIngredient("tomato"); \nremoveIngredient("patty");',
        answer: ["bottom_bun", "cheese", "lettuce", "top_bun"],
        category: "Class Function",
    },
    {
        question:
            'class Burger {\n\tpublic ingredients: string[];\n\tpublic buns: boolean;\n\tconstructor(\ningredients: string[], \nbuns: boolean) {\n\t\tthis.ingredients = ingredients;\n\t\tthis.buns = buns;\n\t}\npublic ReplacePatty(ingredient: string) {\n\tfor(let i = 0; i < this.ingredients.length; i++) {\n\t\tif(this.ingredients[i] === "patty") {\n\t\t\tthis.ingredients[i] = ingredient; \n\t\t}\n\t}\n}\n}\n\nburger: Burger = new Burger(\n\t\t["patty", \n\t\t"cheese", \n\t\t"lettuce", \n\t\t"tomato"],\n\ttrue,\n);\nburger.removeIngredient("tomato"); \nburger.replacePatty("cheese");',
        answer: ["bottom_bun", "cheese", "cheese", "lettuce", "top_bun"],
        category: "Class Function",
    },
    {
        question:
            'class Burger {\n\tpublic ingredients: string[];\n\tpublic buns: boolean;\n\tconstructor(\ningredients: string[], \nbuns: boolean) {\n\t\tthis.ingredients = ingredients;\n\t\tthis.buns = buns;\n\t}\npublic ReplacePatty(ingredient: string) {\n\tfor(let i = 0; i < this.ingredients.length; i++) {\n\t\tif(this.ingredients[i] === "patty") {\n\t\t\tthis.ingredients[i] = ingredient; \n\t\t}\n\t}\n}\n}\n\nburger: Burger = new Burger(\n\t\t["patty", \n\t\t"cheese", \n\t\t"lettuce", \n\t\t"tomato"],\n\ttrue,\n);\nburger.replacePatty("lettuce");\nburger.splice(1, 0, "patty");\nburger.replacePatty("cheese");',
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
            'class Salad {\n\tpublic ingredients: string[];\n\tconstructor(\ningredients: string[]) {\n\t\tthis.ingredients = ingredients;\n\t}\npublic extraLarge() {\n\tthis.ingredients = [\n...this.ingredients, \n"tomato",\n"lettuce",\n"lettuce"\n];\n}\n}\n\nlet salad1: Salad = new Salad(\n\t\t["lettuce", \n\t\t"lettuce"],\n);\nsalad1.ingredients.push("tomato");\nsalad1.extraLarge();\nsalad1.ingredients.pop();salad1.ingredients.shift();',
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
            'class Salad {\n\tpublic ingredients: string[];\n\tconstructor(\ningredients: string[]) {\n\t\tthis.ingredients = ingredients;\n\t}\npublic extraLarge() {\n\tthis.ingredients = [...this.ingredients, "tomato","lettuce","lettuce"];\n}\n}\n\nlet salad1: Salad = new Salad(\n\t\t["lettuce", \n\t\t"lettuce"],\n);\nsalad1.extraLarge();',
        answer: ["lettuce", "lettuce", "tomato", "lettuce", "lettuce"],
        category: "Class Function",
    },
    {
        question:
            'class Salad {\n\tpublic ingredients: string[];\n\tconstructor(\ningredients: string[]) {\n\t\tthis.ingredients = ingredients;\n\t}\n}\n\nlet salad1: Salad = new Salad(\n\t\t["lettuce", \n\t\t"tomato"],\n);\nfunction doubleSalad() {\n\tfor(let i = 0; i < this.ingredients.length; i++) {\n\t\tthis.ingredients.push(this.ingredients[i]);\n\t}\n}',
        answer: ["lettuce", "tomato", "lettuce", "tomato"],
        category: "Class Function",
    },
    {
        question:
            'class Salad {\n\tpublic ingredients: string[];\n\tconstructor(\ningredients: string[]) {\n\t\tthis.ingredients = ingredients;\n\t}\n}\n\nlet salad1: Salad = new Salad(\n\t\t["lettuce", \n\t\t"tomato"],\n);\nfunction addTomato() {\n\tthis.ingredients.push("tomato");\n}this.ingredients.push("tomato");\n}\naddTomato();',
        answer: ["lettuce", "tomato", "tomato", "tomato"],
        category: "Class Function",
    },
    {
        question:
            'class Salad {\n\tpublic ingredients: string[];\n\tconstructor(\ningredients: string[]) {\n\t\tthis.ingredients = ingredients;\n\t}\n}\n\nlet salad1: Salad = new Salad(\n\t\t["lettuce", \n\t\t"tomato"],\n);\nsalad1.ingredients.push("tomato");\nsalad1.ingredients.push("lettuce");\nsalad1.ingredients.push("tomato");',
        answer: ["lettuce", "tomato", "tomato", "lettuce", "tomato"],
        category: "Class Function",
    },
    {
        question:
            'class Burger {\n\tpublic ingredients: string[];\n\tpublic buns: boolean;\n\tconstructor(\ningredients: string[], \nbuns: boolean) {\n\t\tthis.ingredients = ingredients;\n\t\tthis.buns = buns;\n\t}\n}\n\nburger: Burger = new Burger(\n\t\t["patty", \n\t\t"cheese", \n\t\t"lettuce"],\n\ttrue,\n);\nburger.ingredients.unshift("tomato");\nfunction TomatoBuns() {\n\tburger.ingredients.push("tomato");\nburger.ingredients.unshift("tomato");\n\tburger.buns = false;\n}\nTomatoBuns();',
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
            'class Burger {\n\tpublic ingredients: string[]; \n\tpublic buns: boolean;\n\tconstructor(\ningredients: string[], \nbuns: boolean) {\n\t\tthis.ingredients = ingredients;\n\t\tthis.buns = buns;\n\t}\n}\n\nburger1: Burger = new Burger(\n\t\t["patty", \n\t\t"cheese", \n\t\t"lettuce"],\n\ttrue,\n);\nlet burger2: Burger = burger1;\nburger1.ingredients.push("tomato");',
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
            'class Burger {\n\tpublic ingredients: string[]; \n\tpublic buns: boolean;\n\tconstructor(\ningredients: string[], \nbuns: boolean) {\n\t\tthis.ingredients = ingredients;\n\t\tthis.buns = buns;\n\t}\n}\n\nburger1: Burger = new Burger(\n\t\t["patty", \n\t\t"cheese", \n\t\t"lettuce"],\n\ttrue,\n);\nlet burger2: Burger = burger1;\nburger2.ingredients.pop();',
        answer: ["bottom_bun", "patty", "cheese", "top_bun"],
        category: "Shallow Copy",
    },
    {
        question:
            'class Salad {\n\tpublic ingredients: string[];\n\tconstructor(\ningredients: string[]) {\n\t\tthis.ingredients = ingredients;\n\t}\n}\n\nlet salad1: Salad = new Salad(\n\t\t["lettuce", \n\t\t"lettuce"],\n);\nlet salad2: Salad = salad1;\nsalad1.ingredients.push("tomato");',
        answer: ["lettuce", "lettuce", "tomato"],
        category: "Shallow Copy",
    },
    {
        question:
            'class Salad {\n\tpublic ingredients: string[];\n\tconstructor(\ningredients: string[]) {\n\t\tthis.ingredients = ingredients;\n\t}\n}\n\nlet salad1: Salad = new Salad(\n\t\t["lettuce", \n\t\t"lettuce"],\n);\nlet salad2: Salad = new Salad(salad1.ingredients);\nsalad1.ingredients.pop();',
        answer: ["lettuce", "lettuce", "tomato"],
        category: "Deep Copy",
    },
    {
        question:
            'class Cheeseburger {\n\tpublic ingredients: string[];\n\tpublic buns: boolean;\n\tconstructor(\ningredients: string[], \nbuns: boolean) {\n\t\tthis.ingredients = ingredients;\n\t\tthis.buns = buns;\n\t}\n}\n\nlet order1: Cheeseburger = new Cheeseburger(\n\t\t["patty", \n\t\t"cheese"],\n\ttrue,\n);\nlet order2: Cheeseburger = new Cheeseburger(\n[...order1.ingredients], \norder1.buns);\norder1.ingredients.unshift("lettuce");   ',
        answer: ["bottom_bun", "patty", "cheese", "top_bun"],
        category: "Deep Copy",
    },
    {
        question:
            'class Burger {\n\tpublic ingredients: string[]; \n\tpublic buns: boolean;\n\tconstructor(\ningredients: string[], \nbuns: boolean) {\n\t\tthis.ingredients = [...ingredients];\n\t\tthis.buns = buns;\n\t}\n}\n\nlet burger1: Burger = new Burger(\n\t\t["patty", \n\t\t"cheese", \n\t\t"lettuce", \n\t\t"tomato"],\n\ttrue,\n);\nlet burger2: Burger = new Burger(\n[...burger1.ingredients], \nburger1.buns);\nburger1.ingredients.push("patty");\nburger2.ingredients.shift();',
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
            'class Burger {\n\tpublic ingredients: string[];\n\tbuns: boolean;\n\tconstructor(\ningredients: string[], \nbuns: boolean) {\n\t\tthis.ingredients = [...ingredients];\n\t\tthis.buns = buns;\n\t}\n}\n\nlet burger1: Burger = new Burger(\n\t\t["patty", \n\t\t"cheese", \n\t\t"lettuce", \n\t\t"tomato"],\n\ttrue,\n);\nlet burger2: Burger = new Burger(\n[...burger1.ingredients], \nburger1.buns);\nburger1.ingredients.push("patty");\nburger1.ingredients.unshift("tomato");',
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
            'class Burger {\n\tpublic ingredients: string[];\n\tbuns: boolean;\n\tconstructor(\ningredients: string[], \nbuns: boolean) {\n\t\tthis.ingredients = [...ingredients];\n\t\tthis.buns = buns;\n\t}\n}\n\nlet nothingBurger: Burger = new Burger(\n\t\t[],\n\tfalse,\n);\nlet somethingBurger: Burger = new Burger(\n[...burger1.ingredients], \nburger1.buns);\nsomethingBurger.buns = true;\nsomethingBurger.ingredients = ["patty", "cheese"];',
        answer: [],
        category: "Deep Copy",
    },
    {
        question:
            'class Burger {\n\tpublic ingredients: string[];\n\tbuns: boolean;\n\tconstructor(\ningredients: string[], \nbuns: boolean) {\n\t\tthis.ingredients = ingredients;\n\t\tthis.buns = buns;\n\t}\n}\n\nlet burger1: Burger = new Burger(\n\t\t["patty", \n\t\t"cheese", \n\t\t"lettuce", \n\t\t"tomato"],\n\ttrue,\n);\nlet burger2: Burger = burger1;\nburger1.ingredients.push("patty");\nburger2 = ["patty"];',
        answer: ["bottom_bun", "patty", "top_bun"],
        category: "Shallow Copy",
    },
    {
        question:
            'class Burger {\n\tpublic ingredients: string[];\n\tbuns: boolean;\n\tconstructor(\ningredients: string[], \nbuns: boolean) {\n\t\tthis.ingredients = [...ingredients];\n\t\tthis.buns = buns;\n\t}\n}\n\nlet burger1: Burger = new Burger(\n\t\t["patty", \n\t\t"cheese", \n\t\t"lettuce", \n\t\t"tomato"],\n\ttrue,\n);\nlet burger2: Burger = new Burger(\n[...burger1.ingredients].push("tomato"), \nburger1.buns);\nburger1.ingredients = burger2.ingredients;',
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
            'class Salad {\n\tpublic ingredients: string[];\n\tconstructor(\ningredients: string[]) {\n\t\tthis.ingredients = [...ingredients];\n\t}\n}\n\nlet salad1: Salad = new Salad(\n\t\t["lettuce", \n\t\t"tomato", \n\t\t"lettuce"],\n);\nlet salad2: Salad = new Salad(\n[...salad1.ingredients].pop());\nsalad2.ingredients.push("tomato");\nsalad1 = salad2;',
        answer: ["lettuce", "tomato", "tomato"],
        category: "Deep Copy",
    },
    {
        question:
            'class CheeseBurger {\n\tpublic ingredients: string[];\n\tbuns: boolean;\n\tconstructor(\ningredients: string[],\nbuns: boolean) {\n\t\tthis.ingredients = [...ingredients];\n\t\tthis.buns = buns;\n\t}public function extraCheese() {\n\t\tthis.ingredients.push("cheese");\n\t\tthis.ingredients.push("cheese");\nlet cheeseBurger1: CheeseBurger = new ChheeseBurger(\n\t\t["patty", \n\t\t"cheese"],\n\ttrue,\n);\nlet cheeseBurger2: CheeseBurger = cheeseBurger1;\ncheeseBurger2.extraCheese();',
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
            'class Burger {\n\tpublic ingredients: string[];\n\tbuns: boolean;\n\tconstructor(\ningredients: string[], \nbuns: boolean) {\n\t\tthis.ingredients = [...ingredients];\n\t\tthis.buns = buns;\n\t}\n}\n\nlet burger1: Burger = new Burger(\n\t\t["patty", \n\t\t"cheese", \n\t\t"lettuce", \n\t\t"tomato"],\n\ttrue,\n);\nlet burger2: Burger = new Burger(\n[...burger1.ingredients], \nburger1.buns);\nburger1.ingredients.push("patty");\nburger2 = ["patty", "cheese", "lettuce", "tomato"];',
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
            'class Burger {\n\tpublic ingredients: string[];\n\tbuns: boolean;\n\tconstructor(\ningredients: string[], \nbuns: boolean) {\n\t\tthis.ingredients = ingredients;\n\t\tthis.buns = buns;\n\t}\n\tpublic function ReplaceBuns() {\n\t\tthis.buns = false;\n\t\tthis.ingredients.unshift("lettuce");\n\t\tthis.ingredients.push("lettuce");\n\t}\n}\nlet burger1: Burger = new Burger(["patty", "cheese", "tomato"], true);\nlet burger2 = new Burger(\n[...burger1.ingredients], \nburger1.buns);\nburger1.replaceBuns();\n',
        answer: ["lettuce", "patty", "cheese", "tomato", "lettuce"],
        category: "Deep Copy",
    },
    {
        question:
            'class Burger {\n\tpublic ingredients: string[];\n\tbuns: boolean;\n\tconstructor(\ningredients: string[], \nbuns: boolean) {\n\t\tthis.ingredients = [...ingredients];\n\t\tthis.buns = buns;\n\t}\n}\n\nlet burger1: Burger = new Burger(\n\t\t["patty", \n\t\t"cheese", \n\t\t"lettuce", \n\t\t"tomato"],\n\ttrue,\n);\nlet burger2: Burger = new Burger(\n[...burger1.ingredients], \nburger1.buns);\nburger1.ingredients.push("patty");\nburger2 = ["patty", "cheese", "lettuce", "cheese"];\norder2.push("lettuce");',
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
            'class Burger {\n\tpublic ingredients: string[];\n\tbuns: boolean;\n\tconstructor(\ningredients: string[], \nbuns: boolean) {\n\t\tthis.ingredients = [...ingredients];\n\t\tthis.buns = buns;\n\t}\n}\n\nlet burger1: Burger = new Burger(\n\t\t["patty", \n\t\t"cheese", \n\t\t"lettuce", \n\t\t"tomato"],\n\ttrue,\n);\nlet burger2: Burger = new Burger(\n[...burger1.ingredients], \nburger1.buns);\nburger1.ingredients.push("patty");\nburger2 = ["patty", "cheese", "lettuce", "tomato"];',
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
            'class Burger {\n\tpublic ingredients: string[];\n\tbuns: boolean;\n\tconstructor(\ningredients: string[],\nbuns: boolean) {\n\t\tthis.ingredients = ingredients;\n\t\tthis.buns = buns;\n\t}\n}\n\nlet burger1: Burger = new Burger(\n\t\t["patty", \n\t\t"cheese", \n\t\t"cheese", \n\t\t"cheese"],\n\ttrue,\n);\nlet burger2: Burger = burger1; burger2.push("cheese");',
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
            'class Burger {\n\tpublic ingredients: string[];\n\tbuns: boolean;\n\tconstructor(\ningredients: string[], \nbuns: boolean) {\n\t\tthis.ingredients = [...ingredients];\n\t\tthis.buns = buns;\n\t}\n}\n\nlet burger1: Burger = new Burger(\n\t\t["patty", \n\t\t"cheese", \n\t\t"lettuce", \n\t\t"cheese"],\n\ttrue,\n);\nlet burger2: Burger = new Burger(\n[...burger1.ingredients], \nburger1.buns);\nburger2 = ["patty", "cheese", "lettuce", "tomato"];',
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
            'class Burger {\n\tpublic ingredients: string[];\n\tbuns: boolean;\n\tconstructor(\ningredients: string[], \nbuns: boolean) {\n\t\tthis.ingredients = [...ingredients];\n\t\tthis.buns = buns;\n\t}\n}\n\nlet burger1: Burger = new Burger(\n\t\t["patty", \n\t\t"cheese"],\n\ttrue,\n);\nlet burger2: Burger = burger1;\nburger2 = ["patty", "cheese", "lettuce", "tomato"]; burger2.buns = false;',
        answer: ["patty", "cheese", "lettuce", "tomato"],
        category: "Shallow Copy",
    },
    {
        question:
            'class Salad {\n\tpublic ingredients: string[];\n\tconstructor(\ningredients: string[]) {\n\t\tthis.ingredients = [...ingredients];\n\t}\n}\n\nlet salad1: Salad = new Salad(\n\t\t["lettuce", \n\t\t"tomato", \n\t\t"lettuce"],\n);\nlet salad2: Salad = new Salad(\n[...salad1.ingredients].push("tomato"));\nsalad2.ingredients.splice(2, 0, "tomato");\nsalad1 = salad2;',
        answer: ["lettuce", "tomato", "lettuce", "tomato", "tomato"],
        category: "Deep Copy",
    },
];
