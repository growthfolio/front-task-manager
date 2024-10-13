export function createTaskRow(
  title,
  status,
  taskId,
  toggleStatusCallback,
  deleteTaskCallback
) {
  const newRow = document.createElement('tr');
  newRow.classList.add(
    'transition',
    'ease-in-out',
    'duration-300',
    'bg-gray-100',
    'hover:bg-gray-200'
  );
  newRow.setAttribute('data-task-id', taskId); // Define o ID da tarefa

  const statusLabel = status === 'complete' ? 'Complete' : 'Pending';

  newRow.innerHTML = `
        <td class="border px-4 py-2">${title}</td>
        <td class="border px-4 py-2">
            <select class="status-dropdown">
                <option value="pending" ${
                  status === 'pending' ? 'selected' : ''
                }>A Fazer</option>
                <option value="complete" ${
                  status === 'complete' ? 'selected' : ''
                }>Concluido</option>
            </select>
        </td>
        <td class="border px-4 py-2">
            <button class="text-red-500 delete-btn">Apagar Tarefa</button>
        </td>
    `;

  // Dropdown de status
  const statusDropdown = newRow.querySelector('.status-dropdown');
  statusDropdown.addEventListener('change', () =>
    toggleStatusCallback(taskId, statusDropdown.value)
  );

  // Botão de deletar tarefa
  const deleteBtn = newRow.querySelector('.delete-btn');
  deleteBtn.addEventListener('click', () => deleteTaskCallback(taskId));

  return newRow;
}

export function renderTasks(
  taskTableElement,
  tasks,
  toggleStatusCallback,
  deleteTaskCallback
) {
  taskTableElement.innerHTML = ''; // Limpa a lista de tarefas

  tasks.forEach((task) => {
    const newRow = createTaskRow(
      task.title,
      task.status,
      task._id,
      toggleStatusCallback,
      deleteTaskCallback
    );
    taskTableElement.appendChild(newRow);
  });
}

export function showError(message) {
  const errorMessage = document.getElementById('errorMessage');
  const errorText = document.getElementById('errorText');
  errorText.textContent = message;
  errorMessage.classList.remove('hidden');
}
