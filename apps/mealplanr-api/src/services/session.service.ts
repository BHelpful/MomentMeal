import {
	ISessionBackend,
	ISessionBackendResponse,
	ISessionDoc,
	Session,
} from '../models/session.model';
import { Service } from './Repository/Service';

import { LeanDocument } from 'mongoose';
import { get } from 'lodash';
import { IUserDoc } from '../models/user.model';
import { sign, decode } from '../utils/jwt.utils';
import { UserService } from './user.service';

export class SessionService extends Service<
	ISessionDoc,
	ISessionBackend,
	ISessionBackendResponse
> {
	public constructor() {
		super(Session);
	}

	public async populate(
		document: ISessionDoc
	): Promise<ISessionBackendResponse> {
		return document.populate('type');
	}

	/**
	 * Returns an access token for the given session if valid input.
	 *
	 * @param user - A UserDocument object either lean or not
	 * @param session - A SessionDocument object either lean or not
	 * @returns an accessToken or false if invalid
	 */
	public createAccessToken({
		user,
		session,
	}: {
		user: Omit<IUserDoc, 'password'> | LeanDocument<Omit<IUserDoc, 'password'>>;
		session:
			| Omit<ISessionDoc, 'password'>
			| LeanDocument<Omit<ISessionDoc, 'password'>>;
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
	public async reIssueAccessToken({ refreshToken }: { refreshToken: string }) {
		// Decode the refresh token
		const { decoded } = decode(refreshToken);

		// If the refresh token is invalid, return false
		if (!decoded || !get(decoded, '_id')) return false;

		// Get the session
		const session = await super.getById(get(decoded, '_id'));

		// Make sure the session is still valid
		if (!session || !session?.valid) return false;
		const user = await new UserService().getById(session.userId as string);

		if (!user) return false;

		return this.createAccessToken({ user, session });
	}
}
