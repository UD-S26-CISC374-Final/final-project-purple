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
    explanation: string;
}

// A list of easy questions
export const EASY_QUESTIONS: Question[] = [
    {
        question:
            'class Cheeseburger {\n\tpublic ingredients: string[];\n\tpublic buns: boolean;\n\tconstructor(\n\t\tingredients: string[], \n\t\tbuns: boolean) {\n\t\tthis.ingredients = ingredients;\n\t\tthis.buns = buns;\n\t}\n}\n\nlet order1: Cheeseburger = new Cheeseburger(\n\t\t["patty", \n\t\t"cheese"],\n\ttrue,\n);',
        target: "order1",
        answer: ["bottom_bun", "patty", "cheese", "top_bun"],
        category: "Static Initialization",
        explanation:
            "Since buns is true, they are added to the bottom and top of the burger.\n The ingredients are added in the order they are listed in the array.",
    },
    {
        question:
            'class Burger {\n\tpublic ingredients: string[];\n\tpublic buns: boolean;\n\tconstructor(\n\t\tingredients: string[], \n\t\tbuns: boolean) {\n\t\tthis.ingredients = ingredients;\n\t\tthis.buns = buns;\n\t}\n}\n\nlet extraLettuce: Burger = new Burger(\n\t\t["patty", "lettuce", "lettuce"],\n\t\ttrue,\n);',
        target: "extraLettuce",
        answer: ["bottom_bun", "patty", "lettuce", "lettuce", "top_bun"],
        category: "Static Initialization",
        explanation:
            "Since buns is true, they are added to the bottom and top of the burger.\n The ingredients are added in the order they are listed in the array.",
    },
    {
        question:
            'class Salad {\n\tpublic ingredients: string[];\n\tconstructor(\n\t\tingredients: string[]) {\n\t\tthis.ingredients = ingredients;\n\t}\n}\n\nlet salad1: Salad = new Salad(\n\t\t["lettuce", \n\t\t"lettuce"],\n);',
        target: "salad1",
        answer: ["lettuce", "lettuce"],
        category: "Static Initialization",
        explanation:
            "Since Salad does not have buns, only the ingredients\nare added in the order they are listed in the array.",
    },
    {
        question:
            'class VeggieBurger {\n\tpublic ingredients: string[];\n\tpublic vegan: boolean;\n\tpublic buns: boolean;\n\tconstructor(\n\t\tingredients: string[], \n\t\tvegan: boolean, \n\t\tbuns: boolean) {\n\t\tthis.ingredients = ingredients;\n\t\tthis.vegan = vegan;\n\t\tthis.buns = buns;\n\t}\n}\n\nlet veggieBurger1: VeggieBurger \n= new VeggieBurger(\n\t\t["lettuce"],\n\ttrue,\n\ttrue,\n);',
        target: "veggieBurger1",
        answer: ["bottom_bun", "lettuce", "top_bun"],
        category: "Static Initialization",
        explanation:
            "Since buns is true, they are added to the bottom and top of the burger.\n The ingredients are added in the order they are listed in the array.",
    },
    {
        question:
            'class DoubleBurger {\n\tpublic ingredients: string[];\n\tpublic buns: boolean;\n\tconstructor(\n\t\tingredients: string[], \n\t\tbuns: boolean) {\n\t\tthis.ingredients = ingredients;\n\t\tthis.buns = buns;\n\t}\n}\n\nlet doubleBurger1: DoubleBurger \n= new DoubleBurger(\n\t\t["patty", "patty"],\n\ttrue,\n);\ndoubleBurger1.ingredients.push("cheese");',
        target: "doubleBurger1",
        answer: ["bottom_bun", "patty", "patty", "cheese", "top_bun"],
        category: "Basic Methods",
        explanation:
            "Since buns is true, they are added to the bottom and top of the burger.\n The ingredients are added in the order they are listed in the array.",
    },
    {
        question:
            'class Cheeseburger {\n\tpublic ingredients: string[];\n\tpublic buns: boolean;\n\tconstructor(\n\t\tingredients: string[], \n\t\tbuns: boolean) {\n\t\tthis.ingredients = ingredients;\n\t\tthis.buns = buns;\n\t}\n}\n\nlet order1: Cheeseburger = new Cheeseburger(\n\t\t["patty", \n\t\t"cheese", \n\t\t"cheese"],\n\ttrue,\n);',
        target: "order1",
        answer: ["bottom_bun", "patty", "cheese", "cheese", "top_bun"],
        category: "Basic Methods",
        explanation:
            "Since buns is true, they are added to the bottom and top of the burger.\n The ingredients are added in the order they are listed in the array.",
    },
    {
        question:
            'class Burger {\n\tpublic ingredients: string[];\n\tpublic buns: boolean;\n\tconstructor(\n\t\tingredients: string[], \n\t\tbuns: boolean) {\n\t\tthis.ingredients = ingredients;\n\t\tthis.buns = buns;\n\t}\n}\n\nlet burger: Burger = new Burger(\n\t\t["patty", \n\t\t"cheese", \n\t\t"lettuce"],\n\ttrue,\n);',
        target: "burger",
        answer: ["bottom_bun", "patty", "cheese", "lettuce", "top_bun"],
        category: "Static Initialization",
        explanation:
            "Since buns is true, they are added to the bottom and top of the burger.\n The ingredients are added in the order they are listed in the array.",
    },
    {
        question:
            'class Burger {\n\tpublic ingredients: string[];\n\tpublic buns: boolean;\n\tconstructor(\n\t\tingredients: string[], \n\t\tbuns: boolean) {\n\t\tthis.ingredients = ingredients;\n\t\tthis.buns = buns;\n\t}\n}\n\nburgerWithCheese: Burger = new Burger(\n\t\t["patty", \n\t\t"cheese", \n\t\t"lettuce"],\n\ttrue,\n);\nfunction addCheese(burger: Burger): void {\n\tburger.ingredients.splice(1, 0, "cheese");\n}\naddCheese(burgerWithCheese);',
        target: "burgerWithCheese",
        answer: [
            "bottom_bun",
            "patty",
            "cheese",
            "cheese",
            "lettuce",
            "top_bun",
        ],
        category: "Intermediate Methods",
        explanation:
            "Since buns is true, they are added to the bottom and top of the burger.\n The ingredients are added in the order they are listed in the array.\n Burger is passed by reference in extraCheese, so cheese is added to the original array.",
    },
    {
        question:
            'class Burger {\n\tpublic ingredients: string[];\n\tpublic buns: boolean;\n\tconstructor(\n\t\tingredients: string[], \n\t\tbuns: boolean) {\n\t\tthis.ingredients = ingredients;\n\t\tthis.buns = buns;\n\t}\n}\n\ncheesyBurger: Burger = new Burger(\n\t\t["patty", \n\t\t"cheese"],\n\ttrue,\n);\ncheesyBurger.push("cheese");',
        target: "cheesyBurger",
        answer: ["bottom_bun", "patty", "cheese", "cheese", "top_bun"],
        category: "Procedural Logic",
        explanation:
            "Since buns is true, they are added to the bottom and top of the burger.\n The ingredients are added in the order they are listed in the array.\n Since cheese is pushed, it is added to the end of the ingredients array,\n which is right before the top bun.",
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
        explanation:
            "Since buns is true, they are added to the bottom and top of the burger.\n The ingredients are added in the order they are listed in the array.\n Since patty is pushed three times, it is added to the end of the\n ingredients array three times, which is right before the top bun.",
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
        explanation:
            "Since buns is true, they are added to the bottom and top of the burger.\n The ingredients are added in the order they are listed in the array.\n Since tomato is pushed, it is added to the end of the ingredients array,\n which is right before the top bun.",
    },
    {
        question:
            'class Burger {\n\tpublic ingredients: string[];\n\tpublic buns: boolean;\n\tconstructor(\n\t\tingredients: string[], \n\t\tbuns: boolean) {\n\t\tthis.ingredients = ingredients;\n\t\tthis.buns = buns;\n\t}\n}\n\nburger: Burger = new Burger(\n\t\t["patty", \n\t\t"cheese", \n\t\t"lettuce"],\n\ttrue,\n);',
        target: "burger",
        answer: ["bottom_bun", "patty", "cheese", "lettuce", "top_bun"],
        category: "Basic Methods",
        explanation:
            "Since buns is true, they are added to the bottom and top of the burger.\n The ingredients are added in the order they are listed in the array.",
    },
    {
        question:
            'class Burger {\n\tpublic ingredients: string[];\n\tpublic buns: boolean;\n\tconstructor(\n\t\tingredients: string[], \n\t\tbuns: boolean) {\n\t\tthis.ingredients = ingredients;\n\t\tthis.buns = buns;\n\t}\n}\n\nnoBuns: Burger = new Burger(\n\t\t["patty", \n\t\t"lettuce"],\n\tfalse,\n);',
        target: "noBuns",
        answer: ["patty", "lettuce"],
        category: "Basic Methods",
        explanation:
            "Since buns is false, they are not added to the burger.\n The ingredients are added in the order they are listed in the array.",
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
        explanation:
            "Since buns is true, they are added to the bottom and top of the burger.\n The ingredients are added in the order they are listed in the array.",
    },
    {
        question:
            'class Burger {\n\tpublic ingredients: string[];\n\tpublic buns: boolean;\n\tconstructor(\n\t\tingredients: string[], \n\t\tbuns: boolean) {\n\t\tthis.ingredients = ingredients;\n\t\tthis.buns = buns;\n\t}\n}\n\nburger: Burger = new Burger(\n\t\t["patty", \n\t\t"cheese", \n\t\t"tomato"],\n\ttrue,\n);',
        target: "burger",
        answer: ["bottom_bun", "patty", "cheese", "tomato", "top_bun"],
        category: "Procedural Logic",
        explanation:
            "Since buns is true, they are added to the bottom and top of the burger.\n The ingredients are added in the order they are listed in the array.",
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
        explanation:
            "Since buns is true, they are added to the bottom and top of the burger.\n The ingredients are added in the order they are listed in the array.",
    },
    {
        question:
            "class Burger {\n\tpublic ingredients: string[];\n\tpublic buns: boolean;\n\tconstructor(\n\t\tingredients: string[], \n\t\tbuns: boolean) {\n\t\tthis.ingredients = ingredients;\n\t\tthis.buns = buns;\n\t}\n}\n\nnothingBurger: Burger = new Burger(\n\t\t[],\n\tfalse,\n);",
        target: "nothingBurger",
        answer: [],
        category: "Static Initialization",
        explanation:
            "Since buns is false, they are not added to the burger.\n Since there are no ingredients in the array, no ingredients are added to the burger.",
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
        explanation:
            "Since buns is true, they are added to the bottom and top of the burger.\n The ingredients are added in the order they are listed in the array.\n Since lettuce is unshifted, it is added to the beginning of the\ningredients array, which is right after the bottom bun.",
    },
    {
        question:
            'class Burger {\n\tpublic ingredients: string[];\n\tpublic buns: boolean;\n\tconstructor(\n\t\tingredients: string[], \n\t\tbuns: boolean) {\n\t\tthis.ingredients = ingredients;\n\t\tthis.buns = buns;\n\t}\n}\n\nburger: Burger = new Burger(\n\t\t["patty", \n\t\t"cheese", \n\t\t"lettuce"],\n\ttrue,\n);\nburger.ingredients.shift();',
        target: "burger",
        answer: ["bottom_bun", "cheese", "lettuce", "top_bun"],
        category: "Basic Methods",
        explanation:
            "Since buns is true, they are added to the bottom and top of the burger.\n The ingredients are added in the order they are listed in the array.\n Since patty is shifted, it is removed from the beginning of the\ningredients array, which is right after the bottom bun.",
    },
    {
        question:
            'class Burger {\n\tpublic ingredients: string[];\n\tpublic buns: boolean;\n\tconstructor(\n\t\tingredients: string[], \n\t\tbuns: boolean) {\n\t\tthis.ingredients = ingredients;\n\t\tthis.buns = buns;\n\t}\n}\n\nburger: Burger = new Burger(\n\t\t["patty", \n\t\t"cheese", \n\t\t"lettuce"],\n\ttrue,\n);',
        target: "burger",
        answer: ["bottom_bun", "patty", "cheese", "lettuce", "top_bun"],
        category: "Procedural Logic",
        explanation:
            "Since buns is true, they are added to the bottom and top of the burger.\n The ingredients are added in the order they are listed in the array.",
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
        explanation:
            "Since buns is true, they are added to the bottom and top of the burger.\n The ingredients are added in the order they are listed in the array.\n Since lettuce is spliced in location 1, it is the second ingredient\n added, after the patty and before the original cheese and lettuce.",
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
        explanation:
            "Since ExtraCheese is called twice, cheese is added to the end of the\n ingredients array four times, which is right before the top bun.",
    },
    {
        question:
            'class Burger {\n\tpublic ingredients: string[]; \n\tpublic buns: boolean;\n\tconstructor(\n\t\tingredients: string[], \n\t\tbuns: boolean) {\n\t\tthis.ingredients = ingredients;\n\t\tthis.buns = buns;\n\t}\n\n\tpublic LettuceBuns(): void {\n\t\tthis.buns = false;\n\t\tthis.ingredients[0] = "lettuce";\n\t\tthis.ingredients[this.ingredients.length - 1] = "lettuce";\n\t}\n}\n\nlet burger: Burger = new Burger(\n\t\t["patty", \n\t\t"cheese", \n\t\t"lettuce"],\n\t\ttrue,\n);\nburger.ingredients.splice(1, 0, "lettuce");\nburger.ingredients.splice(1, 0, "tomato");\nburger.LettuceBuns();',
        target: "burger",
        answer: ["lettuce", "lettuce", "tomato", "cheese", "lettuce"],
        category: "Intermediate Methods",
        explanation:
            "Since lettuce is spliced in location 1, it is the second ingredient added, after \n the patty and before the original cheese and lettuce.\n Since tomato is spliced in location 1, it is the third ingredient added, after the\n patty and before the original cheese and lettuce and the spliced lettuce.\n Since LettuceBuns is called, the first and last ingredients are changed to lettuce.",
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
        explanation:
            "Since extraTomatos is called, tomato is added to the end of the\n ingredients array, which is right before the top bun.",
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
        explanation:
            "Since tomato is unshifted, it is added to the beginning of the\n ingredients array, which is right after the bottom bun.\n Since tomato is pushed, it is added to the end of the ingredients array,\n which is right before the top bun. Since extraLettuce is called,\n lettuce is added to the end of the ingredients array,\n which is right before the top bun.",
    },
    {
        question:
            'class Burger {\n\tpublic ingredients: string[];\n\tpublic buns: boolean;\n\tconstructor(\n\t\tingredients: string[], \n\t\tbuns: boolean) {\n\t\tthis.ingredients = ingredients;\n\t\tthis.buns = buns;\n\t}\n}\n\nburger: Burger = new Burger(\n\t\t["patty", \n\t\t"cheese", \n\t\t"lettuce"],\n\t\ttrue,\n);\nfunction removeBuns() {\n\tburger.buns = false;\n}\nremoveBuns();',
        target: "burger",
        answer: ["patty", "cheese", "lettuce"],
        category: "Procedural Logic",
        explanation:
            "Since removeBuns is called, buns is set to false, so the bottom and\n top buns are removed from the burger.\n The ingredients are added in the order they are listed in the array.",
    },
    {
        question:
            'class Burger {\n\tpublic ingredients: string[];\n\tpublic buns: boolean;\n\tconstructor(\n\t\tingredients: string[], \n\t\tbuns: boolean) {\n\t\tthis.ingredients = ingredients;\n\t\tthis.buns = buns;\n\t}\n}\n\nburger: Burger = new Burger(\n\t\t["patty", \n\t\t"cheese", \n\t\t"lettuce"],\n\t\ttrue,\n);\nfunction extraPatties() {\n\tburger.ingredients.push("patty");\n}\nextraPatties();',
        target: "burger",
        answer: [
            "bottom_bun",
            "patty",
            "cheese",
            "lettuce",
            "patty",
            "top_bun",
        ],
        category: "Procedural Logic",
        explanation:
            "Since extraPatties is called, patty is added to the end of\n the ingredients array, which is right before the top bun.\n The ingredients are added in the order they are listed in the array.",
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
        category: "Intermediate Methods",
        explanation:
            "Since extraTomatos is called, tomato is added to the end of the\n ingredients array, which is right before the top bun.",
    },
    {
        question:
            'class Burger {\n\tpublic ingredients: string[];\n\tpublic buns: boolean;\n\tconstructor(\n\t\tingredients: string[], \n\t\tbuns: boolean) {\n\t\tthis.ingredients = ingredients;\n\t\tthis.buns = buns;\n\t}\n}\n\nburger: Burger = new Burger(\n\t\t["patty", \n\t\t"cheese", \n\t\t"lettuce"],\n\ttrue,\n);\nburger.ingredients.splice(1, 0, "lettuce");\nfunction vegetarianBurger() {\n\tfor(let i = 0; i < burger.ingredients.length; i++) {\n\t\tif(burger.ingredients[i] === "patty") {\n\t\t\tburger.ingredients.splice(i, 1);\n\t\t\ti--;\n\t\t}\n\t}\n\n\tburger.buns = false;\n\tburger.ingredients.unshift("lettuce");\n\tburger.ingredients.push("lettuce");\n}\nvegetarianBurger();',
        target: "burger",
        answer: ["lettuce", "cheese", "tomato", "lettuce", "lettuce"],
        category: "Intermediate Methods",
        explanation:
            "Since lettuce is spliced in location 1, it is the second ingredient added,\n after the patty and before the original cheese and lettuce.\n Since vegetarianBurger is called, the for loop removes all patties\n from the ingredients array, buns is set to false so the bottom and top buns\n are removed from the burger, lettuce is unshifted so it is added\n to the beginning of the ingredients array, therefore\n it is the first ingredient, and lettuce is pushed so it is added to\n the end of the ingredients array, being on the top.",
    },
    {
        question:
            'class Burger {\n\tpublic ingredients: string[];\n\tpublic buns: boolean;\n\tconstructor(\n\t\tingredients: string[], \n\t\tbuns: boolean) {\n\t\tthis.ingredients = ingredients;\n\t\tthis.buns = buns;\n\t}\n\n\tpublic inverseBuns() {\n\t\tthis.buns = !this.buns;\n\t}\n}\n\nburger: Burger = new Burger(\n\t\t["patty", \n\t\t"cheese", \n\t\t"lettuce"],\n\t\ttrue,\n);\nburger.ingredients.splice(1, 0, "tomato");\nburger.inverseBuns();',
        target: "burger",
        answer: ["patty", "cheese", "tomato", "lettuce"],
        category: "Intermediate Methods",
        explanation:
            "Since lettuce is spliced in location 1, it is the second ingredient added,\n after the patty and before the original cheese and lettuce.\n Since inverseBuns is called, buns is set to false, so the bottom\n and top buns are removed from the burger.",
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
        explanation:
            "Since doubleIngredients is called, patty, cheese, and lettuce\n are each added to the end of the ingredients array.",
    },
    {
        question:
            'class Burger {\n\tpublic ingredients: string[];\n\tpublic buns: boolean;\n\tconstructor(\n\t\tingredients: string[], \n\t\tbuns: boolean) {\n\t\tthis.ingredients = ingredients;\n\t\tthis.buns = buns;\n\t}\n\n\tpublic removeIngredient(ingredient: string) {\n\t\tfor(let i = 0; i < this.ingredients.length; i++) {\n\t\t\tif(this.ingredients[i] === ingredient) {\n\t\t\t\tthis.ingredients.splice(i, 1);\n\t\t\t\ti--;\n\t\t\t}\n\t\t}\n\t}\n}\n\nburger: Burger = new Burger(\n\t\t["patty", \n\t\t"cheese", \n\t\t"lettuce", \n\t\t"tomato"],\n\t\ttrue,\n);\nburger.removeIngredient("cheese");',
        target: "burger",
        answer: ["bottom_bun", "patty", "lettuce", "tomato", "top_bun"],
        category: "Class Function",
        explanation:
            "Since removeIngredient is called with cheese, cheese is removed from the ingredients array.\n The ingredients are added in the order they are listed in the array.",
    },
    {
        question:
            'class Burger {\n\tpublic ingredients: string[];\n\tpublic buns: boolean;\n\tconstructor(\n\t\tingredients: string[], \n\t\tbuns: boolean) {\n\t\tthis.ingredients = ingredients;\n\t\tthis.buns = buns;\n\t}\n\n\tpublic removeIngredient(ingredient: string) {\n\t\tfor(let i = 0; i < this.ingredients.length; i++) {\n\t\t\tif(this.ingredients[i] === ingredient) {\n\t\t\t\tthis.ingredients.splice(i, 1);\n\t\t\t\ti--;\n\t\t\t}\n\t\t}\n\t}\n}\n\nburger: Burger = new Burger(\n\t\t["patty", \n\t\t"cheese", \n\t\t"lettuce", \n\t\t"tomato"],\n\t\ttrue,\n);\nburger.removeIngredient("tomato"); \nremoveIngredient("patty");',
        target: "burger",
        answer: ["bottom_bun", "cheese", "lettuce", "top_bun"],
        category: "Class Function",
        explanation:
            "Since removeIngredient is called with tomato, tomato is removed from the ingredients array.\n Since removeIngredient is called with patty, patty is removed from the ingredients array.\n The ingredients are added in the order they are listed in the array.",
    },
    {
        question:
            'class Burger {\n\tpublic ingredients: string[];\n\tpublic buns: boolean;\n\tconstructor(\n\t\tingredients: string[], \n\t\tbuns: boolean) {\n\t\tthis.ingredients = ingredients;\n\t\tthis.buns = buns;\n\t}\n\n\tpublic removeIngredient(ingredient: string) {\n\t\tfor(let i = 0; i < this.ingredients.length; i++) {\n\t\t\tif(this.ingredients[i] === ingredient) {\n\t\t\t\tthis.ingredients.splice(i, 1);\n\t\t\t\ti--;\n\t\t\t}\n\n\tpublic ReplacePatty(ingredient: string) {\n\t\tfor(let i = 0; i < this.ingredients.length; i++) {\n\t\t\tif(this.ingredients[i] === "patty") {\n\t\t\t\tthis.ingredients[i] = ingredient; \n\t\t\t}\n\t\t}\n\t}\n}\n\nburger: Burger = new Burger(\n\t\t["patty", \n\t\t"cheese", \n\t\t"lettuce", \n\t\t"tomato"],\n\t\ttrue,\n);\nburger.removeIngredient("tomato"); \nburger.replacePatty("cheese");',
        target: "burger",
        answer: ["bottom_bun", "cheese", "cheese", "lettuce", "top_bun"],
        category: "Class Function",
        explanation:
            "Since removeIngredient is called with tomato, tomato is removed from the ingredients array.\n Since replacePatty is called with cheese, patty is replaced with cheese in the ingredients array.\n The ingredients are added in the order they are listed in the array.",
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
        explanation:
            "Since replacePatty is called with lettuce, patty is replaced with lettuce in the ingredients array.\n Since patty is spliced in location 1, it is the second ingredient added, after the bottom bun\n and before the original cheese, lettuce, and tomato.\n Since replacePatty is called with cheese, the new patty is replaced with cheese in the ingredients array.",
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
        explanation:
            "Since tomato is pushed, it is added to the end of the ingredients array.\n Since extraLarge is called, tomato, lettuce, and lettuce are added to the end\n of the ingredients array. Since pop is called, the last ingredient, which is lettuce,\n is removed from the ingredients array.\n Since shift is called, the first ingredient, which is lettuce,\n is removed from the ingredients array.",
    },
    {
        question:
            'class Salad {\n\tpublic ingredients: string[];\n\tconstructor(\n\tingredients: string[]) {\n\t\tthis.ingredients = ingredients;\n\t}\n\n\tpublic extraLarge() {\n\t\tthis.ingredients = [\n\t\t...this.ingredients, \n\t\t"tomato",\n\t\t"lettuce",\n\t\t"lettuce"\n\t\t];\n\t}\n}\n\nlet salad1: Salad = new Salad(\n\t\t["lettuce", \n\t\t"lettuce"],\n);\nsalad1.extraLarge();',
        target: "salad1",
        answer: ["lettuce", "lettuce", "tomato", "lettuce", "lettuce"],
        category: "Class Function",
        explanation:
            "Since extraLarge is called, tomato, lettuce, and lettuce are added to the end of the ingredients array.",
    },
    {
        question:
            'class Salad {\n\tpublic ingredients: string[];\n\tconstructor(\n\tingredients: string[]) {\n\t\tthis.ingredients = ingredients;\n\t}\n}\n\nlet salad1: Salad = new Salad(\n\t\t["lettuce", \n\t\t"tomato"],\n);\nfunction doubleSalad() {\n\tfor(let i = 0; i < this.ingredients.length; i++) {\n\t\tthis.ingredients.push(this.ingredients[i]);\n\t}\n}',
        target: "salad1",
        answer: ["lettuce", "tomato", "lettuce", "tomato"],
        category: "Class Function",
        explanation:
            "Since doubleSalad is called, lettuce and tomato are each added to the end of the ingredients array.",
    },
    {
        question:
            'class Salad {\n\tpublic ingredients: string[];\n\tconstructor(\n\tingredients: string[]) {\n\t\tthis.ingredients = ingredients;\n\t}\n}\n\nlet salad1: Salad = new Salad(\n\t\t["lettuce", \n\t\t"tomato"],\n);\nfunction addTomato() {\n\tthis.ingredients.push("tomato");\n\tthis.ingredients.push("tomato");\n}\naddTomato();',
        target: "salad1",
        answer: ["lettuce", "tomato", "tomato", "tomato"],
        category: "Class Function",
        explanation:
            "Since addTomato is called, tomato is added to the end of the ingredients\n array twice, which is right after the original tomato.",
    },
    {
        question:
            'class Salad {\n\tpublic ingredients: string[];\n\tconstructor(\n\tingredients: string[]) {\n\t\tthis.ingredients = ingredients;\n\t}\n}\n\nlet salad1: Salad = new Salad(\n\t\t["lettuce", \n\t\t"tomato"],\n);\nsalad1.ingredients.push("tomato");\nsalad1.ingredients.push("lettuce");\nsalad1.ingredients.push("tomato");',
        target: "salad1",
        answer: ["lettuce", "tomato", "tomato", "lettuce", "tomato"],
        category: "Class Function",
        explanation:
            "Since tomato is pushed, it is added to the end of the\n ingredients array, which is right after the original tomato.\n Since lettuce is pushed, it is added to the end of the ingredients array, which is right\n after the original tomato and the pushed tomato. Since tomato is pushed,\n it is added to the end of the ingredients array, which is right\n after the original tomato and the pushed tomato and lettuce.",
    },
    {
        question:
            'class Burger {\n\tpublic ingredients: string[];\n\tpublic buns: boolean;\n\tconstructor(\n\t\tingredients: string[], \n\t\tbuns: boolean) {\n\t\tthis.ingredients = ingredients;\n\t\tthis.buns = buns;\n\t}\n}\n\nlet burger: Burger = new Burger(\n\t\t["patty", \n\t\t"cheese", \n\t\t"lettuce"],\n\ttrue,\n);\nburger.ingredients.unshift("tomato");\nfunction TomatoBuns() {\n\tburger.ingredients.push("tomato");\n\tburger.ingredients.unshift("tomato");\n\tburger.buns = false;\n}\nTomatoBuns();',
        target: "burger",
        answer: ["tomato", "patty", "cheese", "lettuce", "tomato"],
        category: "Procedural Logic",
        explanation:
            "Since tomato is unshifted, it is added to the beginning of the ingredients array, which\n is right after the bottom bun. Since tomatoBuns is called, tomatos are added\n to the beginning and end of the ingredients array, and buns are removed.",
    },
];

