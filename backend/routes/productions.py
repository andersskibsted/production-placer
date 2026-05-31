#!/usr/bin/env python3

from flask import Blueprint, jsonify
from db import query

from queries.productions import GET_PRODUCTION_BY_REGION_CROP, GET_PRODUCTION_BY_YEAR, GET_PRODUCTION_BY_YEAR_REGION_CROP

bp = Blueprint("productions", __name__, url_prefix="/api/productions")

@bp.route("/<int:year>")
def production_by_year(year):
    production = query(GET_PRODUCTION_BY_YEAR, (year,))
    return jsonify(production)

@bp.route("/<int:year>/<int:region_id>/<int:crop_id>")
def production_by_year_region_crop(year, region_id, crop_id):
    production = query(GET_PRODUCTION_BY_YEAR_REGION_CROP, (year, region_id, crop_id))
    return jsonify(production)

@bp.route("/<int:region_id>/<int:crop_id>")
def production_by_region_crop(region_id, crop_id):
    year = query(GET_PRODUCTION_BY_REGION_CROP, (region_id, crop_id))
    return jsonify(year)
