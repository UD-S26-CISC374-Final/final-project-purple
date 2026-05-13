# That's Not My Programmer

## Elevator Pitch

It is the lunch rush, and you need to hurry! You are the cook, and you have to make all of the orders fast; however, the ticket machine malfunctioned and is now only code snippets! You have to be quick and decipher the classes and their fields to make the correct order! Once you have the order figured out, you have to drag and drop the correct ingredients onto the main plate. Be sure to be accurate; if not, you will have a couple of angry customers and maybe an angry manager on top of that.

## Influences (Brief)

- Overcooked:
    - Medium: Games
    - Explanation: Rhythm Heaven; very hectic and fast, has you think on your feet.
- Pizzatron 3000 Minigame - Club Penguin:
    - Medium: Games
    - Explanation: Pizzatron 3000 minigame from Club Penguin, fast paced pizza maker game where you must correct decisions as the pizzas appear in front of you on a conveyor belt.
- Papa's Pizzeria:
    - Medium: Games
    - Explanation: Fast paced pizza maker game where you must make the correct orders for the customers. The game gets progressively more stressful as you have more orders to manage and remember.

## Core Gameplay Mechanics (Brief)

- Order tickets come in containing a code snippet.
- The code snippet contains a class that makes up the orders, with fields containing variables.
- You drag and drop the ingredients based on the struct to make the correct order.
- They player can answer as many questions as they can before time runs out, giving them the oppurtunity to get a new high score.
- When the player gets a question wrong, they recieve no points and an explanation blurb for why it was wrong.

# Learning Aspects

## Learning Domains

Semi-Introductory programming, code tracing, and function scope.

## Target Audiences

Introductory Typescript students, slightly familiar with coding, but lacking fundamentals. Appropriate for any age. Best suited as a prerequisite for CISC181.

## Target Contexts

(K-12) computer lab style game, fun practice activity given at the start the semester.

## Learning Objectives

- Identifying Variable Values: By the end of the lesson, players will be able to identify if the value in a snippet of code has changed after a variety of function calls.
- Recognizing Pointer Updates: By the end of the lesson, players will be able to identify if a pointer has updated a specific variable’s value from a shallow copy.
- Monitoring Global Variables: By the end of the lesson, players will be able to correctly identify the value of a global variable after a function call.
- Trace Sequential State: By the end of the lesson, players will be able to accurately log how a variable’s value changes over multiple assignment operations.
- Identifying Class and Field values: By the end of the lesson, players will be able to identify the initialization of the fields in classes.

## Prerequisite Knowledge

- Prior to the game, players need to be able to interpret basic C code (=, if, function).
- Prior to the game, players need to be able to explain the difference between a local and global variable.
- Prior to the game, players must identify when a pointer changes the value of a variable indirectly.
- Prior to the game, players must explain what a pointer is.
- Prior to the game, players must explain the difference between a shallow and deep copy.
- Prior to the game, players must explain what a memory address is.
- Prior to the game, players must identify the “address of” operator.
- Prior to the game, players must identify the dereference operator.

## Assessment Measures

Question 1: Basic trace
<br>
Identify the order "burger1" after the following lines of code are executed:

```Typescript
public class Burger {
    public ingredients: string[];
    public buns: boolean;
    constructor(ingredients: string[], buns: boolean){
        this.ingredients = ingredients;
        this.buns = buns;
        }
    }
let burger1 = new Burger(["patty","cheese","lettuce"], true);
burger1.push("tomato");
}
```

Grading Logic: The correct answer is "bottom_bun, patty, cheese, lettuce, tomato, top_bun". Any other answer is incorrect.

<br><br>

Question 2: Function Calls
<br>
Identify the order "burger1" after the following lines of code are executed:

```Typescript
public class Burger {
    public ingredients: string[];
    public buns: boolean;
    constructor(ingredients: string[], buns: boolean){
        this.ingredients = ingredients;
        this.buns = buns;
        }
    public extraCheese(): void {
        ingredients.push("cheese");
        ingredients.push("cheese");
    }
}
let burger1: Burger = new Burger(["patty","lettuce"],true);
burger1.pop();
burger1.extraCheese();

```

Grading Logic: The correct order is "bottom_bun, patty, cheese, lettuce, tomato, top_bun". Any other answer is incorrect.

<br><br>

