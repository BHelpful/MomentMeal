import { Router } from 'express';
import {
	createUserHandler,
	deleteUserHandler,
	getUserExistsHandler,
	getUserHandler,
	updateUserHandler,
} from '../collections/user/user.controller';
import {
	createUserSchema,
	deleteUserSchema,
	getUserSchema,
	updateUserSchema,
} from '../collections/user/user.schema';
import { requiresUser, validateRequest } from '../middleware';

const users = Router();

// Create a new user
users.post('/', [validateRequest(createUserSchema)], createUserHandler);

// Get a user
users.get('/', [requiresUser], getUserHandler);

// Checks if a user exists
users.get('/exists', [validateRequest(getUserSchema)], getUserExistsHandler);

// Update a user
users.put(
	'/',
	[requiresUser, validateRequest(updateUserSchema)],
	updateUserHandler
);

// Delete a user
users.delete(
	'/',
	[requiresUser, validateRequest(deleteUserSchema)],
	deleteUserHandler
);

export default users;
