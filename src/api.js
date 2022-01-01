let tasks = [];
function addTask(task) {
  tasks.push({ ...task, uuid: Math.random().toString(36).slice(-6) });
}

function getTasksById(id) {}

function getTasksByDescription(description) {}

function getTasksBySolved(description) {}

function updateById(uuid, data) {}

addTask({
  description: "Hola",
  solved: false,
});
addTask({
  description: "Hola",
  solved: false,
});

console.log(tasks);
