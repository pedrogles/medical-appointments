export const enviroments = {
    baseUrl: "http://localhost:3000",
    firebaseConfig: {
        apiKey: "SUA_API_KEY",
        authDomain: "seu-projeto.firebaseapp.com",
        projectId: "seu-projeto",
        storageBucket: "seu-projeto.appspot.com",
        messagingSenderId: "123456789",
        appId: "1:123456789:web:abcdefghijk",
        measurementId: "G-XXXXXXX"
    }
}

// Passo a passo para gerar as configurações de autenticação firebase.
// 1. Crie uma conta no Firebase:
//    Acesse o Firebase (https://firebase.google.com/?hl=pt) e faça login ou crie uma conta.

// 2. Crie um projeto de Autenticação:
//    - Após fazer login, clique em "Ir para o Console" no canto superior direito.
//    - Clique em "Adicionar Projeto" e siga as instruções para configurar seu projeto.
//    - Certifique-se de habilitar a opção "Google Analytics" se necessário, ou escolha "Sem Google Analytics".
//    - Clique em "Criar Projeto" e aguarde o Firebase configurar seu projeto.

// 3. Gere as configurações do projeto:
//    - Após o projeto ser criado, no painel do Firebase, clique em "Configurações do Projeto" (ícone de engrenagem ao lado do nome do projeto).
//    - Selecione "Configurações do Firebase" e depois a opção "Adicionar Firebase ao seu aplicativo".

// 4. Insira as configurações do Firebase no código:
//    - Dentro das configurações do Firebase, você verá um objeto JSON contendo a configuração do seu projeto. Ele será parecido com isso: