import request = require('supertest');
import app from '../app';

import { connectDB, closeDB } from '../connect';

describe('POST /users', () => {
	beforeAll(async () => {
		await connectDB();
	});

	afterAll(async () => {
		await closeDB();
	});

	it('Should create a new user', async () => {
		const res = await request(app).post('/users').send({
			email: 'test@test.test',
			password: process.env.TESTING_PASSWORD,
			passwordConfirmation: process.env.TESTING_PASSWORD,
		});

		const body = res.body;
		const thisProperty = (property: string) => Object({on: (testobj: object) => Object.prototype.hasOwnProperty.call(testobj,property)});
		expect(thisProperty('_id').on(body)).toBe(true);
		expect(thisProperty('email').on(body)).toBe(true);
		expect(thisProperty('createdAt').on(body)).toBe(true);
		expect(thisProperty('updatedAt').on(body)).toBe(true);
	});

	it('Should fail as user already exists', async () => {
		const res = await request(app).post('/users').send({
			email: 'test@test.test',
			password: process.env.TESTING_PASSWORD,
			passwordConfirmation: process.env.TESTING_PASSWORD,
		});

		expect(res.body).not.toContain('_id');
		expect(res.status).toBe(409);
	});
});
