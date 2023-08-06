const url = 'http://localhost:8080/users';

function getUsers() {
    axios.get(url)
        .then(response => {
            let users = response.data;
            const userList = document.getElementById('user-list');
            users = JSON.parse(users)
            console.log(users);

            users.forEach(user => {
                const row = document.createElement('tr');
                console.log(user._id)

                row.innerHTML = `
                            <td>${user.nome}</td>
                            <td>${user.idade}</td>
                            <td>${user.email}</td>
                            <td class="text-center">
                                
                                <a><i class="fas fa-edit text-warning"></i></a>
                                &nbsp;
                                <a onclick="deleteUser('${user._id["$oid"]}', '${user.nome}')"><i class="fas fa-trash text-danger"></i></a>
                            </td>
                        `;
                userList.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Erro ao obter os usuários:', error);
        });
}

function deleteUser(id, nome) {
    if (confirm(`Você quer remover ${nome}?`)) {
        axios.delete(`${url}/${id}`)
            .then(response => console.log(response))
            .catch(error => console.error(error))
        getUsers()
    }

}

const novoUsuario = {
    nome: document.getElementById('nomeUser').value,
    idade: document.getElementById('idadeUser').value,
    email: document.getElementById('emailUser').value
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

const addUserForm = document.getElementById('addUserForm');

addUserForm.addEventListener('submit', function () {
    // event.preventDefault(); // não permite o comportamento padrão do formulário com o botão de submit de recarregar a página

    const nome = document.getElementById('nomeUser').value;
    const idade = parseInt(document.getElementById('idadeUser').value);
    const email = document.getElementById('emailUser').value;

    const novoUsuario = {
        nome: nome,
        idade: idade,
        email: email
    };

    addNovoUsuario(novoUsuario);
    nomeUser.value = '';
    idadeUser.value = '';
    emailUser.value = '';
});

document.addEventListener('DOMContentLoaded', getUsers);

// function updateUser(id, userUpdated){
//     axios.put(`${url}/${id}`, userUpdated)
//     .then(response => console.log(response))
//     .catch(error => console.log(error))
// }
