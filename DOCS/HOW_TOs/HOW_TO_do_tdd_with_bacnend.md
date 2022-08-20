# Test Driven Development (TDD) with Backend

The easiest way to do TDD with a backend is to write e2e tests on the api (meaning no frontend involved). This can be done by writing tests for each endpoint as a user  would use the endpoints. More specifically the tests should be written in `apps/api/src/tests/api.e2e.spec.ts`

```typescript
describe('Stores', () => {
	describe('Create store', () => {
		const dto: CreateStoreDto = {
			name: 'Rema 1000',
		};
		it('should create store', async () => {
			return pactum
				.spec()
				.post('/stores')
				.withBody(dto)
				.expectStatus(201)
				.stores('storeId', 'id');
		});
	});
});
```

## Running the tests in watch mode
In order to do TDD with a backend you need to run the tests in watch mode. This is done by adding the `--watch` flag to the command.

If you don't have the db running in docker you can start it by running:
```bash
make db
```

Run tests in watch mode:
```bash
yarn test --watch
```

The test is using the environment variables `.env`. The main difference being the ports for the databases are different, so the development database port does not clash with the test database port. To see how to generate the test environment variables look at [Getting Started](https://github.com/BHelpful/MealTime/blob/master/DOCS/HOW_TOs/HOW_TO_get_started.md).