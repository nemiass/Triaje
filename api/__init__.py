from flask import Flask
from api.views import app_front, api
from flask_cors import CORS
from api.models import db
from api.shcemas import ma


def create_app(config) -> Flask:
    app = Flask(__name__, static_folder="../frontend/build")
    CORS(app, resources={r"/api/*": {"origins": "*"}})
    app.config.from_object(config)
    app.register_blueprint(app_front, url_prefix='/')
    app.register_blueprint(api, url_prefix='/api')

    db.init_app(app)
    ma.init_app(app)

    with app.app_context():
        db.create_all()
    return app
