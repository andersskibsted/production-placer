#!/usr/bin/env python3

import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    DATABASE_URL = os.environ["DATABASE_URL"]
    DEBUG = os.getenv("FLASK_DEBUG", "false").lower() == "true"
    SECRET_KEY = os.environ.get("FLASK_SECRET_KEY", "dev-key")
