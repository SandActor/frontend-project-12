start-frontend:
	cd frontend && npm run dev
start-backend:
	npx start-server -p 5002
install:
	npm ci
	cd frontend && npm ci
build:
	rm -rf frontend/build
	npm run build
start:
	make start-backend && make start-frontend
test:
	npx playwright test --config=playwright.config.js