#!/usr/bin/env python3

GET_PRODUCE_BY_YEAR = """
    SELECT
        r.name AS region,
        c.name AS crop,
        p.farms
    FROM produce p
    JOIN regions r ON r.region_id = p.region_id
    JOIN crops c ON c.crop_id = p.crop_id
    WHERE p.year = %s
    ORDER BY r.name, c.name;
"""

GET_PRODUCE_BY_YEAR_REGION_CROP = """
    SELECT
        r.name AS region,
        c.name AS crop,
        p.farms,
        p.year
    FROM produce p
    JOIN regions r ON r.region_id = p.region_id
    JOIN crops c ON c.crop_id = p.crop_id
    WHERE p.year = %s
    AND r.region_id = %s
    AND c.crop_id = %s

"""
GET_PRODUCE_BY_REGION_CROP = """
    SELECT
        p.farms,
        p.year
    FROM produce p
    JOIN regions r ON r.region_id = p.region_id
    JOIN crops c ON c.crop_id = p.crop_id
    WHERE r.region_id = %s
    AND c.crop_id = %s
    ORDER BY p.year;
"""
GET_PRODUCE_BY_YEAR_CROP = """
    SELECT
        p.farms,
        r.name AS region
    FROM produce p
    JOIN regions r ON r.region_id = p.region_id
    JOIN crops c ON c.crop_id = p.crop_id
    WHERE p.year = %s
    AND c.crop_id = %s
"""
