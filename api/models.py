from sqlalchemy import func
from datetime import datetime
from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()

class Usuario(db.Model):
    __tablename__ = "usuario"
    id = db.Column(db.Integer, primary_key=True)
    nombres = db.Column(db.String(100), nullable=False)
    apellidos = db.Column(db.String(100), nullable=False)
    dni = db.Column(db.String(8), nullable=False)
    #triajes = db.relationship('Triaje', backref='usuario')

class Triaje(db.Model):
    __tablename__ = "triaje"
    id = db.Column(db.Integer, primary_key=True)
    temperatura = db.Column(db.Integer, nullable=False)
    frecuencia_cardiaca = db.Column(db.Integer, nullable=False)
    presion_arterial = db.Column(db.String(10), nullable=False)
    peso = db.Column(db.Integer, nullable=False)
    talla = db.Column(db.Integer, nullable=True)
    imc = db.Column(db.Integer, nullable=True)
    calificacion_imc = db.Column(db.String(10), nullable=True)
    nivel_riesgo = db.Column(db.String(20), nullable=True)
    fecha = db.Column(db.DateTime, nullable=False)
    usuario_id = db.Column(db.Integer, db.ForeignKey('usuario.id'))
    usuario = db.relationship('Usuario', backref='usuario')

    def __str__(self) -> str:
        return f"{self.temperatura} {self.frecuencia_cardiaca} {self.presion_arterial} {self.peso} {self.talla} {self.nivel_riesgo}"
