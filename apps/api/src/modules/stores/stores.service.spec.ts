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
		return expect(store.name).toEqual('Meny');
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
});
