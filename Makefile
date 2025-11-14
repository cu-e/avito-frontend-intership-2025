


prod:
	docker compose -p avito-frontend-intership up -d

prod-build:
	docker compose -p avito-frontend-intership up -d --build --force-recreate