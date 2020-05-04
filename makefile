init:
	npm install

run:
	npm run start:dev

init_db:
	npm run db:migrate

undo_db:
	npm run db:rollback

# npm run db:create:migration MIGRATION_NAME