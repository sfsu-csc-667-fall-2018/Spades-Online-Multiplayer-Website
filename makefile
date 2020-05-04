init:
	npm install

run:
	npm run start:dev

init_db:
	npm run db:migrate

undo_db:
	npm run db:rollback

init_seed:
	npx sequelize-cli db:seed:all

undo_seed:
	npx sequelize-cli db:seed:undo

# npm run db:create:migration MIGRATION_NAME
# npx sequelize-cli seed:generate --name SEED_NAME