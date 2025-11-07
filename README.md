## 🔐 Login e Cadastro - Angular + Firebase + Angular Material

Aplicação de autenticação desenvolvida com Angular, utilizando Firebase Authentication para gerenciamento de usuários.
A interface foi construída com Angular Material e SCSS, e os formulários utilizam o FormBuilder para criação reativa e validação.

## 🚀 Tecnologias Utilizadas

- Angular v18
- Firebase Authentication
- Angular Material
- SCSS (Sass)
- Reactive Forms / FormBuilder
- TypeScript

## ⚙️ Funcionalidades

- Cadastro e login com e-mail e senha
- Validação reativa de formulários com FormBuilder
- Feedback visual utilizando Angular Material
- Redirecionamento após autenticação
- Mensagens de erro e sucesso
- Interface responsiva e moderna

## 🧩 Estrutura do Projeto

```
src/
 ├── app/
 │   ├── core/               # Serviços globais, guards e interceptors
 │   ├── features/           # Funcionalidades (ex: Auth)
 │   │   ├── auth/
 │   │   │   ├── pages/
 │   │   │   │   ├── login/
 │   │   │   │   └── register/
 │   │   │   ├── services/
 │   │   │   └── auth.routes.ts
 │   ├── layout/             # Componentes de layout (header, footer, etc)
 │   ├── shared/             # Componentes, diretivas e pipes reutilizáveis
 │   └── app.component.ts
 ├── assets/
 └── styles/                 # Estilos globais (SCSS)
 ```

## 🔧 Como Executar

1. Clonar o repositório

```bash
git clone https://github.com/pedrogles/medical-appointments.git
```


2. Instalar dependências

```bash
npm install
```


3. Configurar Firebase

- Crie um projeto no Firebase Console
- Ative Authentication → E-mail/Senha
- Adicione as credenciais em src/environments/environment.ts:

```
export const environment = {
  firebase: {
    apiKey: 'SUA_API_KEY',
    authDomain: 'SEU_DOMINIO.firebaseapp.com',
    projectId: 'SEU_PROJECT_ID',
    storageBucket: 'SEU_BUCKET.appspot.com',
    messagingSenderId: 'SEU_ID',
    appId: 'SEU_APP_ID'
  },
};
```

4. Executar a aplicação

```bash
ng serve
```


Acesse: http://localhost:4200

## 🧠 Principais Recursos do Angular Utilizados

- Reactive Forms com FormBuilder
- Angular Material para UI e UX
- SCSS modularizado
- Arquitetura escalável: core, features, shared, layout