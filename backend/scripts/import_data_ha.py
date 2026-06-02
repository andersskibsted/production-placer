#!/usr/bin/env python3

import csv
import re
import psycopg2
from dotenv import load_dotenv
import os

load_dotenv()

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
csv_path = os.path.join(BASE_DIR, "..", "data", "produktionsdata_hektar_regioner.csv")

YEARS = list(range(2005, 2026))

conn = psycopg2.connect(os.environ["DATABASE_URL"])
cur = conn.cursor()

def clean_crop_name(name: str) -> str:
    return re.sub(r"^[\d\.\s]+", "", name).strip()

current_region = None

with open(csv_path, "r", encoding="utf-8") as f:
    reader = csv.reader(f, delimiter=",")
    next(reader) # Spring 4 header-linjer over

    inserted_crops = set()

    for row in reader:
        row = [field.strip() for field in row]

        # region-linje
        if len(row) >= 2 and row[1] and (len(row) < 3 or not row[2]):
            current_region = row[1]
            continue

        # afgrøde-linje
        if current_region and len(row) > 2 and row[2]:
            crop_name = clean_crop_name(row[2])
            amounts = row[3:]

            # hent eller opret region
            cur.execute("""
                INSERT INTO regions (name) VALUES (%s)
                ON CONFLICT (name) DO NOTHING
                RETURNING region_id;
            """, (current_region,))
            #result = cur.fetchone()

            # hent eller opret afgrøde
            cur.execute("""
                INSERT INTO crops (name) VALUES (%s)
                ON CONFLICT (name) DO NOTHING
                RETURNING crop_id;
            """, (crop_name,))

            conn.commit()

            cur.execute("SELECT region_id FROM regions WHERE name = %s", (current_region,))
            region_id = cur.fetchone()[0]


            cur.execute("SELECT crop_id FROM crops WHERE name = %s", (crop_name,))
            crop_id = cur.fetchone()[0]

            # indsæt produktion pr år
            for i, year in enumerate(YEARS):
                raw = amounts[i] if i < len(amounts) else ".."
                if raw == ".." or raw.strip() == "":
                    value = None
                else:
                    value = int(float(raw))

                cur.execute("""
                    UPDATE produce
                    SET area = %s
                    WHERE region_id = %s
                    AND crop_id = %s
                    AND year = %s;
                """, (value, region_id, crop_id, year))
            conn.commit()

cur.close()
conn.close()

print("done")
