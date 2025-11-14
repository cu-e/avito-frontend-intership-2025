


prod-up:
	docker compose -p avito-frontend-intership --profile all up -d

prod-down:
	docker compose -p avito-frontend-intership --profile all down

prod-build:
	docker compose -p avito-frontend-intership --profile all up -d --build --force-recreate