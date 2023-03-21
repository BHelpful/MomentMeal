import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../services/prisma/prisma.service';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';

describe('CategoriesController', () => {
	let controller: CategoriesController;
	let prisma: PrismaService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [CategoriesController],
			providers: [CategoriesService, PrismaService, ConfigService],
		}).compile();

		controller = module.get<CategoriesController>(CategoriesController);
		prisma = module.get<PrismaService>(PrismaService);
		await prisma.cleanDb();
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
