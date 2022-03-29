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
	Delete,
} from 'tsoa';
import express from 'express';
import { UserService } from '../services/user.service';
import { IUserResponse } from '../models/user.model';
import { OurSessionData } from '../app';
import { EmailPattern, PasswordPattern } from '../utils/patternTypes';
import Logger from '../config/Logger';
import { omit } from 'lodash';

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
			email: EmailPattern;
			password: PasswordPattern;
		}
	): Promise<OurSessionData> {
		const user = await new UserService().validatePassword(
			requestBody.email,
			requestBody.password
		);
		if (!user || user === undefined) {
			return notFoundResponse(404, { reason: 'User not found' });
		}

		req.session.user = user as IUserResponse; //THIS SETS AN OBJECT - 'USER'
		req.session.accessToken = req.session.user._id;
		req.session.refreshToken = 'someString';

		let error = '';
		req.session.save((err) => {
			if (err) {
				error = err.message;
				Logger.error(err);
			} else {
				return omit(req.session, 'user.password');
			}
		}); //THIS SAVES THE SESSION.

		if (!req.session.user) {
			return internalServerError(500, {
				reason: error,
			});
		} else {
			this.setStatus(201); // set return status 201
			return req.session;
		}
	}
	@SuccessResponse('201', 'resource created successfully')
	@Delete()
	public async deleteSession() {
		this.setStatus(200);
	}
}
