import { login, register } from './auth.js';

// DOM elements
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const showRegister = document.getElementById('show-register');
const showLogin = document.getElementById('show-login');
const messageBox = document.getElementById('message'); // Nova div de mensagem
const messageContent = document.getElementById('message-content'); // Conteúdo da mensagem

// Função para exibir mensagens
function showMessage(msg, type = 'success') {
  messageContent.textContent = msg;
  messageBox.classList.remove('hidden');

  // Aplicar estilos dinamicamente com base no tipo de mensagem
  if (type === 'error') {
    messageBox.classList.remove(
      'bg-green-100',
      'text-green-800',
      'border-green-400'
    );
    messageBox.classList.add('bg-red-100', 'text-red-800', 'border-red-400');
  } else {
    messageBox.classList.remove('bg-red-100', 'text-red-800', 'border-red-400');
    messageBox.classList.add(
      'bg-green-100',
      'text-green-800',
      'border-green-400'
    );
  }

  // Esconder o alerta após 5 segundos
  setTimeout(() => {
    messageBox.classList.add('hidden');
  }, 5000); // 5 segundos
}

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
    showMessage('Login failed: ' + error.message, 'error');
  }
});

// Handle register form submission
registerForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('new-username').value;
  const password = document.getElementById('new-password').value;

  try {
    await register(username, password); // Chama a função register
    showMessage(
      'Cadastro feito com sucesso! Por favor, faça o login.',
      'success'
    );
    registerForm.classList.add('hidden');
    loginForm.classList.remove('hidden');
  } catch (error) {
    showMessage('Registration failed: ' + error.message, 'error');
  }
});
