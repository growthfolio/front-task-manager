# 📋 Front Task Manager - Interface HTML/CSS/JS

## 🎯 Objetivo de Aprendizado
Projeto desenvolvido para estudar **JavaScript vanilla** e **manipulação do DOM**, criando uma interface completa de gerenciamento de tarefas com HTML, CSS, JavaScript puro e integração com API REST.

## 🛠️ Tecnologias Utilizadas
- **Markup:** HTML5 semântico
- **Styling:** CSS3 + Tailwind CSS
- **Interatividade:** JavaScript ES6+
- **HTTP Client:** Fetch API
- **Autenticação:** localStorage para tokens
- **Design:** Responsive design mobile-first
- **Conceitos estudados:**
  - DOM manipulation
  - Event handling
  - Fetch API e promises
  - Local storage
  - Modal components
  - Form validation
  - Responsive design

## 🚀 Demonstração
```javascript
// API service para tarefas
class TaskAPI {
  constructor(baseURL) {
    this.baseURL = baseURL;
    this.token = localStorage.getItem('token');
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`,
        ...options.headers
      },
      ...options
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  async getTasks() {
    return this.request('/tasks');
  }

  async createTask(taskData) {
    return this.request('/tasks', {
      method: 'POST',
      body: JSON.stringify(taskData)
    });
  }

  async updateTask(taskId, updates) {
    return this.request(`/tasks/${taskId}`, {
      method: 'PUT',
      body: JSON.stringify(updates)
    });
  }

  async deleteTask(taskId) {
    return this.request(`/tasks/${taskId}`, {
      method: 'DELETE'
    });
  }
}
```

## 💡 Principais Aprendizados

### 🌐 JavaScript Vanilla
- **DOM Manipulation:** querySelector, createElement, appendChild
- **Event Handling:** addEventListener, event delegation
- **Async/Await:** Promises e programação assíncrona
- **ES6+ Features:** Arrow functions, destructuring, template literals

### 🎨 Interface e UX
- **Tailwind CSS:** Utility-first styling
- **Modal Components:** Criação de modais sem frameworks
- **Form Validation:** Validação client-side
- **Responsive Design:** Media queries e flexbox

### 🔗 Integração com API
- **Fetch API:** Requisições HTTP modernas
- **Authentication:** JWT tokens no localStorage
- **Error Handling:** Tratamento de erros de rede
- **Loading States:** Feedback visual durante requisições

## 🧠 Conceitos Técnicos Estudados

### 1. **DOM Manipulation**
```javascript
class TaskRenderer {
  constructor(container) {
    this.container = document.querySelector(container);
  }

  renderTasks(tasks) {
    this.container.innerHTML = '';
    
    if (tasks.length === 0) {
      this.renderEmptyState();
      return;
    }

    tasks.forEach(task => {
      const taskElement = this.createTaskElement(task);
      this.container.appendChild(taskElement);
    });
  }

  createTaskElement(task) {
    const taskDiv = document.createElement('div');
    taskDiv.className = `task-card p-4 bg-white rounded-lg shadow-md border-l-4 ${
      task.status === 'completed' ? 'border-green-500 bg-green-50' : 'border-blue-500'
    }`;
    taskDiv.dataset.taskId = task.id;

    taskDiv.innerHTML = `
      <div class="flex justify-between items-start">
        <div class="flex-1">
          <h3 class="font-semibold text-gray-800 ${
            task.status === 'completed' ? 'line-through text-gray-500' : ''
          }">${task.title}</h3>
          <p class="text-gray-600 mt-1">${task.description || 'Sem descrição'}</p>
          <span class="inline-block mt-2 px-2 py-1 text-xs rounded-full ${
            task.status === 'completed' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-yellow-100 text-yellow-800'
          }">
            ${task.status === 'completed' ? 'Concluída' : 'Pendente'}
          </span>
        </div>
        <div class="flex gap-2 ml-4">
          <button class="toggle-btn text-blue-500 hover:text-blue-700" data-task-id="${task.id}">
            ${task.status === 'completed' ? 'Reabrir' : 'Concluir'}
          </button>
          <button class="edit-btn text-green-500 hover:text-green-700" data-task-id="${task.id}">
            Editar
          </button>
          <button class="delete-btn text-red-500 hover:text-red-700" data-task-id="${task.id}">
            Excluir
          </button>
        </div>
      </div>
    `;

    return taskDiv;
  }

  renderEmptyState() {
    this.container.innerHTML = `
      <div class="text-center py-12">
        <div class="text-gray-400 text-6xl mb-4">📝</div>
        <h3 class="text-xl font-semibold text-gray-600 mb-2">Nenhuma tarefa encontrada</h3>
        <p class="text-gray-500">Comece criando sua primeira tarefa!</p>
      </div>
    `;
  }
}
```

### 2. **Modal Component**
```javascript
class Modal {
  constructor(modalId) {
    this.modal = document.getElementById(modalId);
    this.overlay = this.modal.querySelector('.modal-overlay');
    this.closeBtn = this.modal.querySelector('.close-modal');
    
    this.bindEvents();
  }

  bindEvents() {
    // Fechar modal clicando no overlay
    this.overlay.addEventListener('click', (e) => {
      if (e.target === this.overlay) {
        this.close();
      }
    });

    // Fechar modal com botão X
    this.closeBtn?.addEventListener('click', () => {
      this.close();
    });

    // Fechar modal com ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen()) {
        this.close();
      }
    });
  }

  open() {
    this.modal.classList.remove('hidden');
    this.modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
    
    // Foco no primeiro input
    const firstInput = this.modal.querySelector('input, textarea');
    if (firstInput) {
      setTimeout(() => firstInput.focus(), 100);
    }
  }

  close() {
    this.modal.classList.add('hidden');
    this.modal.classList.remove('flex');
    document.body.style.overflow = '';
  }

  isOpen() {
    return !this.modal.classList.contains('hidden');
  }
}
```

### 3. **Form Validation**
```javascript
class FormValidator {
  constructor(form) {
    this.form = form;
    this.errors = {};
  }

