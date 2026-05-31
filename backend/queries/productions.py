#!/usr/bin/env python3

GET_PRODUCTION_BY_YEAR = """
    SELECT
        r.name AS region,
        c.name AS crop,
        p.amount
    FROM production p
    JOIN regions r ON r.id = p.region_id
    JOIN crops c ON c.id = p.crop_id
    WHERE p.year = %s
    ORDER BY r.name, c.name;
"""

GET_PRODUCTION_BY_YEAR_REGION_CROP = """
    SELECT
        r.name AS region,
        c.name AS crop,
        p.amount,
        p.year
    FROM production p
    JOIN regions r ON r.id = p.region_id
    JOIN crops c ON c.id = p.crop_id
    WHERE p.year = %s
    AND r.id = %s
    AND c.id = %s

"""
GET_PRODUCTION_BY_REGION_CROP = """
    SELECT
        p.amount,
        p.year
    FROM production p
    JOIN regions r ON r.id = p.region_id
    JOIN crops c ON c.id = p.crop_id
    WHERE r.id = %s
    AND c.id = %s
    ORDER BY p.year;
"""
