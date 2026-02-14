dev:
	docker compose -f docker-compose.yml -f docker-compose.dev.yml up -d

prod:
	docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d

down-dev:
	docker compose -f docker-compose.yml -f docker-compose.dev.yml down

down-prod:
	docker compose -f docker-compose.yml -f docker-compose.prod.yml down

logs-dev:
	docker compose -f docker-compose.yml -f docker-compose.dev.yml logs

logs-prod:
	docker compose -f docker-compose.yml -f docker-compose.prod.yml logs

build:
	docker compose build

restart-dev:
	make down-dev && make dev

restart-prod:
	make down-prod && make prod