#!/usr/bin/env python3

import csv
import psycopg2
from dotenv import load_dotenv
import os

load_dotenv()

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
csv_path = os.path.join(BASE_DIR, "..", "data", "crops_per_region_per_year.csv")

YEARS = ['2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024']

conn = psycopg2.connect(os.environ["DATABASE_URL"])
cur = conn.cursor()

with open(csv_path, "r", newline='', encoding='latin-1') as f:
    reader = csv.reader(f, delimiter=';')

    for row in reader:
        # spring første kolonne over (Produktion mio. kg)
        region = row[1].strip('"')
        crop = row[2].strip('"')
        cur.execute("""
        INSERT INTO regions (name) VALUES (%s)
        ON CONFLICT (name) DO NOTHING
        RETURNING id;
        """, (region,))

        result = cur.fetchone()
        if result:
            region_id = result[0]
        else:
            cur.execute("SELECT id FROM regions WHERE name = %s", (region,))
            region_id = cur.fetchone()[0]

        cur.execute("""
            INSERT INTO crops (name) VALUES (%s)
            ON CONFLICT (name) DO NOTHING
            RETURNING id;
        """, (crop,))

        result = cur.fetchone()
        if result:
            crop_id = result[0]
        else:
            cur.execute("SELECT id FROM crops WHERE name = %s", (crop,))
            crop_id = cur.fetchone()[0]

        for i, year in enumerate(YEARS):
            raw = row[i + 3]
            if raw == '..' or raw.strip() == '':
                amount = None
            else:
                amount = float(row[i + 3])
            cur.execute(
                """
                INSERT INTO production (region_id, crop_id, year, amount)
                VALUES (%s, %s, %s, %s)
                """, (region_id, crop_id, year, amount))

conn.commit()
cur.close()
conn.close()

print("done")
