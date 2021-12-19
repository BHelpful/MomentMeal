import { get } from 'lodash';
import { Request, Response, NextFunction } from 'express';

/**
 * This function is middleware used to check if there is a user
 *
 * @remarks
 * The usecase is to check if a user is logged in before
 * e.g. running the seqence to log the user out.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @returns next function
 */
const requiresUser = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const user = get(req, 'user');

	if (!user) {
		return res.status(403).send('User not logged in.');
	}

	return next();
};

export default requiresUser;
