from flask import Blueprint, send_from_directory, request, Response, jsonify
from api.shcemas import usuarioSchema, triajeSchema, usuarioTriajeSchema
from api.models import Usuario, Triaje, db
from marshmallow import EXCLUDE
from datetime import datetime

app_front = Blueprint("main_app", __name__, static_url_path='', static_folder="../frontend/build")
api = Blueprint("triaje", __name__)

@app_front.get("/", defaults={'path':''})
def application_main(path):
    return send_from_directory(app_front.static_folder, "index.html")

@api.post("/triajes")
def triajes():
    json_data = request.get_json();
    err = usuarioTriajeSchema.validate(json_data)

    if err:
        return jsonify(err)
    
    usuario = Usuario.query.filter_by(dni = json_data["dni"]).first()

    if usuario is None:
        usuario = usuarioSchema.load(json_data, unknown=EXCLUDE)
        db.session.add(usuario)
        db.session.commit()
    
    triaje = triajeSchema.load(json_data, unknown=EXCLUDE)
    triaje.imc = int(int(triaje.peso) / (int(triaje.talla)**2))
    triaje.calificacion_imc = calcular_calificacion_imc(triaje.imc)
    triaje.usuario_id = usuario.id
    triaje.fecha = datetime.now().isoformat()
    db.session.add(triaje)
    db.session.commit()
    
    return Response(status=201)


@api.get("triajes")
def show_triajes():
    users = Triaje.query.all()
    users_data = triajeSchema.dump(users, many=True)
    return jsonify(users_data)

def calcular_calificacion_imc(imc):
    categoria_imc = ""
    if imc < 18.5:
        categoria_imc = "Bajo peso"
    elif 18.5 <= imc <= 24.9:
        categoria_imc = "Normal"
    elif 25 <= imc <= 29.9:
        categoria_imc = "Sobrepeso"
    elif imc >= 30:
        categoria_imc = "Obesidad"
    return categoria_imc


