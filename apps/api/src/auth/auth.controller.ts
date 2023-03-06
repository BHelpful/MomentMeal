import { CreateUserDto, UserEntity } from '@meal-time/api-interfaces';
import {
	BadRequestException,
	Body,
	Controller,
	ForbiddenException,
	InternalServerErrorException,
	NotFoundException,
	Post,
	Request,
	Response,
	UseGuards,
} from '@nestjs/common';
import {
	ApiCreatedResponse,
	ApiOperation,
	ApiResponse,
	ApiTags,
} from '@nestjs/swagger';
import { ExceptionMessages } from '../utils/exceptionMessages';

import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

export const userExceptionMessages = new ExceptionMessages('User');

@ApiTags('Users')
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

	@UseGuards(LocalAuthGuard)
	@Post('login')
	async login(@Request() req, @Response() res) {
		try {
			const accessToken = this.authService.login(req.user);
			return res.status(200).json(accessToken);
		} catch (err) {
			return res.status(403);
		}
  }
  
  
}
