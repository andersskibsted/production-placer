CREATE TABLE IF NOT EXISTS regions (
       id   SERIAL PRIMARY KEY,
       name TEXT NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS crops (
       id   SERIAL PRIMARY KEY,
       name TEXT NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS production (
       id           SERIAL PRIMARY KEY,
       region_id    INTEGER NOT NULL REFERENCES regions(id),
       crop_id      INTEGER NOT NULL REFERENCES crops(id),
       year         INTEGER NOT NULL,
       amount       NUMERIC
);
