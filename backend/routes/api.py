#!/usr/bin/env python3

from flask import Blueprint, jsonify
from models import TestItem

api = Blueprint('api', __name__)

@api.route('/api/hello')
def hello():
    return jsonify({"message": "Hello productionFlasker!"})

@api.route('/api/items')
def get_items():
    items = TestItem.query.all()
    return jsonify([{"id": i.id, "name": i.name, "value": i.value} for i in items])
