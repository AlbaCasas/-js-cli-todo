const { prompt } = require("enquirer");
const {
  addTask,
  getTaskById,
  getTasksByDescription,
  getTasksBySolved,
  updateTaskById,
} = require("./api");

async function createTask() {
  const { description } = await prompt({
    name: "description",
    type: "input",
    message: "Description of your task",
  });
  addTask({ description });
  console.log(`Task ${description} created!`);
}

async function solveTask() {
  const unsolved = getTasksBySolved(false);
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
  const chosenTask = getTaskById(taskToSolve);
  if (chosenTask === undefined) {
    console.log("Please, you must select a valid uuid");
    return;
  }
  updateTaskById(taskToSolve, { solved: true });
  console.log(`${chosenTask.description} task marked as solved`);
}

async function filterTask() {
  const { search } = await prompt({
    name: "search",
    type: "input",
    message: "Search by:",
  });
  const filteredTasks = getTasksByDescription(search);
  if (filteredTasks.length === 0) {
    console.log("Did not find any task :(");
    return;
  }
  filteredTasks.forEach((task) => {
    if (task.solved === true) {
      console.log(`${task.description} (solved)`);
    } else {
      console.log(`${task.description}`);
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
        await filterTask();
        break;
    }
  }
}

main();
