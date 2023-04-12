// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import {
	CreateUserDto,
	LoginUserDto,
	UserEntity,
} from '../../../../libs/api-interfaces/src/index';
import {
	BadRequestException,
	Body,
	Controller,
	ForbiddenException,
	InternalServerErrorException,
	NotFoundException,
	Post,
} from '@nestjs/common';
import {
	ApiCreatedResponse,
	ApiOperation,
	ApiResponse,
	ApiTags,
} from '@nestjs/swagger';
import { ExceptionMessages } from '../utils/exceptionMessages';

import { AuthService } from './auth.service';

export const userExceptionMessages = new ExceptionMessages('User');

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@ApiOperation({
		summary: 'Register a new user',
		description: 'Register a new user',
	})
	@ApiCreatedResponse({ type: UserEntity })
	@ApiResponse({
		status: new ForbiddenException().getStatus(),
		description: userExceptionMessages.ALREADY_EXISTS(),
	})
	@ApiResponse({
		status: new InternalServerErrorException().getStatus(),
		description: userExceptionMessages.INTERNAL_SERVER_ERROR(),
	})
	@ApiResponse({
		status: new NotFoundException().getStatus(),
		description: userExceptionMessages.NOT_FOUND(),
	})
	@ApiResponse({
		status: new BadRequestException().getStatus(),
		description: userExceptionMessages.BAD_REQUEST(),
	})
	@Post('register')
	async register(@Body() createUserDto: CreateUserDto) {
		return this.authService.register(
			createUserDto.email,
			createUserDto.password
		);
	}

	@ApiOperation({
		summary: 'Login a user',
		description: 'Login a user',
	})
	@ApiCreatedResponse({ type: UserEntity })
	@ApiResponse({
		status: new ForbiddenException().getStatus(),
		description: userExceptionMessages.UNAUTHORIZED(),
	})
	@ApiResponse({
		status: new InternalServerErrorException().getStatus(),
		description: userExceptionMessages.INTERNAL_SERVER_ERROR(),
	})
	@ApiResponse({
		status: new NotFoundException().getStatus(),
		description: userExceptionMessages.NOT_FOUND(),
	})
	@ApiResponse({
		status: new BadRequestException().getStatus(),
		description: userExceptionMessages.BAD_REQUEST(),
	})
	@Post('login')
	public async login(@Body() loginUserDto: LoginUserDto) {
		return await this.authService.login(loginUserDto);
	}
}
