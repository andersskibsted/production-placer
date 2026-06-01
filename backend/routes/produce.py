#!/usr/bin/env python3

from flask import Blueprint, jsonify
from db import query

from queries.produce import GET_PRODUCE_BY_REGION_CROP, GET_PRODUCE_BY_YEAR, GET_PRODUCE_BY_YEAR_CROP, GET_PRODUCE_BY_YEAR_REGION_CROP

bp = Blueprint("produce", __name__, url_prefix="/api/produce")

@bp.route("/<int:year>")
def produce_by_year(year):
    produce = query(GET_PRODUCE_BY_YEAR, (year,))
    return jsonify(produce)

@bp.route("/<int:year>/<int:region_id>/<int:crop_id>")
def produce_by_year_region_crop(year, region_id, crop_id):
    produce = query(GET_PRODUCE_BY_YEAR_REGION_CROP, (year, region_id, crop_id))
    return jsonify(produce)

@bp.route("/<int:region_id>/<int:crop_id>")
def produce_by_region_crop(region_id, crop_id):
    year = query(GET_PRODUCE_BY_REGION_CROP, (region_id, crop_id))
    return jsonify(year)

@bp.route("/year/<int:year>/<int:crop_id>")
def produce_by_year_crop(year, crop_id):
    region = query(GET_PRODUCE_BY_YEAR_CROP, (year, crop_id))
    return jsonify(region)
