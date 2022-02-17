import { Router } from 'express';
import {
	createUserSessionHandler,
	getUserSessionsHandler,
	invalidateUserSessionHandler,
} from '../collections/session/session.controller';
import {
	createUserSessionSchema,
} from '../collections/session/session.schema';
import { requiresUser, validateRequest } from '../middleware';

const sessions = Router();

// login
sessions.post(
	'/',
	[validateRequest(createUserSessionSchema)],
	createUserSessionHandler
);

// Get the user's valid sessions i.e. the sessions where the user is logged in.
sessions.get('/', [requiresUser], getUserSessionsHandler);

// logout (invalidate a user's session)
sessions.delete('/', [requiresUser], invalidateUserSessionHandler);

export default sessions;
