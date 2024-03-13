#!/usr/bin/env node

import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import inquirer from "inquirer";

const sleep = (ms = 3000) => new Promise((res) => setTimeout(res, ms));

async function welcome() {
  const animatedTitle = chalkAnimation.neon(
    chalk.underline(chalk.bgBlack("Welcome to the simple quiz game! \n"))
  );

  await sleep();
  animatedTitle.stop();

  console.log(`${chalk.bgMagenta("---Instructions---")}
  1. Enter your name
  2. Answer the questions
  3. For each correct answer you get 1 point
  4. For each wrong answer you lose 1 point
  5. See if you get every question correct
  6. Have fun! \n`);
}

await welcome();

let playerName;
async function askName() {
  playerName = await inquirer.prompt({
    name: "player_name",
    type: "input",
    message: "What is your name?",
    default() {
      return "Player";
    },
  });
}

await askName();
