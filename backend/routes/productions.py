#!/usr/bin/env python3

from flask import Blueprint, jsonify, request
from db import query, get_db
#from queries.products import GET_PRODUCT_ID
from queries.productions import INSERT_PRODUCTION, INSERT_PRODUCTION_CROP

bp = Blueprint("productions", __name__, url_prefix="/api/productions")

@bp.route("/", methods=["POST"])
def register_production():
    data = request.get_json()
    product_name = data["product_name"].lower()
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
