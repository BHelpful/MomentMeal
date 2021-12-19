import { Router } from 'express';
import { getSwaggerObject } from '.';
import {
	createUserHandler,
	deleteUserHandler,
	getUserExistsHandler,
	getUserHandler,
	updateUserHandler,
} from '../collections/user/user.controller';
import { userSM } from '../collections/user/user.model';
import {
	createUserSchema,
	deleteUserSchema,
	getUserSchema,
	updateUserSchema,
	userCreateStructure,
} from '../collections/user/user.schema';
import { requiresUser, validateRequest } from '../middleware';

const router = Router();

// Create a new user
router.post('/', [validateRequest(createUserSchema)], createUserHandler);
export const usersPost = {
	...getSwaggerObject({
		CRUD: 'post',
		item: 'user',
		tag: 'users',
		summary: 'Register user',
		description:
			'Register user (validating the body of the request before calling the method to create a new user)',
		requiresUser: true,
		queryId: { required: false },
		body: {
			required: true,
			model: {
				type: 'object',
				properties: userCreateStructure,
			},
		},
		respondObject: {
			required: true,
			model: userSM,
			omit: ['password'],
		},
		invalidResponses: {
			'400': {
				description: 'Bad Request',
			},
			'409': {
				description: 'Conflict error - user already exists',
			},
		},
	}),
};

// Get a user
router.get('/', [requiresUser], getUserHandler);
export const usersGet = {
	...getSwaggerObject({
		CRUD: 'get',
		item: 'user',
		tag: 'users',
		summary: 'Get a user',
		description: "Get a user based on the user's mail",
		requiresUser: true,
		queryId: { required: true, id: 'userMail' },
		body: {
			required: false,
		},
		respondObject: {
			required: true,
			model: userSM,
			omit: ['password'],
		},
		invalidResponses: {
			'404': {
				description: 'User not found.',
			},
			'403': {
				description: 'User not logged in.',
			},
		},
	}),
};

// Checks if a user exists
router.get('/exists', [validateRequest(getUserSchema)], getUserExistsHandler);
export const usersExistsGet = {
	...getSwaggerObject({
		CRUD: 'get',
		item: 'user',
		tag: 'users',
		summary: 'Check if a user exists',
		description: 'Check if a user exists',
		requiresUser: false,
		queryId: { required: true, id: 'userMail' },
		body: {
			required: false,
		},
		respondObject: {
			required: false,
		},
		invalidResponses: {
			'400': {
				description: 'Bad Request',
			},
			'404': {
				description: 'User not found.',
			},
		},
	}),
};

// Update a user
router.put(
	'/',
	[requiresUser, validateRequest(updateUserSchema)],
	updateUserHandler
);
export const usersPut = {
	...getSwaggerObject({
		CRUD: 'put',
		item: 'user',
		tag: 'users',
		summary: 'Update a user',
		description: "Update a user based on the user's mail",
		requiresUser: true,
		queryId: { required: true, id: 'userMail' },
		body: {
			required: true,
			model: userSM,
			omit: ['password'],
		},
		respondObject: {
			required: true,
			model: userSM,
			omit: ['password'],
		},
		invalidResponses: {
			'400': {
				description: 'Bad Request',
			},
			'401': {
				description: "You can't update other users",
			},
			'403': {
				description: 'User not logged in',
			},
			'404': {
				description: 'User not found',
			},
			'409': {
				description: 'Other user already exists with that email',
			},
		},
	}),
};

// Delete a user
router.delete(
	'/',
	[requiresUser, validateRequest(deleteUserSchema)],
	deleteUserHandler
);
export const usersDelete = {
	...getSwaggerObject({
		CRUD: 'delete',
		item: 'user',
		tag: 'users',
		summary: 'Delete a user',
		description: "Delete a user based on the user's mail",
		requiresUser: true,
		queryId: { required: true, id: 'userMail' },
		body: {
			required: false,
		},
		respondObject: {
			required: false,
		},
		invalidResponses: {
			'400': {
				description: 'Bad Request',
			},
			'401': {
				description: "You can't delete other users",
			},
			'403': {
				description: 'User not logged in',
			},
			'404': {
				description: 'User not found.',
			},
		},
	}),
};

export default router;
