import { get } from 'lodash';
import { Request, Response, NextFunction } from 'express';
import { decode } from '../utils/jwt.utils';
import { reIssueAccessToken } from '../collections/session/session.service';

/**
 * This function handles the access and refresh token logic
 *
 * @param req - The request object.
 * @param res - The response object.
 * @returns next
 */
const deserializeUser = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	// get the token from the authorization header (that's where access tokens always are)
	const accessToken = get(req, 'headers.authorization', '').replace(
		/^Bearer\s/,
		''
	);

	// Get refresh token from our header (that's where our refresh token is)
	const refreshToken = get(req, 'headers.x-refresh');

	// If there's no access token, return next function
	if (!accessToken) return next();

	// If there is an access token, then we need to decode it to see if it's valid
	// (meaning if it has been used within the last 15 minutes)
	const { decoded, expired } = decode(accessToken);

	// If the token is valid, then we can continue and add the decoded token to the request
	if (decoded) {
		// @ts-ignore
		req.user = decoded;

		return next();
	}

	// If the token is not valid, but the refresh token is,
	// then we need to issue a new access token
	if (expired && refreshToken) {
		const newAccessToken = await reIssueAccessToken({ refreshToken });

		if (newAccessToken) {
			// Add the new access token to the response header
			res.setHeader('x-access-token', newAccessToken);

			// Decode the new access token and add it to the request
			const { decoded } = decode(newAccessToken);
			// @ts-ignore
			req.user = decoded;
		}

		return next();
	}

	return next();
};

export default deserializeUser;
