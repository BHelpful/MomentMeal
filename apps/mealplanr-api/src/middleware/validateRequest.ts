import { AnySchema } from 'yup';
import { Request, Response, NextFunction } from 'express';
import log from '../logger';

// Acts as the middleware between a RESTful call and the execution of a command.
// It takes a validation schema, that the body should be validated against.
// Uppon validation the method will allow for the following method at its method-call
// to be called.
/**
 * This function
 *
 * @remarks
 *
 *
 * @param x -
 * @param y -
 * @returns
 */
const validate =
	(schema: AnySchema) =>
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			await schema.validate({
				body: req.body,
				query: req.query,
				params: req.params,
			});

			return next();
		} catch (e) {
			log.error(e);
			// sets status to 400 (Bad Request)
			return res.status(400).send(e.errors);
		}
	};

export default validate;
