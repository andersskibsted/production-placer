#!/usr/bin/env python3

from flask import Blueprint, jsonify, request
from db import query, get_db
from queries.products import INSERT_PRODUCT, INSERT_PRODUCT_CROP

bp = Blueprint("products", __name__, url_prefix="/api/products")


@bp.route("/", methods=["POST"])
def create_product():
    data = request.get_json()
    name = data["name"].lower()
    crop_ids = data["crop_ids"]


    conn = get_db()
    try:
        with conn.cursor() as cur:
            cur.execute(INSERT_PRODUCT, (name,))
            product_id = cur.fetchone()[0]
            for crop_id in crop_ids:
                cur.execute(INSERT_PRODUCT_CROP, (product_id, crop_id))
            conn.commit()
    except Exception as e:
        conn.rollback()
        return jsonify({"error": "Produktet eksisterer allerede"}), 409

    return jsonify({"product_id": product_id}), 201

# Her bruger jeg get_db() direkte i stedet for query()-hjælperen
# fordi vi laver flere inserts i samme transaktion —
# de skal committes samlet så vi ikke får et produkt
# uden afgrøder i databasen hvis noget går galt undervejs.
