const { prompt } = require("enquirer");

let tasks = [];

async function createTask() {
  const { description } = await prompt({
    name: "description",
    type: "input",
    message: "Description of your task",
  });
  const task = { description };
  tasks = [...tasks, task];
}

async function solveTask() {
  if (tasks.length === 0) {
    console.log("there is nothing to solve");
    return;
  }
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
        break;
    }
  }
}

main();
