import {
	Body,
	Controller,
	Delete,
	Get,
	Path,
	Post,
	Put,
	Res,
	Route,
	SuccessResponse,
	Tags,
	TsoaResponse,
} from 'tsoa';
import { IUserModel, IUserPost, IUserResponse } from '../models/user.model';
import { UserService } from '../services/user.service';
import { EmailPattern } from '../utils/patternTypes';

@Route('users')
@Tags('User')
export class UsersController extends Controller {
	@Get('exists/{userMail}')
	public async getUserExists(
		@Path() userMail: EmailPattern,
		@Res() notFoundResponse: TsoaResponse<404, { reason: string }>
	): Promise<IUserResponse> {
		const userService = new UserService();
		const user = await userService.findOne({ email: userMail });
		if (!user) {
			return notFoundResponse(404, { reason: 'User not found' });
		}
		return user;
	}
	
	@Get('{userId}')
	public async getUser(
		@Path() userId: string,
		@Res() notFoundResponse: TsoaResponse<404, { reason: string }>
	): Promise<IUserResponse> {
		const userService = new UserService();
		const user = await userService.getById(userId);
		if (!user) {
			return notFoundResponse(404, { reason: 'User not found' });
		}
		return user;
	}


	@SuccessResponse('201', 'resource created successfully')
	@Post()
	public async createUser(
		@Body() requestBody: IUserPost
	): Promise<IUserResponse> {
		this.setStatus(201); // set return status 201
		return new UserService().create(requestBody);
	}

	@SuccessResponse('200', 'resource updated successfully')
	@Put('{userId}')
	public async updateUser(
		@Path() userId: string,
		@Body() requestBody: IUserModel,
		@Res() notFoundResponse: TsoaResponse<404, { reason: string }>,
		@Res() internalServerError: TsoaResponse<500, { reason: string }>
	): Promise<IUserResponse> {
		const userService = new UserService();
		const user = await userService.getById(userId);
		if (!user) {
			return notFoundResponse(404, { reason: 'User not found' });
		}

		const updatedUser = await userService.update(userId, requestBody);
		if (!updatedUser) {
			return internalServerError(500, {
				reason: 'Failed to update user',
			});
		}

		return updatedUser;
	}

	@SuccessResponse('204', 'resource deleted successfully')
	@Delete('{userId}')
	public async deleteUser(
		@Path() userId: string,
		@Res() notFoundResponse: TsoaResponse<404, { reason: string }>,
		@Res() internalServerError: TsoaResponse<500, { reason: string }>
	): Promise<void> {
		const userService = new UserService();
		const user = await userService.getById(userId);
		if (!user) {
			return notFoundResponse(404, { reason: 'User not found' });
		}

		try {
			await userService.delete(userId);
		} catch (error) {
			return internalServerError(500, {
				reason: 'Failed to delete user',
			});
		}
	}
}
