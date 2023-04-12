// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import {
	CreateStoreDto,
	UpdateStoreDto,
} from '../../../../../libs/api-interfaces/src/index';
import {
	BadRequestException,
	Injectable,
	NotFoundException
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from '../../services/prisma/prisma.service';
import { ExceptionMessages } from '../../utils/exceptionMessages';
import { prismaErrorException } from '../../utils/prismaErrorHandler';

@Injectable()
export class StoresService {
	public storeExceptionMessages = new ExceptionMessages('Store');

	constructor(private prisma: PrismaService) {}

	async create(createStoreDto: CreateStoreDto) {
		return this.prisma.stores
			.create({
				data: {
					...createStoreDto,
				},
			})
			.catch((error: PrismaClientKnownRequestError) => {
				throw prismaErrorException(error, this.storeExceptionMessages);
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
				throw prismaErrorException(error, this.storeExceptionMessages);
			});
	}

	async findOne(id: number) {
		if (isNaN(id)) {
			throw new BadRequestException(this.storeExceptionMessages.BAD_REQUEST());
		}
		const store = await this.findStore(id);

		if (!store)
			throw new NotFoundException(this.storeExceptionMessages.NOT_FOUND());
		return store;
	}

	private async findStore(id: number) {
		return this.prisma.stores
			.findUnique({
				where: {
					id: id,
				},
			})
			.catch((error: PrismaClientKnownRequestError) => {
				throw prismaErrorException(error, this.storeExceptionMessages);
			});
	}

	async update(id: number, updateStoreDto: UpdateStoreDto) {
		if (isNaN(id)) {
			throw new BadRequestException(this.storeExceptionMessages.BAD_REQUEST());
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
				throw prismaErrorException(error, this.storeExceptionMessages);
			});
	}

	async remove(id: number) {
		const store = await this.findStore(id);

		if (!store)
			throw new NotFoundException(this.storeExceptionMessages.NOT_FOUND());

		return this.prisma.stores
			.delete({
				where: {
					id,
				},
			})
			.catch((error: PrismaClientKnownRequestError) => {
				throw prismaErrorException(error, this.storeExceptionMessages);
			});
	}
}
