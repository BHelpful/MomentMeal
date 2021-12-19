import request from 'supertest';
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
			password: '123456',
			passwordconfirmation: '123456',
		});

		const body = res.body;
		expect(body?.hasOwnProperty('_id')).toBe(true);
		expect(body?.hasOwnProperty('email')).toBe(true);
		expect(body?.hasOwnProperty('createdAt')).toBe(true);
		expect(body?.hasOwnProperty('updatedAt')).toBe(true);
	});

	it('Should fail as user already exists', async () => {
		const res = await request(app).post('/users').send({
			email: 'test@test.test',
			password: '123456',
			passwordconfirmation: '123456',
		});

		expect(res.body).not.toContain('_id');
		expect(res.text).toBe('User already exists');
		expect(res.status).toBe(409);
	});
});
