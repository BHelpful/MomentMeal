import jwt from 'jsonwebtoken';

const privateKey = process.env.PRIVATE_KEY as string;

/**
 * This function is used to generate a JWT token.
 *
 * @remarks
 * Uses the private key from the config file.
 *
 * @param object - an object
 * @param options - a set of options from the JWT library (SignOptions)
 * @returns a JWT token
 */
export function sign(object: Object, options?: jwt.SignOptions | undefined) {
	return jwt.sign(object, privateKey, options);
}

/**
 * This function is used to verify a JWT token.
 *
 * @remarks
 * This function acts as a wrapper for the JWT verify function.
 *
 * @param token - a JWT token
 * @returns an object with information about the verification status of the token
 */
export function decode(token: string) {
	try {
		// tries to decode the token
		const decoded = jwt.verify(token, privateKey);

		// if the token is valid, returns the decoded object
		return { valid: true, expired: false, decoded };
	} catch (error: any) {
		// if the token is invalid, returns with a null object
		return {
			valid: false,
			// if the token is expired, returns with a true value
			expired: error.message === 'jwt expired',
			decoded: null,
		};
	}
}
