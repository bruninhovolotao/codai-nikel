const myModal = new bootstrap.Modal('#transaction-modal') // chama o modal
let logged = sessionStorage.getItem("logged"); 
const session = localStorage.getItem("session");
let data = {
    transactions: []
};

document.getElementById("button-logout").addEventListener('click', logout); // evento de logout

document.getElementById("transactions-button").addEventListener('click', function(){
    window.location.href = "transactions.html";
}); // evento de logout

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
    
    getCashIn();
    getCashOut();
    getTotal();
    getValorTotal();

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

    getCashIn(); // Chama a função de entradas.
    getCashOut(); // Chama a função de saídas.
    getTotal(); // Chama a função de Total.

}



function logout(){ // função para o evento de logout.
    sessionStorage.removeItem("logged");
    localStorage.removeItem("session");

    window.location.href = "index.html";
}

function saveData(data){
    localStorage.setItem(data.login, JSON.stringify(data));
}

function getCashIn(){
    const transactions = data.transactions;
    const cashIn =  transactions.filter((item) => item.type === "1");

    if(cashIn.length){
        let cashInHtml = ``;
        let limit = 0;
        
        if(cashIn.length > 5){
            limit = 5;
        }else{
            limit = cashIn.length;
        }
        for (let index = 0; index < limit; index++) {
            cashInHtml += `
            <div class="row mb-4">
                <div class="col-12">
                    <h3 class="fs-2">R$ ${cashIn[index].value.toFixed(2)}</h3>
                    <div class="container p-0">
                            <div class="row">
                                <div class="col-12 col-md-8">
                                    <p>${cashIn[index].description}</p>
                                </div>
                                <div class="col-12 col-md-3 d-flex justify-content-end">
                                    ${cashIn[index].date}
                                </div>
                            </div>
                    </div>
                </div>
            </div>
            
            `
        }

        document.getElementById("cash-in-list").innerHTML = cashInHtml;

    }

    
}

function getCashOut(){
    const transactions = data.transactions;
    const cashIn =  transactions.filter((item) => item.type === "2");

    if(cashIn.length){
        let cashInHtml = ``;
        let limit = 0;
        
        if(cashIn.length > 5){
            limit = 5;
        }else{
            limit = cashIn.length;
        }
        for (let index = 0; index < limit; index++) {
            cashInHtml += `
            <div class="row mb-4">
                <div class="col-12">
                    <h3 class="fs-2">R$ ${cashIn[index].value.toFixed(2)}</h3>
                    <div class="container p-0">
                            <div class="row">
                                <div class="col-12 col-md-8">
                                    <p>${cashIn[index].description}</p>
                                </div>
                                <div class="col-12 col-md-3 d-flex justify-content-end">
                                    ${cashIn[index].date}
                                </div>
                            </div>
                    </div>
                </div>
            </div>
            
            `
        }

        document.getElementById("cash-out-list").innerHTML = cashInHtml;

    }

    
}

function getTotal(){
    const transactions = data.transactions;
    let total = 0;

    transactions.forEach((item => {
        if(item.type === "1"){
            total += item.value;
        } else {
            total -= item.value;
        }
    }));

    document.getElementById("total").innerHTML = `R$ ${total.toFixed(2)}`;
}

function getValorTotal(){
    const transactions = data.transactions;
    let total = 0;

    transactions.forEach((item => {
        if(item.type === "1"){
            total += item.value;
        } else {
            total -= item.value;
        }
    }));

    if (total < 0) {
        alert("Atenção. Seu saldo após cadastrar essas despesa será negativo, deseja continuar?");
    };
}
