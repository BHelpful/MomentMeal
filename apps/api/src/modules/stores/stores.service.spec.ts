import { CreateStoreDto, UpdateStoreDto } from '@meal-time/api-interfaces';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../services/prisma/prisma.service';
import { StoresService } from './stores.service';
import { STORES_EXCEPTION_MSG } from './stores.exceptionMessages';

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
		await prisma.cleanDb();
	});

	beforeEach(async () => {
		await prisma.cleanDb();
	});

	it('should create store', async () => {
		const dto: CreateStoreDto = {
			name: 'Meny',
		};

		const store = await service.create(dto);
		return expect(store.name).toEqual('Meny');
	});

	it('should not create store that already exists', async () => {
		const dto: CreateStoreDto = {
			name: 'Meny',
		};
		const dto2: CreateStoreDto = {
			name: 'Meny',
		};
		await service.create(dto);

		return expect(async () => {
			await service.create(dto2);
		}).rejects.toThrow(STORES_EXCEPTION_MSG.ALREADY_EXISTS);
	});

	it('should find all stores', async () => {
		const dto: CreateStoreDto = {
			name: 'Brugsen',
		};
		const dto2: CreateStoreDto = {
			name: 'Fakta',
		};

		const store1 = await service.create(dto);
		const store2 = await service.create(dto2);

		const allStores = [store1, store2];

		const stores = await service.findAll();
		return expect(stores).toEqual(allStores);
	});

	it('should find specific store', async () => {
		const dto: CreateStoreDto = {
			name: 'Brugsen',
		};

		const store = await service.create(dto);

		const foundStore = await service.findOne(store.id);
		return expect(foundStore).toEqual(store);
	});

	it('should not find store that does not exist', async () => {
		return expect(async () => {
			await service.findOne(10000);
		}).rejects.toThrow(STORES_EXCEPTION_MSG.NOT_FOUND);
	});

	it('should update store', async () => {
		const dto: CreateStoreDto = {
			name: 'Brugsen',
		};

		const store = await service.create(dto);

		const udto: UpdateStoreDto = {
			name: 'Primark',
		};

		const updatedStore = await service.update(store.id, udto);
		return expect(updatedStore.name).toEqual('Primark');
	});

	it('should not update store to store that already exists', async () => {
		const dto: CreateStoreDto = {
			name: 'Brugsen',
		};
		const dto2: CreateStoreDto = {
			name: 'Fakta',
		};

		const store = await service.create(dto);
		await service.create(dto2);

		const udto: UpdateStoreDto = {
			name: 'Fakta',
		};

		return expect(async () => {
			await service.update(store.id, udto);
		}).rejects.toThrow(STORES_EXCEPTION_MSG.ALREADY_EXISTS);
	});

	it('should not update store that does not exist', async () => {
		const udto: UpdateStoreDto = {
			name: 'Fakta',
		};
		return expect(async () => {
			await service.update(10000, udto);
		}).rejects.toThrow(STORES_EXCEPTION_MSG.NOT_FOUND);
	});

	it('should remove store', async () => {
		const dto: CreateStoreDto = {
			name: 'Brugsen',
		};
		const dto2: CreateStoreDto = {
			name: 'Fakta',
		};

		await service.create(dto);
		await service.create(dto2);

		const stores = await service.findAll();
		const storeToRemove = stores.pop();

		await service.remove(storeToRemove.id);

		const storesAfterRemove = await service.findAll();
		return expect(storesAfterRemove).toEqual(stores);
	});

	it('should not remove store that does not exist', async () => {
		return expect(async () => {
			await service.remove(10000);
		}).rejects.toThrow(STORES_EXCEPTION_MSG.NOT_FOUND);
	});
});
