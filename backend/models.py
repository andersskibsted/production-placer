#!/usr/bin/env python3

from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()

class TestItem(db.Model):
    __tablename__ = "test_items"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    value = db.Column(db.String(100), nullable=False)
