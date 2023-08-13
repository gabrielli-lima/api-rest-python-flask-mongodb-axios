const url = 'http://localhost:8080/users'

const formNovoUsuario = document.getElementById('formNovoUsuario')
const unome = document.getElementById('unome')
const uidade = document.getElementById('uidade')
const uemail = document.getElementById('uemail')
const modalNovoUsuario = document.getElementById('modalNovoUsuario')
const modalDeletarUsuario = document.getElementById('modalDeletarUsuario')
const txtDeletarUsuario = document.getElementById('txtDeletarUsuario')
const confirmarExclusao = document.getElementById('confirmarExclusao')

var idUsuario

function getUsuarios() {
    axios.get(url)
        .then(response => {
            let users = response.data
            const listaUsuario = document.getElementById('lista-usuario')
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
                                <a data-bs-toggle="modal" data-bs-target="#modalDeletarUsuario" 
                                    onclick="deletarUsuario('${user._id["$oid"]}', '${user.nome}')"><i class="fas fa-trash text-danger"></i></a>
                            </td>
                        `
                listaUsuario.appendChild(row)
            })
        })
        .catch(error => {
            console.error('Erro ao obter os usuários:', error)
        })
}

function cadastrarNovoUsuario() {
    const novoUsuario = {
        nome: unome.value,
        idade: parseInt(uidade.value),
        email: uemail.value
    }

    unome.value = ''
    uidade.value = ''
    uemail.value = ''

    axios.post(url, novoUsuario)
        .then(response => {
            console.log(response)
            console.log("Usuario cadastrado")
            getUsuarios()
        })
        .catch(error => console.log(error))
}

function deletarUsuario(id, nome) {
    txtDeletarUsuario.innerText = `Você quer remover ${nome}?`
    confirmarExclusao.addEventListener('click', function () {
        axios.delete(`${url}/${id}`)
        .then(response => {
            console.log(response)
            console.log("Usuario removido")
            getUsuarios()
        })
        .catch(error => console.error(error))
    }
)}

document.addEventListener('DOMContentLoaded', getUsuarios)

function infoUsuario(id, nome, idade, email) {
    unome.value = nome
    uidade.value = idade
    uemail.value = email

    idUsuario = id
}

function atualizarUsuario() {

    const usuarioAtualiazado = {

        nome: unome.value,
        idade: parseInt(uidade.value),
        email: uemail.value
    }
    axios.put(`${url}/${idUsuario}`, usuarioAtualiazado)
        .then(response => console.log(response))
        .catch(error => console.log(error))
}