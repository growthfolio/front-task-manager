import { login, register } from './auth.js';

// DOM elements
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const showRegister = document.getElementById('show-register');
const showLogin = document.getElementById('show-login');

// Toggle between login and register forms
showRegister.addEventListener('click', (e) => {
    e.preventDefault();
    loginForm.classList.add('hidden');
    registerForm.classList.remove('hidden');
});

showLogin.addEventListener('click', (e) => {
    e.preventDefault();
    registerForm.classList.add('hidden');
    loginForm.classList.remove('hidden');
});

// Handle login form submission
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        await login(username, password); // Call login function from auth.js
        window.location.href = 'dashboard.html'; // Redirect to dashboard after login
    } catch (error) {
        alert('Login failed: ' + error.message);
    }
});

// Handle register form submission
registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('new-username').value;
    const password = document.getElementById('new-password').value;

    try {
        await register(username, password); // Call register function from auth.js
        window.location.href = 'dashboard.html'; // Redirect to dashboard after registration
    } catch (error) {
        alert('Registration failed: ' + error.message);
    }
});
