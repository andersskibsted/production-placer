#!/usr/bin/env python3
# backend/app.py
from flask import Flask
from db import init_pool, close_db
from routes import crops, regions, productions, products
from flask_cors import CORS

app = Flask(__name__)
#CORS(app)

CORS(app, origins=["http://localhost:5173"])
#CORS(app, resources={r"/api/*": {"origins": "*"}}, supports_credentials=False)

from config import Config
app.config.from_object(Config)

init_pool(app)
app.teardown_appcontext(close_db)

app.register_blueprint(crops.bp)
app.register_blueprint(regions.bp)
app.register_blueprint(productions.bp)
app.register_blueprint(products.bp)

if __name__ == "__main__":
    app.run()
