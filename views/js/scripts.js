const url = "http://127.0.0.1:3000"
const idLoja = document.getElementById("loja")
const nomeLoja = document.getElementById("lojaNome")
const chaveNFe = document.getElementById("chaveNFe")
const addNFe = document.getElementById("addNFe")
const spinner = document.getElementById("spinner")
const validate = document.getElementById("validate")
const placa = document.getElementById("placa")
const btngravar = document.getElementById("btn-gravar")
const modalChave = new bootstrap.Modal(document.getElementById("chaveNFeModal"), {
    keyboard: true
})

var registrosPortaria = {}
registrosPortaria.chave_nfe = []
var registrosNFe = []

idLoja.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        spinner.removeAttribute('hidden');
        fetch(`${url}/lojas?id=${idLoja.value}`, {
            method: 'GET'
        }).then(function(response) {
            response.json().then(function(data) {

                if (data.length < 1) {
                    alert("Nenhuma loja encontrada com esse número!")
                    idLoja.value = ""
                    idLoja.focus()
                    return 0
                }

                nomeLoja.value = data[0].nome

                registrosPortaria.id_loja = data[0].id

                console.log(registrosPortaria)
                placa.focus()
                

            })
        }).then(data => {
            spinner.setAttribute('hidden', '');
        })
    }
})

idLoja.addEventListener("focusout", () => {
    if (!idLoja.value) {
        return 0
    }

    spinner.removeAttribute('hidden');
    fetch(`${url}/lojas?id=${idLoja.value}`, {
        method: 'GET'
    }).then(function(response) {
        response.json().then(function(data) {

            if (data.length < 1) {
                alert("Nenhuma loja encontrada com esse número!")
                idLoja.value = ""
                idLoja.focus()
                return 0
            }

            nomeLoja.value = data[0].nome

            registrosPortaria.id_loja = data[0].id

            console.log(registrosPortaria)
            placa.focus()
            

        })
    }).then(data => {
        spinner.setAttribute('hidden', '');
    })

})


placa.addEventListener("keypress", (e) => {
    if (e.key == "Enter") {
        registrosPortaria.placa = placa.value
        console.log(registrosPortaria)
        modalChave.show()
        chaveNFe.focus()
    }
})

placa.addEventListener("focusout", () => {
    registrosPortaria.placa = placa.value
    console.log(registrosPortaria)
})

chaveNFe.addEventListener('keypress', (e) => {    
    if (e.key === "Enter") {                
        e.preventDefault()
        setRegistros(chaveNFe.value)
    }
})

function setRegistros(chave) {
    if(!validarChave(chave)){
        validate.innerHTML = "A chave deve conter 44 números!"
        return 0
    }

    spinner.removeAttribute('hidden');
    fetch(`${url}/consultanfe?chave=${chave}`, {
        method: 'GET'    
    }).then(function(response) {

        response.json().then(function(data) {   
            if (data.length == 0) {
                alert('Nenhuma nota encontrada!')
                return 0
            }

            registrosNFe.push(
                {
                    "chave": chave,
                    "serie": data[0].serie,
                    "numeroNota": parseInt(chave.substring(25, 34)),
                    "cnpjFornecedor": chave.substring(6, 20)
                }
            )
            
            registrosPortaria.chave_nfe.push(chaveNFe.value)
            console.log(registrosPortaria)
            updateRegistros(registrosNFe)
            chaveNFe.value = ""
        })
    }).then(data => {
        spinner.setAttribute('hidden', '');
        validate.innerHTML = ""
    })    
}

function updateRegistros(registro) {

    var row = tableRegistros.insertRow(registro.length)

    var cell1 = row.insertCell(0)
    cell1.innerHTML = registro.length
    var cell2 = row.insertCell(1)
    cell2.innerHTML = registro[registro.length - 1].numeroNota
    var cell3 = row.insertCell(2)
    cell3.innerHTML = registro[registro.length - 1].chave

}

addNFe.addEventListener('click', () => {

    setRegistros(chaveNFe.value)
    chaveNFe.focus()
    
})

addRegistros.addEventListener('click', () => {
    if(idLoja.value == "") {
        alert("Informe a loja antes!")
        idLoja.focus()
        return 0
    }
    modalChave.show()
    chaveNFe.focus()
    
})


function validarChave(chave) {

    if(chave.length != 44) {
        return false
    } else {
        return true
    }
}

btngravar.addEventListener("click", () => {
    
    fetch(`${url}/portaria`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(registrosPortaria)
    })
    .then((response) =>{
        response.json().then((data) => {
            alert("Portaria cadastrado com código: " + data.id)
            location.reload()
        })
    })
    
})