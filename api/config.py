
DB_NAME = "triaje"
DB_USER = "root"
DB_HOST = "localhost"
DB_PORT = "3306"

class DevCofig:
    # local
    SQLALCHEMY_DATABASE_URI = f"mysql+pymysql://{DB_USER}:@{DB_HOST}:{DB_PORT}/{DB_NAME}"
    SQLALCHEMY_ECHO = True
    SQLALCHEMY_TRACK_MODIFICATIONS = False


config = {"devConfig": DevCofig}
