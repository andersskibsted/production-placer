#!/usr/bin/env python3

from flask import Blueprint, jsonify, request
#from backend.routes import crops
from db import query
from collections import defaultdict

from queries.produce import CHECK_AVAILABLE_PRODUCE, GET_PRODUCE_BY_REGION_CROP, GET_PRODUCE_BY_YEAR, GET_PRODUCE_BY_YEAR_CROP, GET_PRODUCE_BY_YEAR_REGION_CROP

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

@bp.route("/", methods=["POST"])
def regions_available_for_production():
    requirements = request.json["requirements"]
    number_of_required_crops = len(requirements)
    regions = []
    year = "2021"
    for r in requirements:
       # print(f'requirement {r}')
        crop_id_str = str(r["cropId"])
        minimum = r["amount"]

        region = query(CHECK_AVAILABLE_PRODUCE, (crop_id_str, minimum, year))
        # print(region)
        regions.append(region)

    # result = {
    #     row["region_id"]: (row["region"], row["crop"])
    #     for row in regions
    # }
    result = defaultdict(list)
    for region in regions:
        for row in region:
            result[row["region"]].append((row["region_id"], row["crop"]))
    # for r, r_id, c_id in regions:
    #     result[r].append(c_id)
    # print(result)
    filtered = {
        key: value
        for key, value in result.items()
        if len(value) >= number_of_required_crops
    }
    # print(f'number of required: {number_of_required_crops}')
    # print(f'filtered: {filtered}')

    regions_with_availble_produce = [{"name": key } for key, r in filtered.items() ]
    print(f'regions with {regions_with_availble_produce}')
    return jsonify({ "regions": regions_with_availble_produce })