// A list of hard questions
export const HARD_QUESTIONS: Question[] = [
    {
        question:
            'class Burger {\n\tpublic ingredients: string[]; \n\tpublic buns: boolean;\n\tconstructor(\n\t\tingredients: string[], \n\t\tbuns: boolean) {\n\t\t\tthis.ingredients = ingredients;\n\t\t\tthis.buns = buns;\n\t}\n}\n\nburger1: Burger = new Burger(\n\t\t["patty", \n\t\t"cheese", \n\t\t"lettuce"],\n\t\ttrue,\n);\nlet burger2: Burger = burger1;\nburger2.ingredients.push("tomato");',
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
        explanation:
            " Since burger2 is set equal to burger1, they reference the same object in memory,\n so changes to the ingredients array in burger1 also affect burger2.\n Since tomato is pushed to burger2, it affects burger1, and\n added to the end of the ingredients array.",
    },
    {
        question:
            'class Burger {\n\tpublic ingredients: string[]; \n\tpublic buns: boolean;\n\tconstructor(\n\t\tingredients: string[], \n\t\tbuns: boolean) {\n\t\t\tthis.ingredients = ingredients;\n\t\t\tthis.buns = buns;\n\t}\n}\n\nburger1: Burger = new Burger(\n\t\t["patty", \n\t\t"cheese", \n\t\t"lettuce"],\n\t\ttrue,\n);\nlet burger2: Burger = burger1;\nburger2.ingredients.pop();',
        target: "burger1",
        answer: ["bottom_bun", "patty", "cheese", "top_bun"],
        category: "Shallow Copy",
        explanation:
            " Since burger2 is set equal to burger1, they reference the same object in memory,\n so changes to the ingredients array in burger1 also affect burger2.\n Since pop is called on burger2, it removes the last ingredient, which is\n lettuce, from the ingredients array of both burger1 and burger2.",
    },
    {
        question:
            'class Salad {\n\tpublic ingredients: string[];\n\tconstructor(\n\t\tingredients: string[]) {\n\t\t\tthis.ingredients = ingredients;\n\t}\n}\n\nlet salad1: Salad = new Salad(\n\t\t["lettuce", \n\t\t"lettuce"],\n);\nlet salad2: Salad = salad1;\nsalad1.ingredients.push("tomato");',
        target: "salad1",
        answer: ["lettuce", "lettuce", "tomato"],
        category: "Shallow Copy",
        explanation:
            " Since salad2 is set equal to salad1, they reference the same object in memory,\n so changes to the ingredients array in salad1 also affect salad2.\n Since tomato is pushed to salad1, it affects salad2, and added to the end of the ingredients array.",
    },
    {
        question:
            'class Salad {\n\tpublic ingredients: string[];\n\tconstructor(\n\t\tingredients: string[]) {\n\t\t\tthis.ingredients = ingredients;\n\t}\n}\n\nlet salad1: Salad = new Salad(\n\t\t["lettuce", \n\t\t"lettuce"],\n);\nlet salad2: Salad = new Salad(salad1.ingredients);\nsalad1.ingredients.pop();',
        target: "salad1",
        answer: ["lettuce", "lettuce", "tomato"],
        category: "Deep Copy",
        explanation:
            " Since salad2 is created with a new array that is a copy of salad1's ingredients,\n they reference different objects in memory, so changes to the ingredients\n array in salad1 do not affect salad2. Since pop is called on salad1, it removes\n the last ingredient, which is lettuce, from the ingredients array\n of salad1, but does not affect salad2.",
    },
    {
        question:
            'class Cheeseburger {\n\tpublic ingredients: string[];\n\tpublic buns: boolean;\n\tconstructor(\n\t\tingredients: string[], \n\t\tbuns: boolean) {\n\t\t\tthis.ingredients = ingredients;\n\t\t\tthis.buns = buns;\n\t}\n}\n\nlet order1: Cheeseburger = new Cheeseburger(\n\t\t["patty", \n\t\t"cheese"],\n\t\ttrue,\n);\nlet order2: Cheeseburger = new Cheeseburger(\n\t[...order1.ingredients], \n\torder1.buns\n);\norder1.ingredients.unshift("lettuce");   ',
        target: "order1",
        answer: ["bottom_bun", "patty", "cheese", "top_bun"],
        category: "Deep Copy",
        explanation:
            " Since order2 is created with a new array that is a copy of order1's ingredients,\n they reference different objects in memory, so changes to the ingredients\n array in order1 do not affect order2. Since lettuce is unshifted\n to order1, it is added to the beginning of the ingredients array of order1,\n which is right after the bottom bun, but does not affect order2.",
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
        explanation:
            " Since burger2 is created with a new array that is a copy of burger1's ingredients,\n they reference different objects in memory, so changes to the ingredients array\n in burger1 do not affect burger2. Since patty is pushed\n to burger1, it is added to the end of the ingredients array\n of burger1, which is right before the top bun, but does not affect\n burger2. Since shift is called on burger2, it removes the first ingredient,\n which is patty, from the ingredients array of burger2, but does\n not affect burger1.",
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
        explanation:
            " Since burger2 is created with a new array that is a copy of burger1's ingredients,\n they reference different objects in memory, so changes to the ingredients\n array in burger1 do not affect burger2. Since patty is pushed\n to burger1, it is added to the end of the ingredients array of burger1, which is\n right before the top bun, but does not affect burger2.\n Since tomato is unshifted to burger1, it is added to the beginning of the ingredients\n array of burger1, which is right after the bottom bun,\n but does not affect burger2.",
    },
    {
        question:
            'class Burger {\n\tpublic ingredients: string[];\n\tbuns: boolean;\n\tconstructor(\n\t\tingredients: string[], \n\t\tbuns: boolean) {\n\t\t\tthis.ingredients = [...ingredients];\n\t\t\tthis.buns = buns;\n\t}\n}\n\nlet nothingBurger: Burger = new Burger(\n\t\t[],\n\tfalse,\n);\nlet somethingBurger: Burger = new Burger(\n\t[...burger1.ingredients], \n\tburger1.buns);\nsomethingBurger.buns = true;\nsomethingBurger.ingredients = ["patty", "cheese"];',
        target: "nothingBurger",
        answer: [],
        category: "Deep Copy",
        explanation:
            " Since somethingBurger is created with a new array that is a copy of nothingBurger's\n ingredients, they reference different objects in memory, so changes to the ingredients array\n and buns property in somethingBurger do not affect nothingBurger.\n Since buns is set to true in somethingBurger, it does not affect nothingBurger,\n which still has buns set to false.\n Since ingredients is set to a new array with patty and cheese in somethingBurger,\n it does not affect nothingBurger, which still has an empty ingredients array.",
    },
    {
        question:
            'class Burger {\n\tpublic ingredients: string[];\n\tbuns: boolean;\n\tconstructor(\n\t\tingredients: string[], \n\t\tbuns: boolean) {\n\t\t\tthis.ingredients = ingredients;\n\t\t\tthis.buns = buns;\n\t}\n}\n\nlet burger1: Burger = new Burger(\n\t\t["patty", \n\t\t"cheese", \n\t\t"lettuce", \n\t\t"tomato"],\n\t\ttrue,\n);\nlet burger2: Burger = burger1;\nburger1.ingredients.push("patty");\nburger2 = ["patty"];',
        target: "burger1",
        answer: ["bottom_bun", "patty", "top_bun"],
        category: "Shallow Copy",
        explanation:
            " Since burger2 is set equal to burger1, they reference the same object in memory,\n so changes to the ingredients array in burger1 also affect burger2.\n Since patty is pushed to burger1, it is added to the end of the ingredients array of burger1,\n which is right before the top bun, but does not affect burger2.\n Since burger2 is set equal to a new array with patty, it now references a\n different object in memory, so changes to the ingredients array in burger1\n do not affect burger2 anymore.",
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
        explanation:
            " Since burger2 is created with a new array that is a copy of burger1's ingredients,\n they reference different objects in memory, so changes to the ingredients array\n in burger1 do not affect burger2. Since push returns the new length\n of the array, burger2.ingredients is set to 5, which is not an array,\n so it does not affect burger1. Since burger1.ingredients is set equal to burger2.ingredients,\n which is 5, it does not affect the ingredients array of burger1,\n which still has the original ingredients.",
    },
    {
        question:
            'class Salad {\n\tpublic ingredients: string[];\n\tconstructor(\n\t\tingredients: string[]) {\n\t\t\tthis.ingredients = [...ingredients];\n\t}\n\t}\n}\n\nlet salad1: Salad = new Salad(\n\t\t["lettuce", \n\t\t"tomato", \n\t\t"lettuce"],\n);\nlet salad2: Salad = new Salad(\n\t[...salad1.ingredients].pop()\n);\nsalad2.ingredients.push("tomato");\nsalad1 = salad2;',
        target: "salad1",
        answer: ["lettuce", "tomato", "tomato"],
        category: "Deep Copy",
        explanation:
            " Since salad2 is created with a new array that is a copy of salad1's ingredients,\n they reference different objects in memory, so changes to the ingredients array in salad1\n do not affect salad2. Since pop returns the last ingredient, which is lettuce,\n salad2.ingredients is set to lettuce, which is not an array, so it\n does not affect salad1. Since tomato is pushed to salad2.ingredients,\n which is lettuce, it does not affect salad1.\n Since salad1 is set equal to salad2, it now references the same object\n in memory as salad2, so changes to the ingredients array in salad1\n also affect salad2.",
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
        explanation:
            " Since cheeseBurger2 is set equal to cheeseBurger1, they reference the same object in memory,\n so changes to the ingredients array in cheeseBurger1 also affect cheeseBurger2.\n Since extraCheese is called on cheeseBurger2, it pushes cheese to the end of the\n ingredients array of both cheeseBurger1 and cheeseBurger2.",
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
        explanation:
            " Since burger2 is created with a new array that is a copy of burger1's ingredients,\n they reference different objects in memory, so changes to\n the ingredients array in burger1 do not affect burger2.\n Since patty is pushed to burger1, it is added to the end of the ingredients array of burger1,\n which is right before the top bun, but does not affect burger2.\n Since burger2 is set equal to a new array with patty, cheese, lettuce,\n and tomato, it now references a different object in memory, so\n changes to the ingredients array in burger1 do not affect burger2 anymore.",
    },
    {
        question:
            'class Burger {\n\tpublic ingredients: string[];\n\tbuns: boolean;\n\tconstructor(\n\t\tingredients: string[], \n\t\tbuns: boolean) {\n\t\t\tthis.ingredients = ingredients;\n\t\t\tthis.buns = buns;\n\t}\n\tpublic function ReplaceBuns() {\n\t\tthis.buns = false;\n\t\tthis.ingredients.unshift("lettuce");\n\t\tthis.ingredients.push("lettuce");\n\t}\n}\nlet burger1: Burger = new Burger(\n\t["patty", "cheese", "tomato"], \n\ttrue\n);\nlet burger2 = new Burger(\n\t[...burger1.ingredients], \n\tburger1.buns);\nburger1.replaceBuns();\n',
        target: "burger1",
        answer: ["lettuce", "patty", "cheese", "tomato", "lettuce"],
        category: "Deep Copy",
        explanation:
            " Since burger2 is created with a new array that is a copy of burger1's ingredients,\n they reference different objects in memory, so changes to the ingredients array\n in burger1 do not affect burger2.\n Since replaceBuns is called on burger1, it unshifts lettuce to the beginning\n of the ingredients array of burger1, which is right after the bottom\n bun, and pushes lettuce to the end of the ingredients array of burger1,\n which is right before the top bun, but does not affect burger2.",
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
        explanation:
            " Since burger2 is created with a new array that is a copy of burger1's ingredients,\n they reference different objects in memory, so changes to the ingredients array in burger1\n do not affect burger2. Since patty is pushed to burger1, it is added to the end\n of the ingredients array of burger1, which is right before the top bun,\n but does not affect burger2. Since burger2 is set equal to a new array\n with patty, cheese, lettuce, and cheese, it now references a different object\n in memory, so changes to the ingredients array in burger1 do not affect\n burger2 anymore. Since lettuce is pushed to order2, which is the new array that burger2\n references, it does not affect burger1.",
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
        explanation:
            " Since burger2 is created with a new array that is a copy of burger1's\n ingredients, they reference different objects in memory, so changes\n to the ingredients array in burger1 do not affect burger2.\n Since patty is pushed to burger1, it is added to the end of the ingredients\n array of burger1, which is right before the top bun, but does not affect burger2.\n Since burger2 is set equal to a new array with patty, cheese, lettuce, and\n tomato, it now references a different object in memory, so changes\n to the ingredients array in burger1 do not affect burger2 anymore.",
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
        explanation:
            " Since burger2 is set equal to burger1, they reference the same object in memory,\n so changes to the ingredients array in burger1 also affect burger2.\n Since cheese is pushed to burger2, it is added to the end of\n the ingredients array of both burger1 and burger2.",
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
        explanation:
            " Since burger2 is created with a new array that is a copy of burger1's ingredients,\n they reference different objects in memory, so changes to the ingredients array\n in burger1 do not affect burger2. Since burger2 is\n set equal to a new array with patty, cheese, lettuce, and tomato,\n it now references a different object in memory, so changes to the\n ingredients array in burger1 do not affect burger2 anymore.",
    },
    {
        question:
            'class Burger {\n\tpublic ingredients: string[];\n\tbuns: boolean;\n\tconstructor(\n\t\tingredients: string[], \n\t\tbuns: boolean) {\n\t\t\tthis.ingredients = [...ingredients];\n\t\t\tthis.buns = buns;\n\t}\n}\n\nlet burger1: Burger = new Burger(\n\t\t["patty", \n\t\t"cheese"],\n\t\ttrue,\n);\nlet burger2: Burger = burger1;\nburger2 = ["patty", "cheese", "lettuce", "tomato"];\nburger2.buns = false;',
        target: "burger1",
        answer: ["patty", "cheese", "lettuce", "tomato"],
        category: "Shallow Copy",
        explanation:
            " Since burger2 is set equal to burger1, they reference the same object\n in memory, so changes to the ingredients array in burger1 also affect burger2.\n Since burger2 is set equal to a new array with patty, cheese, lettuce,\n and tomato, it now references a different object in memory, so changes\n to the ingredients array in burger1 do not affect burger2 anymore.\n Since buns is set to false in burger2, it does not affect burger1,\n which still has buns set to true.",
    },
    {
        question:
            'class Salad {\n\tpublic ingredients: string[];\n\tconstructor(\n\t\tingredients: string[]) {\n\t\t\tthis.ingredients = [...ingredients];\n\t}\n\t}\n}\n\nlet salad1: Salad = new Salad(\n\t\t["lettuce", \n\t\t"tomato", \n\t\t"lettuce"],\n);\nlet salad2: Salad = new Salad(\n\t[...salad1.ingredients].push("tomato")\n);\nsalad2.ingredients.splice(2, 0, "tomato");\nsalad1 = salad2;',
        target: "salad1",
        answer: ["lettuce", "tomato", "lettuce", "tomato", "tomato"],
        category: "Deep Copy",
        explanation:
            " Since salad2 is created with a new array that is a copy of salad1's\n ingredients, they reference different objects in memory, so changes\n to the ingredients array in salad1 do not affect salad2.\n Since push returns the new length of the array, salad2.ingredients is set to 4,\n which is not an array, so it does not affect salad1.\n Since splice is called on salad2.ingredients, which is 4, it does not affect salad1.\n Since salad1 is set equal to salad2, it now references the same object in\n memory as salad2, so changes to the ingredients array in salad1 also affect salad2.",
    },
];

export const QUESTION_BANK: Record<string, Question[]> = {
    easy: EASY_QUESTIONS,
    medium: MEDIUM_QUESTIONS,
    hard: HARD_QUESTIONS,
};
