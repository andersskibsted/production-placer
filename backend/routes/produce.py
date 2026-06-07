#!/usr/bin/env python3

from flask import Blueprint, jsonify, request
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
    print(year)
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
    year = "2024"
    for r in requirements:
        crop_id_str = str(r["cropId"])
        minimum = r["amount"]

        region = query(CHECK_AVAILABLE_PRODUCE, (crop_id_str, minimum, year))
        regions.append(region)

    result = defaultdict(list)
    for region in regions:
        for row in region:
            result[row["region"]].append({
                "region_id": row["region_id"],
                "crop": row["crop"],
                "yield": row["yield"]
            })

    filtered = {
        key: value
        for key, value in result.items()
        if len(value) >= number_of_required_crops
    }

    regions_with_availble_produce = [
        {
            "name": key,
            "crops": [
                {
                    "crop": item["crop"],
                    "yield": item["yield"]
                }
                for item in value
            ]
        }
        for key, value in filtered.items()
    ]
    return jsonify({ "regions": regions_with_availble_produce })
