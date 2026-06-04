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

DELETE_PRODUCTION_CROPS = """
    DELETE FROM production_crops
    WHERE production_id = %s;
"""

DELETE_PRODUCTION = """
    DELETE FROM production 
    WHERE production_id = %s;
"""

GET_ALL_PRODUCTIONS_WITH_CROPS = """
    SELECT
        p.production_id AS id,
        p.name AS name,
        r.name AS region,
        c.name AS crop
    FROM production p
    JOIN regions r ON r.region_id = p.region_id
    JOIN production_crops pc ON pc.production_id = p.production_id
    JOIN crops c ON c.crop_id = pc.crop_id
    ORDER BY p.production_id, c.name;
"""