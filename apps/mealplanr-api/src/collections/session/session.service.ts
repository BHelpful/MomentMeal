import { LeanDocument, FilterQuery, UpdateQuery } from 'mongoose';
import { get, omit } from 'lodash';
import userModel, { UserDocument } from '../user/user.model';
import sessionModel, { SessionDocument } from './session.model';
import { sign, decode } from '../../utils/jwt.utils';
import { findUser } from '../user/user.service';
const sanitize = require('mongo-sanitize');

/**
 * This function validates a password based on a unuiqe email.
 *
 * @remarks
 * Finds a user based on the unique email and uses the method
 * defined in the user model to check if the password is valid to the given user
 * The password will then be omitted from the user as to not allow for outside
 * access to the user's passwords.
 *
 * @param email - The user's email
 * @param  password - The user's password
 * @returns a UserDocument or false if the password is invalid
 */
export async function validatePassword({
	email,
	password,
}: {
	email: UserDocument['email'];
	password: string;
}) {
	email = sanitize(email);
	const user = await userModel.findOne({ email: email });

	if (!user) {
		return false;
	}

	password = sanitize(password);
	const isValid = await user.comparePassword(password);

	if (!isValid) {
		return false;
	}

	return omit(user.toJSON(), 'password');
}

/**
 * This function will create a new session for a user and return the session
 *
 * @remarks
 * The user agent is used to determine the device type. If PostMan is used
 * PostMan will be the user agent, if the device is a browser, the browser.
 * This is used to be able to log, where the reqiests are comming from.
 *
 * @param userId - The id of the user
 * @param userAgent - The user agent of the device
 * @returns a session document
 */
export async function createSession(userId: string, userAgent: string) {
	userId = sanitize(userId);
	const session = await sessionModel.create({ userId: userId, userAgent });

	return session.toJSON();
}

/**
 * Returns an access token for the given session if valid input.
 *
 * @param user - A UserDocument object either lean or not
 * @param session - A SessionDocument object either lean or not
 * @returns an accessToken or false if invalid
 */
export function createAccessToken({
	user,
	session,
}: {
	user:
		| Omit<UserDocument, 'password'>
		| LeanDocument<Omit<UserDocument, 'password'>>;
	session:
		| Omit<SessionDocument, 'password'>
		| LeanDocument<Omit<SessionDocument, 'password'>>;
}) {
	// Build and return the new access token
	return sign(
		{ ...user, session: session._id },
		{
			expiresIn: process.env.ACCESS_TOKEN_TTL as string,
		} // 15 minutes
	);
}

/**
 * This function reissue a new access token for the given session based on the
 * validity of the refresh token.
 *
 * @param refreshToken - The refresh token of the user's session
 * @returns a new access token
 */
export async function reIssueAccessToken({
	refreshToken,
}: {
	refreshToken: string;
}) {
	// Decode the refresh token
	const { decoded } = decode(refreshToken);

	// If the refresh token is invalid, return false
	if (!decoded || !get(decoded, '_id')) return false;

	// Get the session
	const session = await sessionModel.findById(get(decoded, '_id'));

	// Make sure the session is still valid
	if (!session || !session?.valid) return false;

	const user = await findUser({ _id: session.userId });

	if (!user) return false;

	return createAccessToken({ user, session });
}

/**
 * This function uses mongoose to find a session from the DB based on a querry
 * updates it based on the input and returns the updated session.
 *
 * @param querry - a query object that will be used to find a session from the DB
 * @param update - a query object that will be used to specify the update
 * @returns the updated session
 */
export async function updateSession(
	query: FilterQuery<SessionDocument>,
	update: UpdateQuery<SessionDocument>
) {
	try {
		query = sanitize(query);
		return await sessionModel.updateOne(query, update);
	} catch (error) {
		throw new Error(error as string);
	}
}

/**
 * This function uses mongoose to find sessions from the DB based on a querry
 *
 * @param querry - a query object that will be used to find a session from the DB
 * @returns the sessions matching the querry
 */
export async function findSessions(query: FilterQuery<SessionDocument>) {
	try {
		query = sanitize(query);
		return await sessionModel.find(query).lean();
	} catch (error) {
		throw new Error(error as string);
	}
}
