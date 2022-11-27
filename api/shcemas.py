from marshmallow import fields, post_load
from api.models import Usuario, Triaje
from flask_marshmallow import Marshmallow


ma = Marshmallow()


class UsuarioSchema(ma.Schema):
    nombres = fields.Str(required=True)
    apellidos = fields.Str(required=True)
    dni = fields.Str(required=True)

    @post_load
    def create_usuario(self, data, **kwargs):
        return Usuario(**data)


class TriajeSchema(ma.Schema):
    temperatura = fields.Int(required=True)
    frecuencia_cardiaca = fields.Int(required=True)
    presion_arterial = fields.Str(required=True)
    peso = fields.Int(required=True)
    talla = fields.Int(required=True)
    imc = fields.Int(required=False)
    calificacion_imc = fields.Str(required=False)
    nivel_riesgo = fields.Str(required=True)
    usuario = fields.Nested(UsuarioSchema)
    fecha = fields.Str()
    @post_load
    def create_usuario(self, data, **kwargs):
        return Triaje(**data)


class UsuarioTriaje(ma.Schema):
    nombres = fields.Str(required=True)
    apellidos = fields.Str(required=True)
    dni = fields.Str(required=True)
    temperatura = fields.Int(required=True)
    frecuencia_cardiaca = fields.Int(required=True)
    presion_arterial = fields.Str(required=True)
    peso = fields.Int(required=True)
    talla = fields.Int(required=True)
    imc = fields.Int(required=False)
    calificacion_imc = fields.Int(required=False)
    nivel_riesgo = fields.Str(required=True)

usuarioSchema = UsuarioSchema()
triajeSchema = TriajeSchema()
usuarioTriajeSchema = UsuarioTriaje()
