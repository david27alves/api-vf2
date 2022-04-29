const url = "http://127.0.0.1:3000"
const conferencias = document.getElementById("lista-conferencias")
const btnteste = document.getElementById("btnteste")

let x = null

document.addEventListener('DOMContentLoaded', async() => {
    fetch(`${url}/portaria`)
    .then((response) => {
        response.json().then((data) => {
            listaPortarias(data)
        })
    })
})

function listaPortarias(data) {
    if (data.length) {
        for (d of data) {
            conferencias.innerHTML += '<a href="#" class="list-group-item list-group-item-action" aria-current="true"><div class="d-flex w-100 justify-content-between"><h6 class="mb-1">Portaria: '+ d.id +'</h6><small><span class="badge rounded-pill bg-success">'+ d.updatedAt +'</span></small></div><p class="mb-1">Loja '+ d.id_loja +'</p><small>Placa: '+ d.placa +'</small></a>'
        }
    }else {
        conferencias.innerHTML += '<li class="list-group-item">Nada Encontrado</h6></div></>'
    }
}
