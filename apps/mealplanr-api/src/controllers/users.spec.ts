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
		expect(Object.prototype.hasOwnProperty.call(body, '_id')).toBe(true);
		expect(Object.prototype.hasOwnProperty.call(body, 'email')).toBe(true);
		expect(Object.prototype.hasOwnProperty.call(body, 'createdAt')).toBe(true);
		expect(Object.prototype.hasOwnProperty.call(body, 'updatedAt')).toBe(true);
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
