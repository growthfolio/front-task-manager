import { fetchTasks, addTask, updateTaskStatus } from './api.js';
import { renderTasks, showError } from './dom.js';


document.addEventListener("DOMContentLoaded", async () => {
    const taskTableElement = document.getElementById("tasks-table");
    const taskForm = document.getElementById("taskForm");

    // Load tasks when the page loads
    try {
        const tasks = await fetchTasks();
        renderTasks(taskTableElement, tasks, handleStatusToggle);
    } catch (error) {
        showError("Failed to load tasks: " + error.message);
    }

    // Handle form submission to add a new task
    taskForm.addEventListener("submit", async function(event) {
        event.preventDefault();

        const title = document.getElementById("taskTitle").value;
        const status = document.getElementById("taskStatus").value;

        try {
            const newTask = await addTask({ title, status });
            const newRow = createTaskRow(newTask.title, newTask.status, newTask._id, handleStatusToggle);
            taskTableElement.appendChild(newRow);
            closeForm();
        } catch (error) {
            showError("Failed to add task: " + error.message);
        }
    });

    // Handle task status toggle
    async function handleStatusToggle(taskId) {
        try {
            const taskRow = document.querySelector(`tr[data-task-id="${taskId}"]`);
            const currentStatus = taskRow.querySelector('.status-label').textContent.toLowerCase();
            const newStatus = currentStatus === 'completed' ? 'pending' : 'completed';
            await updateTaskStatus(taskId, newStatus);

            taskRow.querySelector('.status-label').textContent = newStatus === 'completed' ? 'Completed' : 'Pending';
            taskRow.querySelector('.status-btn').textContent = newStatus === 'completed' ? 'Mark as Pending' : 'Mark as Complete';
        } catch (error) {
            showError("Failed to update task status: " + error.message);
        }
    }
});

// Buttons for opening and closing the form
const openFormButton = document.getElementById("openFormButton");
const closeFormButton = document.getElementById("closeFormButton");

// Function to open the form
openFormButton.addEventListener('click', function() {
    const form = document.getElementById("addTaskForm");
    form.classList.remove("hidden");
});

// Function to close the form
closeFormButton.addEventListener('click', function() {
    const form = document.getElementById("addTaskForm");
    form.classList.add("hidden");
});
