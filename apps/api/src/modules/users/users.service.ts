import { LoginUserDto } from '@meal-time/api-interfaces';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from '../../services/prisma/prisma.service';
import { ExceptionMessages } from '../../utils/exceptionMessages';
import { comparePasswords } from '../../utils/passwordUtils';
import { prismaErrorException } from '../../utils/prismaErrorHandler';

@Injectable()
export class UsersService {
	public userExceptionMessages = new ExceptionMessages('User');

	constructor(private readonly prisma: PrismaService) {}

	async findOne(findUniqueUserArgs: Prisma.UsersWhereUniqueInput) {
		return await this.prisma.users
			.findUnique({
				where: findUniqueUserArgs,
			})
			.catch((error: PrismaClientKnownRequestError) => {
				throw prismaErrorException(error, this.userExceptionMessages);
			});
	}

	async create(createUserArgs: Prisma.UsersCreateInput) {
		return await this.prisma.users
			.create({
				data: createUserArgs,
			})
			.catch((error: PrismaClientKnownRequestError) => {
				throw prismaErrorException(error, this.userExceptionMessages);
			});
	}

	async findByLogin({ email, password }: LoginUserDto) {
		const user = await this.prisma.users
			.findUnique({ where: { email } })
			.catch((error: PrismaClientKnownRequestError) => {
				throw prismaErrorException(error, this.userExceptionMessages);
			});

		if (!user) {
			throw new UnauthorizedException(
				this.userExceptionMessages.UNAUTHORIZED()
			);
		}

		// compare passwords
		const areEqual = await comparePasswords(user.password, password);

		if (!areEqual) {
			throw new UnauthorizedException(
				this.userExceptionMessages.UNAUTHORIZED()
			);
		}

		// strip password from user object
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { password: _, ...result } = user;

		return result;
	}
}
