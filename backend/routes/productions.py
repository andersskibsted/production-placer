#!/usr/bin/env python3

from flask import Blueprint, jsonify, request
from db import query, get_db
from queries.productions import INSERT_PRODUCTION, INSERT_PRODUCTION_CROP, GET_ALL_PRODUCTIONS_WITH_CROPS, DELETE_PRODUCTION_CROPS, DELETE_PRODUCTION

bp = Blueprint("productions", __name__, url_prefix="/api/productions")

@bp.route("/", methods=["POST"])
def register_production():
    data = request.get_json()
    product_name = data["product_name"]
    region_id = data["region_id"]
    crop_ids = data["crop_ids"]
    conn = get_db()


    try:
        with conn.cursor() as cur:
            cur.execute(INSERT_PRODUCTION, (region_id, product_name))
            production_id = cur.fetchone()[0]
            for id in crop_ids:
                cur.execute(INSERT_PRODUCTION_CROP, (production_id, id))

            conn.commit()
    except Exception as e:
        conn.rollback()
        return_err = f'Product registration error: {e}'
        return jsonify({ "error": return_err }), 409

    return jsonify({"production_id": production_id})

@bp.route("/")
def get_productions():
    productions = query(GET_ALL_PRODUCTIONS_WITH_CROPS)
    return jsonify(productions)

@bp.route("/<int:production_id>", methods=["DELETE"])
def delete_production(production_id):
    query(DELETE_PRODUCTION_CROPS, (production_id,), fetch="none")
    query(DELETE_PRODUCTION, (production_id,), fetch="none")
    return "", 204
