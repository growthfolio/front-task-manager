import { getToken } from './auth.js';

const API_URL = 'http://localhost:3000/tasks';

// Fetch all tasks (public, no authentication required)
export async function fetchTasks() {
    try {
        const response = await fetch(API_URL); // No Authorization header
        if (!response.ok) throw new Error('Failed to fetch tasks');
        return await response.json();
    } catch (error) {
        console.error('Error fetching tasks:', error.message);
        throw error;
    }
}

// Add a new task (with token, no Bearer)
export async function addTask(taskData) {
    try {
        const token = getToken(); // Get token from localStorage
        console.log('Token being sent:', token); // Verifique o token no console
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token // Send the token directly
            },
            body: JSON.stringify(taskData)
        });
        if (!response.ok) throw new Error('Failed to add task');
        return await response.json();
    } catch (error) {
        console.error('Error adding task:', error.message);
        throw error;
    }
}

export async function updateTaskStatus(taskId, newStatus) {
    try {
        const response = await fetch(`${API_URL}/${taskId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: newStatus }) // Only updating the status
        });
        if (!response.ok) throw new Error('Failed to update task');
        return await response.json();
    } catch (error) {
        console.error('Error updating task:', error.message);
        throw error;
    }
}

export async function deleteTask(taskId) {
    try {
        const response = await fetch(`${API_URL}/${taskId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `${getToken()}` // Requires authentication
            }
        });
        if (!response.ok) throw new Error('Failed to delete task');
    } catch (error) {
        console.error('Error deleting task:', error.message);
        throw error;
    }
}