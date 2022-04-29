
//Exemplo de loading com JS
//https://codepen.io/wang0nya/pen/bzwQPr
//https://treinamentoboti1.varejofacil.com/api/v1/compra/notas-fiscais?q=chaveDaNfe==35200606147451001538550010011042811125501670;situacao!=EXCLUIDA
//35200606147451001538550010011042811125501670

const url = 'https://viacep.com.br/ws/'
const btn = document.getElementById("btn-nfe")
const chavenfe = document.getElementById('chavenfe')
const loja = document.getElementById('loja')
const placa = document.getElementById('placa')

btn.addEventListener("click", function() {

    const cep = chavenfe.value

    fetch(url + `${cep}/json/`, {
        method: 'GET'
	}).then(function(response) {
        response.json().then(function(data) {
            console.log(data)
            teste.innerHTML = data.logradouro
        })
    })

})

function submitDataForm(chv, loja, placa) {

    const data = []
    const obj = {
        "chave": chv,
        "loja": loja,
        "placa": placa
    }

    data.push(obj)
    console.log(data)

}