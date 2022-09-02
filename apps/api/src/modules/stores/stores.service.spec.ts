import { CreateStoreDto, UpdateStoreDto } from '@meal-time/api-interfaces';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { Stores } from '@prisma/client';
import { PrismaService } from '../../services/prisma/prisma.service';
import { StoresService } from './stores.service';

describe('StoresService', () => {
	let service: StoresService;
	let prisma: PrismaService;
	let store1: Stores;
	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [StoresService, PrismaService, ConfigService],
		}).compile();

		service = module.get<StoresService>(StoresService);
		prisma = module.get<PrismaService>(PrismaService);
		await prisma.cleanDb();

		const dto: CreateStoreDto = {
			name: 'Brugsen',
		};
		const dto1: CreateStoreDto = {
			name: 'Fakta',
		};

		store1 = await prisma.stores.create({
			data: {
				...dto,
			},
		});
		await prisma.stores.create({
			data: {
				...dto1,
			},
		});
	});

	it('should create store', async () => {
		const dto: CreateStoreDto = {
			name: 'Meny',
		};
		const store = await service.create(dto);
		return expect(store).toHaveProperty('name');
	});

	it('should find all stores', async () => {
		const prismaStores = await prisma.stores.findMany();
		prismaStores.sort((a, b) => {
			if (a.id > b.id) {
				return 1;
			} else if (a.id < b.id) {
				return -1;
			}
			return 0;
		});

		const stores = await service.findAll();

		return expect(stores).toEqual(prismaStores);
	});

	it('should find specific store', async () => {
		const foundStore = await service.findOne(store1.id);

		return expect(foundStore).toEqual(store1);
	});

	it('should update store', async () => {
		const udto: UpdateStoreDto = {
			name: 'Primark',
		};
		const updateStore = await service.update(store1.id, udto);
		if (updateStore) {
			return expect(updateStore.name).toEqual('Primark');
		}
		return false;
	});

	it('should remove store', async () => {
		const stores = await prisma.stores.findMany();
		stores.sort((a, b) => {
			if (a.id > b.id) {
				return 1;
			} else if (a.id < b.id) {
				return -1;
			}
			return 0;
		});

		const storeToRemove = stores.pop();
		await service.remove(storeToRemove.id);

		const storesAfterRemove = await prisma.stores.findMany();
		storesAfterRemove.sort((a, b) => {
			if (a.id > b.id) {
				return 1;
			} else if (a.id < b.id) {
				return -1;
			}
			return 0;
		});

		return expect(storesAfterRemove).toEqual(stores);
	});
});
