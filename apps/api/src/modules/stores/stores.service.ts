import { CreateStoreDto, UpdateStoreDto } from '@meal-time/api-interfaces';
import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from '../../services/prisma/prisma.service';
import { prismaErrorException } from '../../utils/prismaErrorHandler';
import { StoreExceptionMessages } from './stores.exceptionMessages';

@Injectable()
export class StoresService {
	constructor(private prisma: PrismaService) {}

	async create(createStoreDto: CreateStoreDto) {
		return this.prisma.stores
			.create({
				data: {
					...createStoreDto,
				},
			})
			.catch((error: PrismaClientKnownRequestError) => {
				throw prismaErrorException(error, StoreExceptionMessages);
			});
	}

	async findAll() {
		return this.prisma.stores
			.findMany({
				orderBy: {
					id: 'asc',
				},
			})
			.catch((error: PrismaClientKnownRequestError) => {
				throw prismaErrorException(error, StoreExceptionMessages);
			});
	}

	async findOne(id: number) {
		if (isNaN(id)) {
			throw new BadRequestException(StoreExceptionMessages.BAD_REQUEST);
		}
		const store = await this.prisma.stores
			.findUnique({
				where: {
					id: id,
				},
			})
			.catch((error: PrismaClientKnownRequestError) => {
				throw prismaErrorException(error, StoreExceptionMessages);
			});

		if (!store) throw new NotFoundException(StoreExceptionMessages.NOT_FOUND);
		return store;
	}

	async update(id: number, updateStoreDto: UpdateStoreDto) {
		if (isNaN(id)) {
			throw new BadRequestException(StoreExceptionMessages.BAD_REQUEST);
		}
		return this.prisma.stores
			.update({
				data: {
					...updateStoreDto,
				},
				where: {
					id: id,
				},
			})
			.catch((error: PrismaClientKnownRequestError) => {
				throw prismaErrorException(error, StoreExceptionMessages);
			});
	}

	async remove(id: number) {
		if (isNaN(id)) {
			throw new BadRequestException(StoreExceptionMessages.BAD_REQUEST);
		}
		const store = await this.prisma.stores
			.findUnique({
				where: {
					id,
				},
			})
			.catch((error: PrismaClientKnownRequestError) => {
				throw prismaErrorException(error, StoreExceptionMessages);
			});

		if (!store) throw new NotFoundException(StoreExceptionMessages.NOT_FOUND);

		return this.prisma.stores
			.delete({
				where: {
					id,
				},
			})
			.catch((error: PrismaClientKnownRequestError) => {
				throw prismaErrorException(error, StoreExceptionMessages);
			});
	}
}
