import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from '../services/prisma/prisma.service';
import { ExceptionMessages } from '../utils/exceptionMessages';
import { prismaErrorException } from '../utils/prismaErrorHandler';

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
}
