const { prompt } = require("enquirer");

let tasks = [];

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
  const unsolved = tasks.filter((task) => {
    return task.solved === false;
  });
  if (unsolved.length === 0) {
    console.log("there is nothing to solve");
    return;
  }
  unsolved.forEach((task) => {
    console.log(`${task.uuid} - ${task.description}`);
  });
  const { taskToSolve } = await prompt({
    name: "taskToSolve",
    type: "input",
    message: "Type uuid of task to solve:",
  });
  tasks = tasks.map((task) => {
    if (taskToSolve === task.uuid) {
      return {
        ...task,
        solved: true,
      };
    }
    return task;
  });
  const chosenTask = tasks.find((task) => {
    return task.uuid === taskToSolve;
  });
  if (chosenTask === undefined) {
    console.log("Please, you must select a valid uuid");
    return;
  }
  console.log(`${chosenTask.description} task marked as solved`);
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
