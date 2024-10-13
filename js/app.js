import { fetchTasks, addTask, updateTaskStatus, deleteTask } from './api.js';
import { renderTasks, showError, createTaskRow } from './dom.js';

document.addEventListener('DOMContentLoaded', async () => {
  const taskTableElement = document.getElementById('tasks-table');
  const taskForm = document.getElementById('taskForm');

  // Load tasks when the page loads
  try {
    const tasks = await fetchTasks();
    renderTasks(taskTableElement, tasks, handleStatusToggle, handleTaskDelete);
  } catch (error) {
    showError('Failed to load tasks: ' + error.message);
  }

  // Handle form submission to add a new task
  taskForm.addEventListener('submit', async function (event) {
    event.preventDefault();

    const title = document.getElementById('taskTitle').value;
    const status = document.getElementById('taskStatus').value;

    try {
      const newTask = await addTask({ title, status });

      // Adicionando nova tarefa e renderizando a linha com as funções corretas
      const newRow = createTaskRow(
        newTask.title,
        newTask.status,
        newTask._id,
        handleStatusToggle,
        handleTaskDelete
      );
      taskTableElement.appendChild(newRow); // Adiciona a nova linha na tabela

      // Reseta o formulário após adicionar a tarefa
      taskForm.reset();
      closeForm();
    } catch (error) {
      showError('Failed to add task: ' + error.message);
    }
  });

  // Handle task status toggle
  async function handleStatusToggle(taskId, newStatus) {
    try {
      await updateTaskStatus(taskId, newStatus);
    } catch (error) {
      showError('Failed to update task status: ' + error.message);
    }
  }

  // Handle task delete
  async function handleTaskDelete(taskId) {
    try {
      await deleteTask(taskId);
      document.querySelector(`tr[data-task-id="${taskId}"]`).remove(); // Remove a linha da tabela
    } catch (error) {
      showError('Failed to delete task: ' + error.message);
    }
  }
});

// Buttons for opening and closing the form
const openFormButton = document.getElementById('openFormButton');
const closeFormButton = document.getElementById('closeFormButton');

// Function to open the form
openFormButton.addEventListener('click', function () {
  const form = document.getElementById('addTaskForm');
  form.classList.remove('hidden');
});

// Function to close the form
closeFormButton.addEventListener('click', function () {
  closeForm();
});

// Function to close the form after submitting a task
function closeForm() {
  const form = document.getElementById('addTaskForm');
  form.classList.add('hidden');
}
