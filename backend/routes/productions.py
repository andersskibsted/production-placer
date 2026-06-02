#!/usr/bin/env python3

from flask import Blueprint, jsonify
from db import query

bp = Blueprint("productions", __name__, url_prefix="/api/productions")
