function createTaskElement(taskName, tasksLocal) {
  const index = tasksLocal.length + 1;
  const complete = false;
  const taskString = { index, name: taskName, completed: complete };
  tasksLocal.push(taskString);
  localStorage.setItem('tasks', JSON.stringify(tasksLocal));
}

function arrangeIndexes(tasksLocal) {
  for (let i = 0; i < tasksLocal.length; i += 1) {
    tasksLocal[i].index = (i + 1);
  }
  return tasksLocal;
}

function deleteTaskElement(tasksLocal, delBtn) {
  const parent = delBtn.parentNode;
  const taskIndex = parent.getElementsByClassName('task-index')[0].value;
  tasksLocal = tasksLocal.filter((tr) => tr.index !== taskIndex);
  const li = delBtn.parentNode;
  li.remove();
  arrangeIndexes(tasksLocal);
  localStorage.setItem('tasks', JSON.stringify(tasksLocal));
  return tasksLocal;
}

function updateTaskText(value, index, tasksLocal) {
  tasksLocal[index - 1].name = value;
  localStorage.setItem('tasks', JSON.stringify(tasksLocal));
}

export { createTaskElement, deleteTaskElement, updateTaskText };
