#!/usr/bin/env python3

from flask import Blueprint, jsonify

api = Blueprint('api', __name__)

@api.route('/api/hello')
def hello():
    return jsonify({"message": "Hello productionFlasker!"})

