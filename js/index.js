const myModal = new bootstrap.Modal('#register-modal') // chama o modal
let logged = sessionStorage.getItem("logged"); 
const session = localStorage.getItem("session");

checkLogged();

// LOGAR NO SISTEMA

document.getElementById("login-form").addEventListener("submit", function(e){ // pega o id do formulário e cria um evento a partir do click no botão.

    e.preventDefault(); // não deixa a página redirecionar
    const email = document.getElementById("email-input").value; // recebe o e-mail
    const password = document.getElementById("password-input").value; // recebe a senha
    const checkSession = document.getElementById("session-check").checked; // checa se o check foi marcado.

    const account = getAccount(email);

    if(!account){ // Quando não tem conta cadastrada
        alert("Ops! Verifique os dados e tente novamente.");
        return;
    }

    if(account){
        if(account.password !== password){  // verifica se a senha está errada.
            alert("Ops! Verifique os dados e tente novamente.");
            return;
        }

        saveSession(email, checkSession);

        window.location.href = "home.html"; // em caso de sucesso, usuário é redirecionado para essa página.
    }

    
 
})

// CRIAR CONTA

document.getElementById("create-form").addEventListener("submit", function(e){ // pega o id do formulário e cria um evento a partir do click no botão.

    e.preventDefault(); // não deixa a página redirecionar
    const email = document.getElementById("email-create-input").value; // recebe o e-mail
    const password = document.getElementById("password-create-input").value; // recebe a senha
    const confirmPassword = document.getElementById("password-confirm-input").value;
    
    if(email.lenght < 5){ // se e-mail foi menor que 5 mostra o alerta.
        alert("Preencha o campo com um e-mail válido");
        return;
    }

    if(password.leght < 5){ // se senha for menor que 5 mostra o alerta
        alert("Preencha a senha com no mínimo 5 dígitos.");
        return;
    }

    if (password !== confirmPassword) {
        alert('As senhas não coincidem. Por favor, digite novamente.');
        return;
      }

    saveAccount({ // salva os dados.
        login: email,
        password: password,
        transactions: []
    });

    myModal.hide(); // fecha o modal

    alert("Conta criada com sucesso!"); // mostra o alerta ao criar a conta

}); 

// PERMANECER LOGADO

function checkLogged(){
    if(session){
        sessionStorage.setItem("Logged", session); // Checa se estiver alguem estiver logado.
        logged = session;
    }

    if(logged){
        saveSession(logged, session);
        window.location.href = "home.html"; // Se estiver alguem salvo e será redirecionado para a home.
    }

}

function saveAccount(data){
    localStorage.setItem(data.login, JSON.stringify(data)); // Armazena os dados e converte em string.
}

function saveSession(data, saveSession){ // 
    if(saveSession){
        localStorage.setItem("session", data); // Permanece logado no local
    }
    sessionStorage.setItem("logged", data); // Desloga quando termina a sessão.
}

function getAccount(key){ 
    const account = localStorage.getItem(key); // Armazena os dados de login

    if(account){
        return JSON.parse(account); // converte em objeto
    }

    return ""; // caso não ache, retorna para uma conta vazia.
}