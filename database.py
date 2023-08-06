from mongoengine import Document, StringField, IntField, connect

connect('usuariosdb', host='localhost', port=27017)

class Usuario(Document):
    nome = StringField(required=True)
    idade = IntField()
    email  = StringField(required=True)