Question 3: Shallow and Deep Copies
<br>
Identify the order "burger1" after the following lines of code are executed:

```Typescript
public class Burger {
    public ingredients: string[];
    public buns: boolean;
    constructor(ingredients: string[], buns: boolean){
        this.ingredients = ingredients;
        this.buns = buns;
        }
    }
let burger1: Burger = new Burger(["patty","lettuce"],true);
let burger2: Burger = burger1;
burger2.push("patty");
burger2.shift();
```

Grading Logic: The correct answer is "bottom_bun, lettuce, patty, top_bun", any other answer is incorrect.

# What sets this project apart?

- This game builds muscle memory for programming and quick debugging foundations, while abstracting away the code to make students stress less.
- This game allows you to recognize when a value changes quickly due to the incentive of time.
- It puts the idea of coding in a unique environment, making the gameplay loop much more enjoyable since it reminds you of other time crunch games.
- This game gives players a break from an IDE/coding environment, replacing errors and incorrect answers with lost points, helping to change the environment and replace a frustrated mindset.

# Player Interaction Patterns and Modes

## Player Interaction Pattern

This is meant to be a single player game, but with an arcade-style leaderboard to incentivize players to get the highscore, either for their personal best, or between friends and classmates.

## Player Modes

- Main Menu: The main screen the game boots to, allows you to select one of the 3 different modes of the game you want to play from their associated buttons.
- Basic Trace: A basic version of the game where you trace through a statement of code with no function calls or pointer references. You must determine what the values of the fields are to make the order.
- Function Trace: An intermediate version of the game where you trace through a code snippet with a function call, global, and local variables. You must determine what the values of the fields are to make the order.
- Shallow and Deep Copies: The most difficult version of the game where you trace through a code snippet involving multiple variables and shallow or deep copies of the variables which may update those other variables. You must determine what the values of the fields are to make the order.
- Game Over: A game over screen played after you time is up. Allows you to go back to the home screen.

# Gameplay Objectives

**Make the Order**:

- Description: The order ticket is added to your list, you have to check the code, and determine what the ingredients are based off of the fields.
- Alignment: This aligns with the “identifying struct and field values” learning objective, as players must correctly identify the value of a variable.

**Rack Up Points**:

- Description: Your main goal is to rack up as many points over a certain time period. This will allow you to get a high score.
- Alignment: You are able to get points by getting orders right, and you can get more points by getting many orders right in a row to speed up the orders, which by getting a question correct you prove understanding of the 3 learning objectives.

# Procedures/Actions

- Click mode select to play the selected mode.
- Drag and drop the food items to create the order.

# Rules

The player has points they can use to buy powerups to slow the progression of the questions (slow down the speed of the belt). These points are accumulated by answering questions and serves as a way to save up and reward the player by giving them a slight mental break.

# Objects/Entities

- A kitchen table top entity
- Plates to represent orders
- A ticket to represent the code snippet
- Various ingredients
- Background screen
- Main game screen
- Clock timer

## Core Gameplay Mechanics (Detailed)

**The "Code Tickets"**:
<br>
This is the code snippet on the tickets that the player has to currently trace through. It displays the snippet the player must parse. Each question may vary in difficulty, but the style is the same for each question of the same “mode”. After figuring out the different field variables, the player must drag and drop the correct ingredients. 

**The "Shift Timer"**:
<br>
This timer adds an element of pressure and rush to the game, as the game is trying to teach students to correctly identify field variable values and decrease the time it takes to do so. The player's goal is to rack up as many points as possible within the given time frame.

**Sending Out Orders**:
<br>
This is the player’s primary way of interacting with the variables. Players drag and drop the ingredients to make the correct order.
If the player makes the correct order, the score increases, a correct sound plays, and the combo meter is incremented. If the incorrect order is made, the score does not change, but the combo meter is reset, and an incorrect sound plays.

## Feedback

The player will accumulate points towards their total score after answering questions correctly. When a question is answered correctly there will be a green flash of light at the end of the screen as the order leaves. If the question is answered incorrectly there will be a red flash of light when the order leaves the screen, and they will gain no points. There will also be an "error" message that pops up that gives them the correct answer and how to properly answer the question next time. Additionally there will be separate audio tracks for when the player answers the question correctly vs. incorrectly. The more questions the player gets correct, the closer they are to achieving the learning objective for that level of questions.