  validate(rules) {
    this.errors = {};
    
    Object.keys(rules).forEach(fieldName => {
      const field = this.form.querySelector(`[name="${fieldName}"]`);
      const value = field?.value?.trim() || '';
      const fieldRules = rules[fieldName];

      fieldRules.forEach(rule => {
        if (rule.required && !value) {
          this.addError(fieldName, rule.message || `${fieldName} é obrigatório`);
        }
        
        if (rule.minLength && value.length < rule.minLength) {
          this.addError(fieldName, rule.message || `${fieldName} deve ter pelo menos ${rule.minLength} caracteres`);
        }
        
        if (rule.maxLength && value.length > rule.maxLength) {
          this.addError(fieldName, rule.message || `${fieldName} deve ter no máximo ${rule.maxLength} caracteres`);
        }
        
        if (rule.pattern && !rule.pattern.test(value)) {
          this.addError(fieldName, rule.message || `${fieldName} tem formato inválido`);
        }
      });
    });

    this.displayErrors();
    return Object.keys(this.errors).length === 0;
  }

  addError(field, message) {
    if (!this.errors[field]) {
      this.errors[field] = [];
    }
    this.errors[field].push(message);
  }

  displayErrors() {
    // Limpar erros anteriores
    this.form.querySelectorAll('.error-message').forEach(el => el.remove());
    this.form.querySelectorAll('.border-red-500').forEach(el => {
      el.classList.remove('border-red-500');
    });

    // Mostrar novos erros
    Object.keys(this.errors).forEach(fieldName => {
      const field = this.form.querySelector(`[name="${fieldName}"]`);
      if (field) {
        field.classList.add('border-red-500');
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message text-red-500 text-sm mt-1';
        errorDiv.textContent = this.errors[fieldName][0];
        
        field.parentNode.appendChild(errorDiv);
      }
    });
  }
}
```

## 📁 Estrutura do Projeto
```
front-task-manager/
├── index.html              # Página de login/registro
├── dashboard.html          # Dashboard de tarefas
├── css/
│   ├── styles.css         # Estilos gerais com Tailwind
│   ├── login.css          # Estilos específicos do login
│   └── dashboard.css      # Estilos específicos do dashboard
├── js/
│   ├── api.js             # Serviços de API
│   ├── auth.js            # Autenticação e autorização
│   ├── app.js             # Lógica principal das tarefas
│   ├── dom.js             # Manipulação do DOM
│   └── index.js           # Lógica de login/registro
└── img/                   # Imagens e ícones
```

## 🔧 Como Executar

### Método Simples
```bash
# Clone o repositório
git clone <repo-url>
cd front-task-manager

# Abra index.html no navegador
open index.html
```

### Servidor Local
```bash
# Com Python
python -m http.server 8000

# Com Node.js
npx serve .

# Com PHP
php -S localhost:8000

# Acesse: http://localhost:8000
```

### Configuração da API
```javascript
// Em js/api.js
const API_URL = 'http://localhost:3000'; // URL do backend

// Certifique-se de que o backend está rodando
```

## 🎯 Funcionalidades Implementadas
- ✅ **Login/Registro** com validação
- ✅ **CRUD de tarefas** completo
- ✅ **Modal para criar/editar** tarefas
- ✅ **Toggle de status** (pendente/concluída)
- ✅ **Feedback visual** para ações
- ✅ **Responsive design** mobile-first
- ✅ **Error handling** com mensagens
- ✅ **Loading states** durante requisições

## 🚧 Desafios Enfrentados
1. **DOM Manipulation:** Gerenciar estado sem frameworks
2. **Event Delegation:** Eventos em elementos dinâmicos
3. **Async Operations:** Coordenar múltiplas requisições
4. **Form Validation:** Validação robusta client-side
5. **Modal Management:** Criar componentes reutilizáveis
6. **Responsive Design:** Layout adaptável sem CSS frameworks

## 📚 Recursos Utilizados
- [MDN Web Docs](https://developer.mozilla.org/) - Referência JavaScript
- [Fetch API Guide](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [Tailwind CSS](https://tailwindcss.com/docs) - Utility classes
- [ES6 Features](https://es6-features.org/) - JavaScript moderno
- [DOM Manipulation](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model)

## 📈 Próximos Passos
- [ ] Implementar drag & drop para reordenar tarefas
- [ ] Adicionar filtros e busca
- [ ] Criar sistema de categorias
- [ ] Implementar modo offline com Service Workers
- [ ] Adicionar animações CSS
- [ ] Melhorar acessibilidade (ARIA)

## 🔗 Projetos Relacionados
- [Node Task Manager](../node-task-manager/) - Backend da aplicação
- [React Task Manager](../react-taskmanager-app/) - Versão React
- [Nest Task Manager](../nest-taskmanager-app/) - Backend alternativo

---

**Desenvolvido por:** Felipe Macedo  
**Contato:** contato.dev.macedo@gmail.com  
**GitHub:** [FelipeMacedo](https://github.com/felipemacedo1)  
**LinkedIn:** [felipemacedo1](https://linkedin.com/in/felipemacedo1)

> 💡 **Reflexão:** Este projeto reforçou a importância de dominar JavaScript vanilla. Criar uma aplicação completa sem frameworks consolidou conhecimentos fundamentais de DOM, eventos e programação assíncrona.