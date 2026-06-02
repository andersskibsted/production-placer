#!/usr/bin/env python3

from flask import Blueprint, jsonify, request
from db import query, get_db
from queries.products import GET_PRODUCT_ID
from queries.productions import INSERT_PRODUCTION

bp = Blueprint("productions", __name__, url_prefix="/api/productions")

@bp.route("/", methods=["POST"])
def register_production():
    data = request.get_json()
    product_name = data["product_name"].lower()
    region_id = data["region_id"]

    conn = get_db()

    product_id = query(GET_PRODUCT_ID, (product_name,))
    print(f'product_id {product_id}')
    if not product_id:
        print("no product with that name")

    try:
        with conn.cursor() as cur:
            r_id = str(region_id)
            p_id = str(product_id)
            cur.execute(INSERT_PRODUCTION, (r_id, p_id))
            production_id = cur.fetchone()[0]
            conn.commit()
    except Exception as e:
        conn.rollback()
        return jsonify({"error": "Produktet eksisterer ikke"}), 409

    return jsonify({"production_id": production_id})
