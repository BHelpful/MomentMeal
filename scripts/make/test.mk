.PHONY: build-test test-up test-down test

build-test: ## Build docker image (test)
	docker-compose -f docker-compose.test.yml build

start-test:build-test ## Build and start docker containers (test)
	docker-compose -f docker-compose.test.yml up dev-db db-migration supertokens -d
	docker container ls -la

exec-test: ## Execute test suite
	docker-compose -f docker-compose.test.yml up meal-time-test

stop-test: ## Stop docker containers (test)
	docker-compose -f docker-compose.test.yml stop

clean-test: stop-test ## Stop docker containers, clean data and workspace (test)
	docker-compose -f docker-compose.test.yml down -v --remove-orphans

test: remove start-test exec-test clean-test ## Run test suite
