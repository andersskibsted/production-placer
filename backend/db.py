# app/db.py
import psycopg2
from psycopg2.pool import SimpleConnectionPool
from flask import g

pool = None

def init_pool(app):
    global pool
    pool = SimpleConnectionPool(1, 10, dsn=app.config["DATABASE_URL"])

def get_db():
    if "db" not in g:
        g.db = pool.getconn()
    return g.db

def close_db(e=None):
    db = g.pop("db", None)
    if db is not None:
        pool.putconn(db)

def query(sql, params=None, fetch="all"):
    conn = get_db()
    with conn.cursor() as cur:
        cur.execute(sql, params)
        if fetch == "all":
            cols = [desc[0] for desc in cur.description]
            return [dict(zip(cols, row)) for row in cur.fetchall()]
        elif fetch == "one":
            cols = [desc[0] for desc in cur.description]
            row = cur.fetchone()
            return dict(zip(cols, row)) if row else None
        else:
            conn.commit()
            return cur.rowcount

def query_tuples(sql, params=None, fetch="all"):
    conn = get_db()
    with conn.cursor() as cur:
        cur.execute(sql, params)
        if fetch == "all":
            cols = [desc[0] for desc in cur.description]
            return [dict(zip(cols, row)) for row in cur.fetchall()]
        elif fetch == "one":
            cols = [desc[0] for desc in cur.description]
            row = cur.fetchone()
            return dict(zip(cols, row)) if row else None
        else:
            conn.commit()
            return cur.rowcount
