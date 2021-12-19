import { get } from 'lodash';
import { Request, Response } from 'express';
import {
	validatePassword,
	createSession,
	createAccessToken,
	updateSession,
	findSessions,
} from './session.service';
import { sign } from '../../utils/jwt.utils';

/**
 * This function is used to create a new session
 *
 * @param req - The request object.
 * @param res - The response object.
 * @returns a response with refresh & access token
 */
export async function createUserSessionHandler(req: Request, res: Response) {
	// validate the email and password
	const user = await validatePassword(req.body);

	if (!user) {
		return res.status(401).send('Invalid username or password');
	}

	// Create a session
	const session = await createSession(user._id, req.get('user-agent') || '');

	// create access token
	const accessToken = createAccessToken({
		user,
		session,
	});

	// create refresh token
	const refreshToken = sign(session, {
		expiresIn: process.env.REFRESH_TOKEN_TTL as string, // 1 year
	});

	// send refresh & access token back
	return res.send({ accessToken, refreshToken });
}

/**
 * This function invalidates the user's session and thereby logging them out
 *
 * @param req - The request object.
 * @param res - The response object.
 * @returns a response with refresh & access token
 */
export async function invalidateUserSessionHandler(
	req: Request,
	res: Response
) {
	// get the user's session from the request
	const sessionId = get(req, 'user.session');

	// update the session to be invalid
	await updateSession({ _id: sessionId }, { valid: false });

	// return a status of 200 because the user has been logged out successfully
	return res.sendStatus(200);
}

/**
 * This function is used to get all the sessions for a user
 *
 * @param req - The request object.
 * @param res - The response object.
 * @returns a response with the user's sessions
 */
export async function getUserSessionsHandler(req: Request, res: Response) {
	const userId = get(req, 'user._id');

	const sessions = await findSessions({ userId: userId, valid: true });

	return res.send(sessions);
}
