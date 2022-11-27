from api import create_app
from api.config import config

if __name__ == "__main__":
    app = create_app(config["devConfig"])
    app.run(host="localhost", port="8000", debug=True)
