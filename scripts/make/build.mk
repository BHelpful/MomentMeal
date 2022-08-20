.PHONY: build build-prod

build-docker: ## Build docker image
	COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_BUILDKIT=1 docker-compose --env-file .env.docker build

build: ## Build docker image
	COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_BUILDKIT=1 docker-compose build dev-db db-migration supertokens
