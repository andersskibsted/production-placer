#!/usr/bin/env python3

from flask import Flask
from flask_cors import CORS
from config import Config
from models import db
from routes.api import api

app = Flask(__name__)
app.config.from_object(Config)
#CORS(app)
CORS(app, origins=["http://localhost:5173"])

db.init_app(app)

app.register_blueprint(api)

if __name__ == "__main__":
    app.run()
