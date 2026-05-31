#!/usr/bin/env python3

from flask import Blueprint, jsonify
from db import query

from queries.crops import GET_ALL_CROPS

bp = Blueprint("crops", __name__, url_prefix="/api/crops")

@bp.route("/")
def list_crops():
    crops = query(GET_ALL_CROPS)
    return jsonify(crops)
