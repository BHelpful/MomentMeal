import { CreateStoreDto, UpdateStoreDto } from '@meal-time/api-interfaces';
import {
	ForbiddenException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from '../../services/prisma/prisma.service';
import { STORES_EXCEPTION_MSG } from './stores.exceptionMessages';

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
				if (error.code === 'P2002') {
					throw new ForbiddenException(
						STORES_EXCEPTION_MSG.ALREADY_EXISTS
					);
				}
			});
	}

	async findAll() {
		const stores = await this.prisma.stores.findMany();
		// Sorting the array of stores in ascending order
		await stores.sort((a, b) => {
			if (a.id > b.id) {
				return 1;
			} else if (a.id < b.id) {
				return -1;
			}
			return 0;
		});
		return stores;
	}

	async findOne(id: number) {
		const store = await this.prisma.stores.findUnique({
			where: {
				id: id,
			},
		});

		if (!store) throw new NotFoundException(STORES_EXCEPTION_MSG.NOT_FOUND);
		return store;
	}

	async update(id: number, updateStoreDto: UpdateStoreDto) {
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
				if (error.code === 'P2001') {
					throw new NotFoundException(STORES_EXCEPTION_MSG.NOT_FOUND);
				}
			});
	}

	async remove(id: number) {
		const store = await this.prisma.stores.findUnique({
			where: {
				id,
			},
		});

		if (!store) throw new NotFoundException(STORES_EXCEPTION_MSG.NOT_FOUND);

		return this.prisma.stores.delete({
			where: {
				id,
			},
		});
	}
}