# Longer Term Feedback

We collect the player’s score, as well as the total number of questions answered correctly, and the total number of questions the player has attempted. The player will not have as many points if they have been consistently incorrect. When the player has been answering many questions correctly, the pace of the problems will speed up, and the code snippets will get longer, but they will also get more points during these “phases”. At a certain point if the player has not answered enough questions correctly, the game will end and recommend that they try again, and may provide links to relevant materials. At the end of a level, the player will be provided with analytics about the questions and topics they have answered incorrectly. When the player is able to progressively get to the end of a level and the speed has been increasing, then they know they have progressed and have mastered the learning objective.

# Story and Gameplay

## Presentation of Rules

There will be a tutorial option present within the game, telling the player to assess the correct ingredients looking at the code ticket. Drag and drop the associated ingredients for your answer. The ingredients will also have a glowing animation around them at first to guide the player’s eyes to them.

## Presentation of Content

The player is allowed to choose which ever level of questions that they please. The player can answer as many questions as they want before the time runs out.
## Story (Brief)

This game will have you be a cook in a kitchen and you must construct the correct dishes by correctly assessing the content of the variables that make up the order.

## Storyboarding

**Mode Selector Screen**:
<br>
![The Mode Selector Screen](../public/assets/Mode_Selector_Screen.png "Mode Selector Screen")

**Gameplay Storyboard**:
<br>
![Gameplay Storyboard](../public/assets/Updated_Storyboard.png "Gameplay Storyboard")

**Game Over Screen**:
<br>
![The Game Over Screen](../public/assets/Game_Over_Screen.png "Game Over Screen")

# Assets Needed

## Aethestics

That's Not My Programmer blends the gameplay of Papers, Please with the rhythm of Papa's Burgeria.
The player is given 8-bit ingredients to construct the order and the ticket corresponding to the order is shown on the screen.
Rhythmic music keeps pace with the speed of the level, and satisfying sounds play when the correct decision is made and a frustrating sound is played for incorrect answers.
When you answer a question at the last second, the game gives you a sense of relief. You leave each level feeling more confident in your programming abilities as you have just practiced your craft.

## Graphical

- Characters List
    - Cook: This is the main character, they are the character you control and is the one that makes the orders. They make sure they are the star employee at the workplace, making sure the food goes out on time, and that they are all correct.

**Textures**:

- Patty Sprite:

<br>

![The Patty Sprite](../public/assets/Burger.png)

- Top Bun Sprite:

<br>

![The Top Bun Sprite](../public/assets/top_bun.png)

- Bottom Bun Sprite:

<br>

![The Bottom Bun Sprite](../public/assets/bottom_bun.png)

- Lettuce Sprite:

<br>

![The Lettuce Sprite](../public/assets/lettuce.png)

- Cheese Sprite:

<br>

![The Tomato Sprite](../public/assets/Tomato.png)

- Burger Sprite:

<br>

![The Burger Sprite](../public/assets/Burger.png)

- Plate Texture:

<br>



![The Plate Sprite](../public/assets/Plate.png)

**Environment Art/Textures**:

- Kitchen Background:

<br>

![Kitchen Background](../public/assets/Background.png)


## Audio

- Music List (Ambient sound)
    - Main Music: Main Theme - Jacob Hudson

- Sound List (SFX)
    - Correct guess: MyInstants - https://www.myinstants.com/en/instant/correct-answer-gameshow/
    - Wrong Guess: MyInstants - https://www.myinstants.com/en/instant/wrong-lie-incorrect-buzzer-4726/
    - Patty Sound: Pixabay - https://pixabay.com/sound-effects/nature-cow-mooing-type-03-293302/
    - Cheese: Ralsei Squash - Deltarune
    - Lettuce: https://freesound.org/people/Hawkeye_Sprout/sounds/469155/
    - Tomato: FreeSound - https://freesound.org/people/HonorHunter/sounds/271666/
    - Bun: https://pixabay.com/sound-effects/film-special-effects-poof-of-smoke-87381/

# Metadata

- Initial version of That's Not My Programmer Educational Game Design Document
- Template created by Austin Cory Bart <acbart@udel.edu>, Mark Sheriff, Alec Markarian, and Benjamin Stanley.
- Version 0.0.4
