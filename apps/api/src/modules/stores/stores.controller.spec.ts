import { CreateStoreDto, UpdateStoreDto } from '@meal-time/api-interfaces';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../services/prisma/prisma.service';
import { storeExceptionMessages, StoresController } from './stores.controller';
import { StoresService } from './stores.service';

describe('StoresController', () => {
	let controller: StoresController;
	let prisma: PrismaService;

	beforeAll(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [StoresController],
			providers: [StoresService, PrismaService, ConfigService],
		}).compile();
		controller = module.get<StoresController>(StoresController);
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

		const store = await controller.create(dto);
		return expect(store.name).toEqual('Meny');
	});

	it('should not create store that already exists', async () => {
		const dto: CreateStoreDto = {
			name: 'Meny',
		};
		const dto2: CreateStoreDto = {
			name: 'Meny',
		};
		await controller.create(dto);

		return expect(async () => {
			await controller.create(dto2);
		}).rejects.toThrow(storeExceptionMessages.ALREADY_EXISTS());
	});

	it('should find all stores', async () => {
		const dto: CreateStoreDto = {
			name: 'Brugsen',
		};
		const dto2: CreateStoreDto = {
			name: 'Fakta',
		};

		const store1 = await controller.create(dto);
		const store2 = await controller.create(dto2);

		const allStores = [store1, store2];

		const stores = await controller.findAll();
		return expect(stores).toEqual(allStores);
	});

	it('should find specific store', async () => {
		const dto: CreateStoreDto = {
			name: 'Brugsen',
		};

		const store = await controller.create(dto);

		const foundStore = await controller.findOne(store.id.toString());
		return expect(foundStore).toEqual(store);
	});

	it('should not find store that does not exist', async () => {
		return expect(async () => {
			await controller.findOne('10000');
		}).rejects.toThrow(storeExceptionMessages.NOT_FOUND());
	});

	it('should update store', async () => {
		const dto: CreateStoreDto = {
			name: 'Brugsen',
		};

		const store = await controller.create(dto);

		const udto: UpdateStoreDto = {
			name: 'Primark',
		};

		const updatedStore = await controller.update(store.id.toString(), udto);
		return expect(updatedStore.name).toEqual('Primark');
	});

	it('should not update store to store that already exists', async () => {
		const dto: CreateStoreDto = {
			name: 'Brugsen',
		};
		const dto2: CreateStoreDto = {
			name: 'Fakta',
		};

		const store = await controller.create(dto);
		await controller.create(dto2);

		const udto: UpdateStoreDto = {
			name: 'Fakta',
		};

		return expect(async () => {
			await controller.update(store.id.toString(), udto);
		}).rejects.toThrow(storeExceptionMessages.ALREADY_EXISTS());
	});

	it('should not update store that does not exist', async () => {
		const udto: UpdateStoreDto = {
			name: 'Fakta',
		};
		return expect(async () => {
			await controller.update('10000', udto);
		}).rejects.toThrow(storeExceptionMessages.NOT_FOUND());
	});

	it('should remove store', async () => {
		const dto: CreateStoreDto = {
			name: 'Brugsen',
		};
		const dto2: CreateStoreDto = {
			name: 'Fakta',
		};

		await controller.create(dto);
		await controller.create(dto2);

		const stores = await controller.findAll();
		const storeToRemove = stores.pop();

		await controller.remove(storeToRemove.id.toString());

		const storesAfterRemove = await controller.findAll();
		return expect(storesAfterRemove).toEqual(stores);
	});

	it('should not remove store that does not exist', async () => {
		return expect(async () => {
			await controller.remove('10000');
		}).rejects.toThrow(storeExceptionMessages.NOT_FOUND());
	});
});
