.PHONY: install install-backend install-frontend db-init db-reset db-seed dev-backend dev-frontend

install: install-backend install-frontend

install-backend:
	cd backend && python3 -m venv .venv && . .venv/bin/activate && pip install -r requirements.txt
	test -f backend/.env || cp backend/.env.example backend/.env

install-frontend:
	cd frontend && npm install

db-init:
	cd backend && . .venv/bin/activate && python db/init.py

db-reset:
	cd backend && . .venv/bin/activate && python db/init.py --reset

db-seed:
	cd backend && . .venv/bin/activate && python db/init.py --seed-only

dev-backend:
	cd backend && . .venv/bin/activate && uvicorn main:app --reload --port 8000

dev-frontend:
	cd frontend && npm run dev
