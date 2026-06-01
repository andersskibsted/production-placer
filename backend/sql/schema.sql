CREATE TABLE IF NOT EXISTS regions (
       region_id   SERIAL PRIMARY KEY,
       name TEXT NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS crops (
       crop_id   SERIAL PRIMARY KEY,
       name TEXT NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS production (
       id           SERIAL PRIMARY KEY,
       region_id    INTEGER NOT NULL REFERENCES regions(region_id),
       crop_id      INTEGER NOT NULL REFERENCES crops(crop_id),
       year         INTEGER NOT NULL,
       amount       INTEGER
);

CREATE TABLE IF NOT EXISTS products (
       product_id SERIAL PRIMARY KEY,
       name TEXT NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS product_crops (
       product_id INTEGER NOT NULL REFERENCES products(product_id),
       crop_id INTEGER NOT NULL REFERENCES crops(crop_id),
       PRIMARY KEY (product_id, crop_id)
);
