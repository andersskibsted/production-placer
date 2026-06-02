#!/usr/bin/env python3

import csv
import re
import psycopg2
from dotenv import load_dotenv
import os

load_dotenv()

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
csv_path = os.path.join(BASE_DIR, "..", "data", "udbytter_danmark.csv")



conn = psycopg2.connect(os.environ["DATABASE_URL"])
cur = conn.cursor()

def clean_crop_name(name: str) -> str:
    return re.sub(r"^[\d\.\s]+", "", name).strip()


with open(csv_path, "r", encoding="utf-8") as f:
    reader = csv.reader(f, delimiter=",")
    next(reader)

    for row in reader:
        row = [field.strip() for field in row]
        crop_name = clean_crop_name(row[0])
        cur.execute("SELECT crop_id FROM crops WHERE name = %s", (crop_name,))
        crop_id = cur.fetchone()[0]
        avg_yield = float(row[1])

        # hent eller opret afgrøde
        cur.execute("""
            INSERT INTO average_yield (crop_id, avg_yield) VALUES (%s, %s)
            RETURNING crop_id;
        """, (crop_id, avg_yield))
        conn.commit()



conn.commit()
cur.close()
conn.close()

print("done")
