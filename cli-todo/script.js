const { prompt } = require("enquirer");

async function showOptions() {
  const { selectItems } = await prompt({
    type: "select",
    name: "selectItems",
    choices: [" - Create task", " - filter tasks", " - solve task "],
    message: "Choose an option",
  });
}

console.log(showOptions());
