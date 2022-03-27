import {
	Body,
	Controller,
	Post,
	Res,
	Route,
	SuccessResponse,
	Tags,
	TsoaResponse,
	Request,
} from 'tsoa';
import express from 'express';
import { UserService } from '../services/user.service';
import { IUserBackendResponse } from '../models/user.model';
import { SessionData } from 'express-session';

@Route('sessions')
@Tags('Session')
export class SessionsController extends Controller {
	@SuccessResponse('201', 'resource created successfully')
	@Post()
	public async createSession(
		@Request() req: express.Request,
		@Res() internalServerError: TsoaResponse<500, { reason: string }>,
		@Res() notFoundResponse: TsoaResponse<404, { reason: string }>,
		@Body()
		requestBody: {
			email: string;
			password: string;
		}
	): Promise<SessionData> {
		const user = await new UserService().validatePassword(
			requestBody.email,
			requestBody.password
		);
		if (!user || user === undefined) {
			return notFoundResponse(404, { reason: 'User not found' });
		}

		req.session.user = user as IUserBackendResponse; //THIS SETS AN OBJECT - 'USER'
		const session = req.session.save((err) => {
			if (err) {
				session.err = err;
			} else {
				return req.session.user;
			}
		}); //THIS SAVES THE SESSION.

		req.session.sessionId = session.id;

		if (!session.user) {
			return internalServerError(500, {
				reason: session.err as string,
			});
		} else {
			this.setStatus(201); // set return status 201
			return session;
		}
	}
}
