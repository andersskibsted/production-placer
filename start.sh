#!/bin/bash

echo "🌱 Starter ProductionPlacer..."

DB_USER=$(whoami)

# Genstart database
dropdb productionplacer 2>/dev/null
createdb productionplacer
psql -U "$DB_USER" -d productionplacer -f backend/sql/01_schema.sql
psql -U "$DB_USER" -d productionplacer -f backend/sql/02_productionplacer.sql
#psql -U $DB_USER -d productionplacer -f setup/sql/productionplacer.sql

# Start backend i baggrunden
echo "🚀 Starter backend..."
cd backend
source venv/bin/activate
python3 app.py &
BACKEND_PID=$!

# Start frontend i baggrunden
echo "🌾 Starter frontend..."
cd ../frontend
npm run dev &
FRONTEND_PID=$!

echo "✅ Alt kører! Backend PID: $BACKEND_PID, Frontend PID: $FRONTEND_PID"
echo "Stop med Ctrl+C"

# Vent og luk begge når du stopper
trap "kill $BACKEND_PID $FRONTEND_PID" EXIT
wait
