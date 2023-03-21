import { CreateCategoryDto } from '@meal-time/api-interfaces';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../services/prisma/prisma.service';
import { CategoriesService } from './categories.service';

describe('CategoriesService', () => {
	let service: CategoriesService;
	let prisma: PrismaService;
	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [CategoriesService, PrismaService, ConfigService],
		}).compile();

		service = module.get<CategoriesService>(CategoriesService);
		prisma = module.get<PrismaService>(PrismaService);
		await prisma.cleanDb();
	});

	beforeEach(async () => {
		await prisma.cleanDb();
	});

	it('should create category', async () => {
		const dto: CreateCategoryDto = {
			name: 'Paprika',
			type: ['Spicy', 'Powder'],
		};

		const category = await service.create(dto);
		return expect(category.name).toEqual('Paprika');
	});
});
