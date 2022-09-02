import { CreateStoreDto, UpdateStoreDto } from '@meal-time/api-interfaces';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../services/prisma/prisma.service';
import { StoresService } from './stores.service';

describe('StoresService', () => {
	let module: TestingModule;
	let service: StoresService;
	let prisma: PrismaService;
	beforeAll(async () => {
		module = await Test.createTestingModule({
			providers: [StoresService, PrismaService, ConfigService],
		}).compile();

		service = module.get<StoresService>(StoresService);
		prisma = module.get<PrismaService>(PrismaService);
	});

	beforeEach(async () => {
		await prisma.cleanDb();
	});

	it('should create store', async () => {
		const dto: CreateStoreDto = {
			name: 'Meny',
		};
		const store = await service.create(dto);

		if (store) {
			return expect(store.name).toEqual('Meny');
		}
	});

	it('should find all stores', async () => {
		const dto: CreateStoreDto = {
			name: 'Brugsen',
		};
		const dto2: CreateStoreDto = {
			name: 'Fakta',
		};
		const store1 = await prisma.stores.create({
			data: {
				...dto,
			},
		});
		const store2 = await prisma.stores.create({
			data: {
				...dto2,
			},
		});

		const allStores = [store1, store2];

		const stores = await service.findAll();

		return expect(stores).toEqual(allStores);
	});

	it('should find specific store', async () => {
		const dto: CreateStoreDto = {
			name: 'Brugsen',
		};
		const store = await prisma.stores.create({
			data: {
				...dto,
			},
		});
		const foundStore = await service.findOne(store.id);

		return expect(foundStore).toEqual(store);
	});

	it('should update store', async () => {
		const dto: CreateStoreDto = {
			name: 'Brugsen',
		};
		const store = await prisma.stores.create({
			data: {
				...dto,
			},
		});
		const udto: UpdateStoreDto = {
			name: 'Primark',
		};
		const updateStore = await service.update(store.id, udto);

		if (updateStore) {
			return expect(updateStore.name).toEqual('Primark');
		}
	});

	it('should remove store', async () => {
		const dto: CreateStoreDto = {
			name: 'Brugsen',
		};
		const dto2: CreateStoreDto = {
			name: 'Fakta',
		};
		await prisma.stores.create({
			data: {
				...dto,
			},
		});
		await prisma.stores.create({
			data: {
				...dto2,
			},
		});

		const stores = await prisma.stores.findMany({
			orderBy: {
				id: 'asc',
			},
		});
		const storeToRemove = stores.pop();
		await service.remove(storeToRemove.id);

		const storesAfterRemove = await prisma.stores.findMany({
			orderBy: {
				id: 'asc',
			},
		});

		return expect(storesAfterRemove).toEqual(stores);
	});
});
