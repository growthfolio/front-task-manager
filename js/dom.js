export function createTaskRow(title, status, taskId, toggleStatusCallback) {
    const newRow = document.createElement("tr");
    newRow.classList.add("transition", "ease-in-out", "duration-300", "bg-gray-100", "hover:bg-gray-200");
    newRow.setAttribute('data-task-id', taskId); // Set task ID

    const statusLabel = status === 'completed' ? 'Completed' : 'Pending';
    const statusBtnLabel = status === 'completed' ? 'Mark as Pending' : 'Mark as Complete';

    newRow.innerHTML = `
        <td class="border px-4 py-2">${title}</td>
        <td class="border px-4 py-2 status-label">${statusLabel}</td>
        <td class="border px-4 py-2">
            <button class="text-blue-500 status-btn">${statusBtnLabel}</button>
        </td>
    `;

    const statusBtn = newRow.querySelector('.status-btn');
    statusBtn.addEventListener('click', () => toggleStatusCallback(taskId));

    return newRow;
}

export function renderTasks(taskTableElement, tasks, toggleStatusCallback) {
    taskTableElement.innerHTML = ''; // Clear current task list

    tasks.forEach(task => {
        // Remove the user field and only pass title and status
        const newRow = createTaskRow(task.title, task.status, task._id, toggleStatusCallback);
        taskTableElement.appendChild(newRow);
    });
}

export function showError(message) {
    const errorMessage = document.getElementById("errorMessage");
    const errorText = document.getElementById("errorText");
    errorText.textContent = message;
    errorMessage.classList.remove("hidden");
}
