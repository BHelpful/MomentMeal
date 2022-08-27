.PHONY: status logs start stop clean

status: ## Get status of containers
	docker-compose ps

logs: ## Get logs of containers
	docker-compose logs --tail=0 --follow

remove:
	docker-compose rm dev-db db-migration supertokens meal-time -s -f -v

db: build ## Build and start docker containers
	docker-compose --env-file ./.env.docker up dev-db db-migration supertokens -d

db-ci: build ## Build and start docker containers
	docker-compose up dev-db db-migration supertokens -d

run: remove build-docker ## Build and start docker containers
	docker-compose --env-file ./.env.docker up -d

stop: ## Stop docker containers
	docker-compose stop

clean:stop ## Stop docker containers, clean data and workspace
	docker-compose down -v --remove-orphans
