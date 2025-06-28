install:
	cd frontend && npm install

build:
	cd frontend && npm run build

start:
	cd frontend && npx start-server -s ./frontend -p 5002