#!/usr/bin/env python3

INSERT_PRODUCTION = """
    INSERT INTO production (region_id, product_id)
    VALUES (%s, %s)
    RETURNING production_id;
"""
