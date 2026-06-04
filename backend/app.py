#!/usr/bin/env python3

from flask import Flask
from db import init_pool, close_db
from routes import crops, regions, produce, products, productions
from flask_cors import CORS
from config import Config

app = Flask(__name__)

app.config.from_object(Config)

CORS(app, supports_credentials=False, always_send=True)
#CORS(app)

init_pool(app)
app.teardown_appcontext(close_db)

app.register_blueprint(crops.bp)
app.register_blueprint(regions.bp)
app.register_blueprint(produce.bp)
app.register_blueprint(products.bp)
app.register_blueprint(productions.bp)

@app.after_request
def add_cors_headers(response):
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type"
    response.headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS, DELETE"
    return response

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
