const { prompt } = require("enquirer");

let tasks = [];

async function createTask() {
  const uuid = Math.random().toString(36).slice(-6);
  const { description } = await prompt({
    name: "description",
    type: "input",
    message: "Description of your task",
  });
  const task = { description, uuid };
  tasks = [...tasks, task];
  console.log(`Task ${description} created!`);
}

async function solveTask() {
  if (tasks.length === 0) {
    console.log("there is nothing to solve");
    return;
  }
  tasks.forEach((task) => {
    console.log(`${task.uuid} - ${task.description}`);
  });
  const { uuidChosen } = await prompt({
    type: "input",
    name: "uuidChosen",
    message: "Enter a uuid to solve",
  });
  const taskToSolve = tasks.find((task) => {
    return task.uuid === uuidChosen;
  });
  tasks = tasks.filter((task) => {
    return task.uuid !== taskToSolve.uuid;
  });
  console.log(`${taskToSolve.description} task marked as solved!`);
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
