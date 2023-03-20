import {
	CreateCategoryDto,
	UpdateCategoryDto,
} from '@meal-time/api-interfaces';
import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { Categories, Prisma } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from '../../services/prisma/prisma.service';
import { ExceptionMessages } from '../../utils/exceptionMessages';
import { prismaErrorException } from '../../utils/prismaErrorHandler';
@Injectable()
export class CategoriesService {
	public categoriesExeptionMessages = new ExceptionMessages('Category');
	constructor(private prisma: PrismaService) {}

	async create(createCategoryDto: CreateCategoryDto) {
		return this.prisma.categories
			.create({
				data: {
					...createCategoryDto,
				},
			})
			.catch((error: PrismaClientKnownRequestError) => {
				throw prismaErrorException(error, this.categoriesExeptionMessages);
			});
	}

	async findAll() {
		return this.prisma.categories
			.findMany({
				orderBy: {
					id: 'asc',
				},
			})
			.catch((error: PrismaClientKnownRequestError) => {
				throw prismaErrorException(error, this.categoriesExeptionMessages);
			});
	}

	async findOne(id: number) {
		if (isNaN(id)) {
			throw new BadRequestException(
				this.categoriesExeptionMessages.BAD_REQUEST()
			);
		}
		const category = await this.findCategory(id);
		if (!category) {
			throw new NotFoundException(this.categoriesExeptionMessages.NOT_FOUND());
		}
		return this.findCategory(id);
	}

	private async findCategory(id: number) {
		return this.prisma.categories
			.findUnique({
				where: {
					id: id,
				},
			})
			.catch((error: PrismaClientKnownRequestError) => {
				throw prismaErrorException(error, this.categoriesExeptionMessages);
			});
	}

	async update(id: number, updateCategoryDto: UpdateCategoryDto) {
		return `This action updates a #${id} category`;
	}

	async remove(id: number) {
		return `This action removes a #${id} category`;
	}
}
