// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import {
	CreateStoreDto,
	UpdateStoreDto,
} from '../../../../libs/api-interfaces/src/index';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as pactum from 'pactum';
import { AppModule } from '../app.module';
import { PrismaService } from '../services/prisma/prisma.service';

describe('App e2e', () => {
	let app: INestApplication;
	let prisma: PrismaService;

	beforeAll(async () => {
		const moduleRef = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleRef.createNestApplication();
		app.useGlobalPipes(
			new ValidationPipe({
				whitelist: true,
			})
		);
		await app.init();
		await app.listen(3333);

		prisma = app.get(PrismaService);
		await prisma.cleanDb();
		pactum.request.setBaseUrl('http://localhost:3333');
	});

	afterAll(() => {
		app.close();
	});

	describe('Stores', () => {
		const remaDto: CreateStoreDto = {
			name: 'Rema 1000',
		};
		describe('Create store', () => {
			it('should create store', async () => {
				return pactum
					.spec()
					.post('/stores')
					.withBody(remaDto)
					.expectStatus(201)
					.stores('storeId', 'id');
			});

			it('should not create same store', async () => {
				return pactum
					.spec()
					.post('/stores')
					.withBody(remaDto)
					.expectStatus(403);
			});
		});

		describe('Get stores', () => {
			it('should get all stores', async () => {
				return pactum
					.spec()
					.get('/stores')
					.expectStatus(200)
					.expectJsonLike([remaDto]);
			});

			it('should get a specific store', async () => {
				return pactum
					.spec()
					.get('/stores/$S{storeId}')
					.expectStatus(200)
					.expectJsonLike({
						name: 'Rema 1000',
					});
			});

			it('should not get specific store that does not exist', async () => {
				return pactum.spec().get('/stores/10000').expectStatus(404);
			});

			it('should not get store with incorrect id', async () => {
				return pactum.spec().get('/stores/asdf').expectStatus(400);
			});
		});

		describe('Update store', () => {
			const dto: CreateStoreDto = {
				name: 'Meny',
			};
			const dto2: CreateStoreDto = {
				name: 'Fakta',
			};
			const uDto: UpdateStoreDto = {
				name: 'Aldi',
			};
			const uDto2: UpdateStoreDto = {
				name: 'Fakta',
			};
			it('should update store', async () => {
				return pactum
					.spec()
					.patch('/stores/$S{storeId}')
					.withBody(uDto)
					.expectStatus(200);
			});

			it('should not update store which does not exist', async () => {
				return pactum
					.spec()
					.patch('/stores/100000')
					.withBody(uDto2)
					.expectStatus(404);
			});

			it('should not update store with incorrect id', async () => {
				return pactum
					.spec()
					.patch('/stores/asdf')
					.withBody(uDto2)
					.expectStatus(400);
			});

			it('should not update store to store wich already exists', async () => {
				await pactum
					.spec()
					.post('/stores')
					.withBody(dto)
					.expectStatus(201)
					.stores('updateID', 'id');

				await pactum.spec().post('/stores').withBody(dto2);

				return pactum
					.spec()
					.patch('/stores/$S{updateID}')
					.withBody(uDto2)
					.expectStatus(403);
			});
		});
	});
});
