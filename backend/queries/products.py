#!/usr/bin/env python3

INSERT_PRODUCT = """
    INSERT INTO products (name)
    VALUES (%s)
    RETURNING product_id;
"""

INSERT_PRODUCT_CROP = """
    INSERT INTO product_crops (product_id, crop_id)
    VALUES (%s, %s);
"""
