#!/usr/bin/env python3

INSERT_PRODUCTION = """
    INSERT INTO production (region_id, name)
    VALUES (%s, %s)
    RETURNING production_id;
"""

INSERT_PRODUCTION_CROP = """
    INSERT INTO production_crops (production_id, crop_id)
    VALUES (%s, %s);
"""
