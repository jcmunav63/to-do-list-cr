import './style.css';

import { createTaskElement, deleteTaskElement, updateTaskText } from './adddelupd.js';

import { updateTaskStatus, deleteCompletedTasks } from './completed.js';

let tasksLocal = [];

const loadTasksFromLocalStorage = () => {
  tasksLocal = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
};

const displayTaskElement = (task) => {
  const taskItem = document.createElement('li');
  taskItem.classList.add('task-row');

  const taskIndex = document.createElement('span');
  taskIndex.classList.add('task-index');
  taskIndex.value = task.index;

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.classList.add('checkbox');
  checkbox.checked = task.completed;

  const taskText = document.createElement('input');
  taskText.classList.add('task-text');
  taskText.value = task.name;
  if (task.completed) {
    taskText.classList.add('completed-task');
  }

  const moreIcon = document.createElement('span');
  moreIcon.classList.add('more-icon');

  const deleteIcon = document.createElement('span');
  deleteIcon.classList.add('delete-icon');
  deleteIcon.classList.add('hide');
  deleteIcon.innerHTML = '&#128465;';

  taskItem.appendChild(taskIndex);
  taskItem.appendChild(checkbox);
  taskItem.appendChild(taskText);
  taskItem.appendChild(moreIcon);
  taskItem.appendChild(deleteIcon);

  return taskItem;
};

function activateMoreListeners() {
  const moreBtn = document.querySelectorAll('.more-icon');
  moreBtn.forEach((mb) => {
    mb.addEventListener('click', (e) => {
      const clickedBtn = e.target;
      const parent = clickedBtn.parentNode;
      const delBtn = parent.getElementsByClassName('delete-icon')[0];
      const taskList = document.getElementById('task-list');
      if (delBtn.classList.contains('hide')) {
        delBtn.classList.remove('hide');
        delBtn.addEventListener('click', () => {
          deleteTaskElement(tasksLocal, delBtn);
          loadTasksFromLocalStorage();
          taskList.innerHTML = '';

          if (tasksLocal.length > 0) {
            tasksLocal.forEach((task) => {
              const taskElement = displayTaskElement(task);
              taskList.appendChild(taskElement);
            });
            window.location.reload();
          }
        });
      } else {
        delBtn.classList.add('hide');
      }
    });
  });
}

function activateCheckboxListeners() {
  const checkboxInput = document.querySelectorAll('.checkbox');
  checkboxInput.forEach((cbi) => {
    cbi.addEventListener('click', (e) => {
      const clickedCheck = e.target;
      const parent = clickedCheck.parentNode;
      const taskInput = parent.getElementsByClassName('task-text')[0];
      const taskIndex = parent.getElementsByClassName('task-index')[0].value;
      let status = false;
      if (clickedCheck.checked) {
        taskInput.classList.add('completed-task');
        status = true;
        updateTaskStatus(status, taskIndex, tasksLocal);
      } else {
        status = false;
        taskInput.classList.remove('completed-task');
        updateTaskStatus(status, taskIndex, tasksLocal);
      }
      loadTasksFromLocalStorage();
    });
  });
}

function activateTaskInputListeners() {
  const taskInput = document.querySelectorAll('.task-text');
  taskInput.forEach((ti) => {
    const parent = ti.parentNode;
    const taskIndex = parent.getElementsByClassName('task-index')[0].value;
    ti.addEventListener('change', () => {
      updateTaskText(ti.value, taskIndex, tasksLocal);
      loadTasksFromLocalStorage();
    });
  });
}

function activateCompletedListener() {
  const deleteCompleted = document.getElementById('erase-all');
  const taskList = document.getElementById('task-list');
  deleteCompleted.addEventListener('click', () => {
    deleteCompletedTasks(tasksLocal);
    loadTasksFromLocalStorage();
    taskList.innerHTML = '';

    if (tasksLocal.length > 0) {
      tasksLocal.forEach((task) => {
        const taskElement = displayTaskElement(task);
        taskList.appendChild(taskElement);
      });
      window.location.reload();
    }
  });
}

function activateListeners() {
  activateMoreListeners();
  activateCheckboxListeners();
  activateTaskInputListeners();
  activateCompletedListener();
}

document.getElementById('add-task-btn').addEventListener('click', () => {
  const taskInput = document.getElementById('task-input');
  const taskName = taskInput.value.trim();
  const taskList = document.getElementById('task-list');
  if (taskName !== '') {
    createTaskElement(taskName, tasksLocal);
    loadTasksFromLocalStorage();
    taskList.innerHTML = '';

    if (tasksLocal.length > 0) {
      tasksLocal.forEach((task) => {
        const taskElement = displayTaskElement(task);
        taskList.appendChild(taskElement);
      });
      activateListeners();
      taskInput.value = '';
    }
  }
});

window.onload = () => {
  loadTasksFromLocalStorage();
  const taskList = document.getElementById('task-list');
  if (tasksLocal.length > 0) {
    tasksLocal.forEach((task) => {
      const taskElement = displayTaskElement(task);
      taskList.appendChild(taskElement);
    });
    activateMoreListeners();
    activateCheckboxListeners();
    activateTaskInputListeners();
    activateCompletedListener();
  }
};
