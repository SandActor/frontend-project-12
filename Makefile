start-frontend:
	cd frontend && npm run dev
start-backend:
	npm start
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