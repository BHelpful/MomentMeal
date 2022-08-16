.PHONY: build build-prod

build-docker: ## Build docker image
	COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_BUILDKIT=1 docker-compose --env-file .env.docker build

build-test: ## Build docker image
	COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_BUILDKIT=1 docker-compose --env-file ./.env.test -f docker-compose.test.yml build test-db test-db-migration test-supertokens

build: ## Build docker image
	COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_BUILDKIT=1 docker-compose build dev-db db-migration supertokens
