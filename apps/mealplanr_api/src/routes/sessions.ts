import { Router } from 'express';
import { getSwaggerObject } from '.';
import {
	createUserSessionHandler,
	getUserSessionsHandler,
	invalidateUserSessionHandler,
} from '../collections/session/session.controller';
import { sessionSM } from '../collections/session/session.model';
import {
	createUserSessionSchema,
	sessionPostStructure,
} from '../collections/session/session.schema';
import { requiresUser, validateRequest } from '../middleware';

const router = Router();

// login
router.post(
	'/',
	[validateRequest(createUserSessionSchema)],
	createUserSessionHandler
);
export const sessionsPost = {
	...getSwaggerObject({
		CRUD: 'post',
		item: 'session',
		tag: 'sessions',
		summary: 'Log in',
		description: 'Create a new session for the user (thereby logging in)',
		requiresUser: true,
		queryId: { required: false },
		body: {
			required: true,
			model: {
				type: 'object',
				properties: sessionPostStructure,
			},
		},
		respondObject: {
			required: true,
			model: {
				type: 'object',
				properties: {
					accessToken: {
						type: 'string',
						example: 'JWT accessToken',
					},
					refreshToken: {
						type: 'string',
						example: 'JWT accessToken',
					},
				},
			},
		},
		invalidResponses: {
			'400': {
				description: 'Bad Request',
			},
			'401': {
				description: 'Invalid username or password',
			},
		},
	}),
};

// Get the user's valid sessions i.e. the sessions where the user is logged in.
router.get('/', [requiresUser], getUserSessionsHandler);
export const sessionsGet = {
	...getSwaggerObject({
		CRUD: 'get',
		item: 'session',
		tag: 'sessions',
		summary: 'Get all active sessions',
		description: 'Gets all the sessions that is still valid',
		requiresUser: true,
		queryId: { required: false },
		body: {
			required: false,
		},
		respondObject: {
			required: true,
			model: { type: 'array', items: sessionSM },
		},
		invalidResponses: {
			'403': {
				description: 'User not logged in',
			},
		},
	}),
};

// logout (invalidate a user's session)
router.delete('/', [requiresUser], invalidateUserSessionHandler);
export const sessionsDelete = {
	...getSwaggerObject({
		CRUD: 'delete',
		item: 'session',
		tag: 'sessions',
		summary: 'Logout',
		description:
			"Invalidate a user's session, which will in turn log the user out",
		requiresUser: true,
		queryId: { required: false },
		body: {
			required: false,
		},
		respondObject: {
			required: false,
		},
		invalidResponses: {
			'403': {
				description: 'User not logged in',
			},
		},
	}),
};

export default router;
