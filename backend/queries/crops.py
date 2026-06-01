#!/usr/bin/env python3

GET_ALL_CROPS = """
    SELECT crop_id, name
    FROM crops
    ORDER BY name;
"""
