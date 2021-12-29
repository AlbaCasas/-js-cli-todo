const { prompt } = require("enquirer");

let tasks = [];

/**
 * tasks = [
 * {
 *  description: "hacer la compra",
 *  solved: false,
 *  uuid: 2sadsa
 * },
 * {
 *  description: "entrenar",
 *  uuid: 2asdsad,
 *  solved: true
 * }
 * ]
 *
 */

async function createTask() {
  const uuid = Math.random().toString(36).slice(-6);
  const { description } = await prompt({
    name: "description",
    type: "input",
    message: "Description of your task",
  });
  const task = { description, uuid, solved: false };
  tasks = [...tasks, task];
  console.log(`Task ${description} created!`);
}

async function solveTask() {
  if (tasks.length === 0) {
    console.log("there is nothing to solve");
    return;
  }
  tasks.forEach((task) => {
    if (task.solved === false) {
      console.log(`${task.uuid} - ${task.description}`);
    }
  });
}

async function main() {
  let loop = true;
  while (loop) {
    const { selectItems } = await prompt({
      type: "select",
      name: "selectItems",
      choices: ["create task", "filter tasks", "solve task", "exit"],
      message: "Choose an option",
    });
    switch (selectItems) {
      case "exit":
        console.log("byes");
        loop = false;
        break;
      case "create task":
        await createTask();
        continue;
      case "solve task":
        await solveTask();
        continue;
      case "filter tasks":
        break;
    }
  }
}

main();
