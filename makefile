init:
	echo DATABASE_URL=postgres://whoami@localhost:5432/DATABASE_NAME >> .env
	npm install

run:
	npm run start:dev