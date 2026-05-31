#!/usr/bin/env python3

from flask import Blueprint, jsonify
from db import query

from queries.regions import GET_ALL_REGIONS

bp = Blueprint("regions", __name__, url_prefix="/api/regions")

@bp.route("/")
def list_regions():
    regions = query(GET_ALL_REGIONS)
    return jsonify(regions)
