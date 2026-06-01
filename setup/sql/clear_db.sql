DROP TABLE IF EXISTS regions CASCADE;
DROP TABLE IF EXISTS crops CASCADE;
DROP TABLE IF EXISTS produce CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS production CASCADE;
DROP TABLE IF EXISTS product_crops CASCADE;


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

CREATE TABLE IF NOT EXISTS products (
       product_id SERIAL PRIMARY KEY,
       name TEXT NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS production (
       production_id SERIAL PRIMARY KEY,
       region_id INTEGER NOT NULL REFERENCES regions(region_id),
       product_id INTEGER NOT NULL REFERENCES products(product_id)
);

CREATE TABLE IF NOT EXISTS product_crops (
       product_id INTEGER NOT NULL REFERENCES products(product_id),
       crop_id INTEGER NOT NULL REFERENCES crops(crop_id),
       PRIMARY KEY (product_id, crop_id)
);
