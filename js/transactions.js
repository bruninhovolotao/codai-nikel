const myModal = new bootstrap.Modal('#transaction-modal') // chama o modal
let logged = sessionStorage.getItem("logged"); 
const session = localStorage.getItem("session");
let data = {
    transactions: []
};

document.getElementById("button-logout").addEventListener('click', logout); // evento de logout

function logout(){ // função para o evento de logout.
    sessionStorage.removeItem("logged");
    localStorage.removeItem("session");

    window.location.href = "index.html";
}

// ADICIONAR LANÇAMENTO
document.getElementById("transaction-form").addEventListener("submit", function(e){
    e.preventDefault();

    const value = parseFloat(document.getElementById("value-input").value); // recebe o valor convertido em número.
    const description = document.getElementById("description-input").value; // recebe a descrição.
    const date = document.getElementById("date-input").value; // recebe a data;
    const type = document.querySelector('input[name=type-input]:checked').value; // pega o ckeck box marcado.

    data.transactions.unshift({
        value: value, type: type, description: description, date: date
    });

    saveData(data);
    e.target.reset();
    myModal.hide(); // fecha o modal

    getTransactions();

    alert("Lançamento adicionado.");

});

checkLogged();

function checkLogged(){
    if(session){
        sessionStorage.setItem("logged", session); // Checa se estiver alguem estiver logado.
        logged = session;
    }

    if(!logged){
        window.location.href = "index.html"; // Se não estiver alguem logado e será redirecionado para a index.
        return;
    }

    const dataUser = localStorage.getItem(logged);
    if(dataUser){
        data = JSON.parse(dataUser);
    }

    getTransactions();

};

    

function saveData(data){
    localStorage.setItem(data.login, JSON.stringify(data));
};

function getTransactions(){
    const transactions = data.transactions;
    let transactionsHtml = ``;

    if(transactions.length){
        transactions.forEach((item) => {
            let type = "Entrada";
            
            if(item.type === "2"){
                type = "Saída";
            }

            transactionsHtml += `
            <tr>
                <th scope="row">${item.date}</th>
                    <td>${item.value.toFixed(2)}</td>
                    <td>${type}</td>
                    <td>${item.description}</td>
            </tr>
            `;
        })
    }

    document.getElementById("transactions-list").innerHTML = transactionsHtml;
};

