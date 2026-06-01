#!/usr/bin/env python3

GET_ALL_REGIONS = """
    SELECT region_id, name
    FROM regions
    ORDER BY name;
"""
