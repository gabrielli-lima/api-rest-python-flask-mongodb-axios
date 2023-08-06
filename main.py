from flask import Flask, request, jsonify, render_template
from database import Usuario
import json
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/users', methods=['GET'])
def listarUsuarios():
    usuarios = Usuario.objects.all()
    return json.dumps(usuarios.to_json()), 200

@app.route('/users/<id>', methods=['GET'])
def consultarUsuario(id):
    try:
        usuario = Usuario.objects.get(id=id)
        return json.dumps(usuario.to_json()), 200
    except Usuario.DoesNotExist:
        return "Usuário não encontrado", 404

@app.route('/users/idade/<idade>', methods=['GET'])
def filtrarIdade(idade):
    usuarios = Usuario.objects.filter(idade=idade)
    return json.dumps(usuarios.to_json()), 200

@app.route('/users', methods=['POST'])
def criarUsuario():
    dados = request.json
    if dados:
        novoUsuario = Usuario(nome=dados.get('nome'), idade=dados.get('idade'), email=dados.get('email'))
        novoUsuario.save()
        return "Usuário cadastrado", 201
    else:
        return "Dados inválidos", 400

@app.route('/users/<id>', methods=['PUT'])
def atualizarUsuario(id):
    dados = request.json
    try:
        usuario = Usuario.objects.get(id=id)
        if dados:
            usuario.nome = dados.get('nome', usuario.nome)
            usuario.idade = dados.get('idade', usuario.idade)
            usuario.email = dados.get('email', usuario.email)
            usuario.save()
            return "Usuário atualizado", 200
        else:
            return "Dados inválidos", 400
    except Usuario.DoesNotExist:
        return "Usuário não encontrado", 404

@app.route('/users/<id>', methods=['DELETE'])
def removerUsuario(id):
    try:
        usuario = Usuario.objects.get(id=id)
        usuario.delete()
        return "Usuário removido", 200
    except Usuario.DoesNotExist:
        return "Usuário não encontrado", 404

CORS(app, origins=["http://localhost:8080"], allow_headers=["Content-Type"], methods=["GET", "POST", "PUT", "DELETE"])

if __name__ == "__main__":
    app.run(debug=True, host='localhost', port=8080)
