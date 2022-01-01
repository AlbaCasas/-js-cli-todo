let tasks = [];
function addTask(task) {
  tasks.push({ ...task, uuid: Math.random().toString(36).slice(-6) });
}

function getTaskById(id) {
  return tasks.find((task) => task.uuid === id);
}

function getTasksByDescription(description) {
  return tasks.filter((task) => task.description.startsWith(description));
}

function getTasksBySolved(solved) {
  return tasks.filter((task) => task.solved === solved);
}

function updateById(uuid, data) {
  tasks = tasks.map((task) => {
    if (task.uuid === uuid) {
      return { ...task, ...data };
    }
    return task;
  });
}
