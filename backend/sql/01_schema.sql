CREATE TABLE IF NOT EXISTS regions (
       region_id   SERIAL PRIMARY KEY,
       name TEXT NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS crops (
       crop_id   SERIAL PRIMARY KEY,
       name TEXT NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS produce (
       id           SERIAL PRIMARY KEY,
       region_id    INTEGER NOT NULL REFERENCES regions(region_id),
       crop_id      INTEGER NOT NULL REFERENCES crops(crop_id),
       year         INTEGER NOT NULL,
       area         INTEGER,
       farms        INTEGER
);

CREATE TABLE IF NOT EXISTS average_yield (
       crop_id      INTEGER PRIMARY KEY REFERENCES crops(crop_id),
       avg_yield    NUMERIC
);


CREATE TABLE IF NOT EXISTS production (
       production_id SERIAL PRIMARY KEY,
       region_id INTEGER NOT NULL REFERENCES regions(region_id),
       name TEXT NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS production_crops (
       production_id INTEGER NOT NULL REFERENCES production(production_id),
       crop_id INTEGER NOT NULL REFERENCES crops(crop_id),
       PRIMARY KEY (production_id, crop_id)
);

CREATE VIEW yields AS
SELECT
    p.region_id,
    p.crop_id,
    p.year,
    p.area * av.avg_yield as yield
FROM produce p
JOIN average_yield av ON av.crop_id = p.crop_id;
