function updateTaskStatus(status, taskIndex, tasksLocal) {
  for (let i = 0; i < tasksLocal.length; i += 1) {
    if (tasksLocal[i].index === (taskIndex)) {
      tasksLocal[i].completed = status;
    }
  }
  localStorage.setItem('tasks', JSON.stringify(tasksLocal));
  return tasksLocal;
}

function arrangeIndexes(tasksLocal) {
  for (let i = 0; i < tasksLocal.length; i += 1) {
    tasksLocal[i].index = (i + 1);
  }
  return tasksLocal;
}

function deleteCompletedTasks(tasksLocal) {
  const taskCheckbox = document.querySelectorAll('.checkbox');
  taskCheckbox.forEach((cb) => {
    if (cb.checked) {
      const li = cb.parentNode;
      li.remove();
    }
  });
  tasksLocal = tasksLocal.filter((tr) => tr.completed !== true);
  arrangeIndexes(tasksLocal);
  localStorage.setItem('tasks', JSON.stringify(tasksLocal));
  return tasksLocal;
}

export { updateTaskStatus, deleteCompletedTasks };
