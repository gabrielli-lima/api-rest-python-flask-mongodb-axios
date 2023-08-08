const url = 'http://localhost:8080/users'

const nomeUser = document.getElementById('nomeUser')
const idadeUser = document.getElementById('idadeUser')
const emailUser = document.getElementById('emailUser')
    

var idUser
function getUsers() {
    axios.get(url)
        .then(response => {
            let users = response.data
            const userList = document.getElementById('user-list')
            users = JSON.parse(users)
            console.log(users)

            users.forEach(user => {
                const row = document.createElement('tr')
                console.log(user._id)

                row.innerHTML = `
                            <td>${user.nome}</td>
                            <td>${user.idade}</td>
                            <td>${user.email}</td>
                            <td class="text-center">
                                
                                <a onclick="infoUsuario('${user._id["$oid"]}', '${user.nome}', '${user.idade}', '${user.email}')"><i class="fas fa-edit text-warning"></i></a>
                                &nbsp;
                                <a onclick="deletarUser('${user._id["$oid"]}', '${user.nome}')"><i class="fas fa-trash text-danger"></i></a>
                            </td>
                        `
                userList.appendChild(row)
            })
        })
        .catch(error => {
            console.error('Erro ao obter os usuários:', error)
        })
}

function deletarUser(id, nome) {
    if (confirm(`Você quer remover ${nome}?`)) {
        axios.delete(`${url}/${id}`)
            .then(response => console.log(response))
            .catch(error => console.error(error))
        getUsers()
    }

}


function addNovoUsuario(novoUsuario) {
    console.log(novoUsuario)
    axios.post(url, novoUsuario)
        .then(response => {
            console.log(response)
            getUsers()
        })
        .catch(error => console.log(error))
}

const addUserForm = document.getElementById('addUserForm')

addUserForm.addEventListener('submit', function (event) {
    event.preventDefault() // não permite o comportamento padrão do formulário com o botão de submit de recarregar a página

    const novoUsuario = {
        nome: nomeUser.value,
        idade: parseInt(idadeUser.value),
        email: emailUser.value
    }

    addNovoUsuario(novoUsuario)

    nomeUser.value = ''
    idadeUser.value = ''
    emailUser.value = ''
})

document.addEventListener('DOMContentLoaded', getUsers)

function infoUsuario(id, nome, idade, email) {
    nomeUser.value = nome
    idadeUser.value = idade
    emailUser.value = email

    idUser = id
}

function atualizarUsuario() {
    console.log(idUser + "wwwww")
    
const usuarioAtualiazado = {
    
    nome: nomeUser.value,
    idade: parseInt(idadeUser.value),
    email: emailUser.value
}
    axios.put(`${url}/${idUser}`, usuarioAtualiazado)
    .then(response => console.log(response))
    .catch(error => console.log(error))
}
