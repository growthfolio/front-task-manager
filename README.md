
# To-Do List Front-End

Este é o projeto de interface de usuário (front-end) para o gerenciador de tarefas (To-Do List). A interface foi desenvolvida utilizando **HTML**, **CSS**, **JavaScript** e **Tailwind CSS** para fornecer uma experiência intuitiva e fluida na interação com a API do projeto de back-end.

## Funcionalidades

- Interface simples e intuitiva para gerenciamento de tarefas.
- Exibição de lista de tarefas, com opções para:
  - Adicionar uma nova tarefa.
  - Atualizar o status de uma tarefa (pendente ou completa).
  - Excluir uma tarefa.
- Formulário centralizado para criar novas tarefas com modal.
- Feedback visual para erros (por exemplo, falha no login ou ao adicionar tarefa).
- Navbar com links de navegação entre Login/Registro e Dashboard.
  
## Tecnologias Utilizadas

- HTML5
- CSS3 (Tailwind CSS)
- JavaScript (ES6)
- Interação com a API via Fetch API
- Controle de sessões com `localStorage` (token de autenticação)

## Pré-requisitos

Antes de começar, certifique-se de que a API do back-end esteja rodando conforme descrito no [README do back-end](https://github.com/felipemacedo1/node-task-manager).

## Como rodar o projeto localmente

### 1. Clone o repositório

```bash
git clone git@github.com:felipemacedo1/front-task-manager.git
cd front-task-manager
```

### 2. Configuração do ambiente

Não há necessidade de configurar variáveis de ambiente no front-end, mas certifique-se de que a URL da API no arquivo `api.js` aponte corretamente para o back-end.

```js
// Exemplo de configuração do endpoint
const API_URL = 'http://localhost:3000/tasks';
```

### 3. Abrir no navegador

Basta abrir o arquivo `index.html` diretamente no navegador, ou, se preferir, rodar um servidor local simples:

```bash
npx serve .
```

Depois disso, acesse o front-end no navegador em:

```
http://localhost:5000
```

## Estrutura do Projeto

A estrutura do projeto está organizada da seguinte forma:

```
front-task-manager/
│
├── css/                # Estilos CSS para a aplicação
│   ├── login.css       # Estilos específicos para a tela de login e registro
│   ├── dashboard.css   # Estilos específicos para o dashboard (lista de tarefas)
│   ├── styles.css      # Estilos gerais do tailwind
│
├── js/                 # Código JavaScript da aplicação
│   ├── api.js          # Interação com a API de tarefas (CRUD)
│   ├── auth.js         # Controle de login, registro e autenticação
│   ├── app.js          # Lógica principal de interação com a lista de tarefas
│   ├── dom.js          # Manipulação do DOM (renderização de tarefas, feedbacks visuais)
│   ├── index.js        # Lógica para login/registro
│
├── index.html          # Página de login e registro
├── dashboard.html      # Dashboard da aplicação (lista de tarefas)
└── README.md           # Este arquivo
```

## Funcionalidades Principais

### 1. Página de Login/Registro

A página de **login** e **registro** permite ao usuário:
- Fazer login com um usuário existente.
- Registrar um novo usuário.
- Receber mensagens de erro (ex.: falha no login ou registro).

### 2. Dashboard (Lista de Tarefas)

A página de **dashboard** exibe uma lista de tarefas, permitindo:
- Adicionar uma nova tarefa através de um formulário modal.
- Atualizar o status de uma tarefa (de "pendente" para "completa").
- Excluir uma tarefa da lista.

## Como funciona a autenticação

- Após o login bem-sucedido, o token de autenticação é salvo no `localStorage`.
- O token é enviado em cada requisição subsequente para criar, atualizar ou excluir tarefas.

## Melhorias Futuras (Front)

- Implementar paginação na lista de tarefas.
- Melhorar as animações de feedback visual (transições mais suaves).
- Adicionar testes para garantir a qualidade do código front-end.

## Licença

Este projeto é licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para mais detalhes.
