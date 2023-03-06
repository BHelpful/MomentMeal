import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../services/prisma/prisma.service';

@Injectable()
export class UsersService {
	constructor(private readonly prisma: PrismaService) {}

	findOne(findUniqueUserArgs: Prisma.UsersWhereUniqueInput) {
		return this.prisma.users.findUnique({
			where: findUniqueUserArgs,
		});
	}
}
