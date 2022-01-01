let tasks = [];
function addTask(task) {
  tasks.push({
    ...task,
    solved: false,
    uuid: Math.random().toString(36).slice(-6),
  });
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

function updateTaskById(uuid, data) {
  tasks = tasks.map((task) => {
    if (task.uuid === uuid) {
      return { ...task, ...data };
    }
    return task;
  });
}

module.exports = {
  addTask,
  getTaskById,
  getTasksByDescription,
  getTasksBySolved,
  updateTaskById,
};
