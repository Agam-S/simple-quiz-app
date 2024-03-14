#!/usr/bin/env node

import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import inquirer from "inquirer";
import gradient from "gradient-string";
import { createSpinner } from "nanospinner";
import figlet from "figlet";

const sleep3sec = (ms = 3000) => new Promise((res) => setTimeout(res, ms));
const sleep2sec = (ms = 2000) => new Promise((res) => setTimeout(res, ms));
const sleep1sec = (ms = 1000) => new Promise((res) => setTimeout(res, ms));

async function welcome() {
  const animatedTitle = chalkAnimation.neon(
    chalk.underline(chalk.bgBlack("Welcome to the simple quiz game! \n"))
  );

  await sleep3sec();
  animatedTitle.stop();

  console.log(`${chalk.bgMagenta("---Instructions---")}
  1. Enter your name
  2. Answer the 3 questions
  3. For each correct answer you get 1 point
  4. For each wrong answer you lose 1 point
  5. You can go negative score.
  6. See if you can get 3 points (MAX)
  7. ${chalk.bgGreen("Have fun!")} \n`);
  await sleep2sec();
}

let playerName;
let playerScore = 0;

async function askName() {
  const player = await inquirer.prompt({
    name: "player_name",
    type: "input",
    message: "What is your name?",
    default() {
      return "Player";
    },
  });
  playerName = player.player_name;
}

async function handleAnswer(answer) {
  const spinner = createSpinner("Checking answer...").start();
  await sleep2sec();

  if (answer) {
    spinner.success({
      text: `and.. the answer is CORRECT ${playerName}! Good job`,
    });
    playerScore++;
  } else {
    spinner.error({ text: `💀 Wrong answer ${playerName} !` });
    playerScore--;
  }
  await sleep1sec();
  console.log(`Your Current Score is: ${chalk.cyan(playerScore)} \n`);
}

async function question1() {
  let result = await inquirer.prompt({
    name: "question_1",
    type: "list",
    message: "First Question => Who created JavaScript?",
    choices: [
      "Steve Wozniak",
      "Bjarne Stroustrup",
      "Brendan Eich",
      "James Gosling",
    ],
  });
  return handleAnswer(result.question_1 === "Brendan Eich");
}

async function question2() {
  let result = await inquirer.prompt({
    name: "question_2",
    type: "list",
    message: "Next question => What can react props share?",
    choices: ["strings", "objects", "depends...", "anything"],
  });
  return handleAnswer(result.question_2 === "anything");
}

async function question3() {
  let result = await inquirer.prompt({
    name: "question_3",
    type: "list",
    message: "FINAL question => How would you rate this quiz game?",
    choices: ["5/5", "0/5", "booo"],
  });
  return handleAnswer(result.question_3 === "5/5");
}

function end() {
  console.clear();
  if (playerScore === 3) {
    figlet(
      `Congrats on getting 3 Scores, ${playerName} !\n You get nothing...`,
      (err, data) => {
        console.log(gradient.retro.multiline(data) + "\n");
        console.log(chalk.green(`Thanks for playing`));
        process.exit(0);
      }
    );
  } else {
    figlet(
      `You didn't get 3 Scores, ${playerName} !\n You get nothing...`,
      (err, data) => {
        console.log(gradient.pastel.multiline(data) + "\n");
        console.log(chalk.green(`Thanks for playing`));
        process.exit(0);
      }
    );
  }
}

console.clear();
await welcome();
await askName();
await question1();
await question2();
await question3();
await end();
