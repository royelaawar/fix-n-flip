# # Remote library imports
# from flask import Flask
# from flask_cors import CORS
# from flask_migrate import Migrate
# from flask_restful import Api
# from flask_sqlalchemy import SQLAlchemy
# from sqlalchemy import MetaData
# from flask_bcrypt import Bcrypt


# # Instantiate app, set attributes
# app = Flask(__name__)
# app.secret_key = b'\xbbyG>\xcf \x07\xad\x12\xfc\x8eJ'
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# app.json.compact = False

# # Define metadata, instantiate db
# metadata = MetaData(naming_convention={
#     "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
# })

# db = SQLAlchemy(app)
# migrate = Migrate(app, db)

# bcrypt = Bcrypt(app)

# # Instantiate REST API
# api = Api(app)

# # Instantiate CORS
# CORS(app)

# config.py

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from flask_restful import Api
from flask_cors import CORS
from sqlalchemy import MetaData

# Instantiate Flask app
app = Flask(__name__)
app.secret_key = b'\xbbyG>\xcf \x07\xad\x12\xfc\x8eJ'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

# Define metadata, instantiate db
metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})
db = SQLAlchemy(app, metadata=metadata)

# Initialize other extensions
migrate = Migrate(app, db)
bcrypt = Bcrypt(app)
api = Api(app)
CORS(app)
