### 📌 TaskFlow Frontend

Interface web do sistema TaskFlow, uma aplicação de gerenciamento de tarefas.
Construído com React, este frontend consome uma API REST desenvolvida em Django + Django REST Framework, utilizando autenticação via JWT.

### 🚀 Funcionalidades
  🔐 Login e autenticação com JWT
  👤 Controle de usuário autenticado
  📋 Listagem de tarefas
  ➕ Criação de tarefas
  ✏️ Edição de tarefas
  ❌ Remoção de tarefas
  📊 Organização de tarefas por status
  🌐 Consumo de API REST

---

### 🧱 Tecnologias

React
JavaScript (ou TypeScript se usar)
Axios
React Router DOM
Context API (ou Redux, se usar)
JWT Authentication

---

### ⚙️ Instalação e execução
```bash
# clonar o repositório
git clone git@github.com:Monaliza-Vasconcelos/taskflow-web.git

# entrar na pasta
cd taskflow-frontend

# instalar dependências
npm install

# rodar o projeto
npm run dev
```

---

### 🔌 Configuração da API
Crie um arquivo .env na raiz do projeto:
```bash
VITE_API_URL=http://localhost:8000
```
Ou no deploy:
```bash
VITE_API_URL=https://seu-backend.up.railway.app
```

---

### 🔐 Autenticação
O sistema utiliza JWT:
/api/token/ → login
access token → requisições
refresh token → renovação automática

---

### 🌍 Backend

Este frontend consome a API:

👉 TaskFlow API (Django REST Framework)

### 📌 Objetivo

Criar um sistema completo de produtividade com autenticação, gerenciamento de tarefas e interface moderna.

---

### 🧠 Autor

Desenvolvido por Monaliza Vasconcelos
