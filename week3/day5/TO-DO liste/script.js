const tasks = [];
let taskId = 0;

const form = document.getElementById("taskForm");
const input = document.getElementById("taskInput");
const listDiv = document.querySelector(".listTasks");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  addTask();
});

function addTask() {
  const text = input.value.trim();
  if (!text) return;

  const task = {
    task_id: taskId++,
    text: text,
    done: false,
  };

  tasks.push(task);
  renderTask(task);
  input.value = "";
}

function renderTask(task) {
  const taskDiv = document.createElement("div");
  taskDiv.classList.add("task");
  taskDiv.setAttribute("data-task-id", task.task_id);

  taskDiv.innerHTML = `
    <i class="fas fa-times"></i>
    <input type="checkbox">
    <label>${task.text}</label>
  `;

  // Handle checkbox
  const checkbox = taskDiv.querySelector("input[type='checkbox']");
  checkbox.addEventListener("change", () => doneTask(task.task_id, checkbox));

  // Handle delete
  const deleteBtn = taskDiv.querySelector(".fa-times");
  deleteBtn.addEventListener("click", () => deleteTask(task.task_id, taskDiv));

  listDiv.appendChild(taskDiv);
}

function doneTask(id, checkbox) {
  const task = tasks.find((t) => t.task_id === id);
  if (task) {
    task.done = checkbox.checked;
    const taskDiv = document.querySelector(`[data-task-id='${id}']`);
    taskDiv.classList.toggle("done", task.done);
  }
}

function deleteTask(id, element) {
  const index = tasks.findIndex((t) => t.task_id === id);
  if (index !== -1) {
    tasks.splice(index, 1);
    element.remove();
  }
}
