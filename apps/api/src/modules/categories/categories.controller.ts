import {
	CategoriesEntity,
	CreateCategoryDto,
	UpdateCategoryDto,
} from '@meal-time/api-interfaces';
import {
	BadRequestException,
	Body,
	Controller,
	Delete,
	ForbiddenException,
	Get,
	InternalServerErrorException,
	NotFoundException,
	Param,
	Patch,
	Post,
} from '@nestjs/common';
import {
	ApiCreatedResponse,
	ApiOkResponse,
	ApiOperation,
	ApiResponse,
	ApiTags,
} from '@nestjs/swagger';
import { ExceptionMessages } from '../../utils/exceptionMessages';
import { CategoriesService } from './categories.service';

export const categoriesExceptionMessages = new ExceptionMessages('Category');
@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
	constructor(private readonly categoriesService: CategoriesService) {}

	@ApiOperation({
		summary: 'Create a new category',
		description: 'Create a new category',
	})
	@ApiCreatedResponse({ type: CategoriesEntity })
	@ApiResponse({
		status: new ForbiddenException().getStatus(),
		description: categoriesExceptionMessages.ALREADY_EXISTS(),
	})
	@ApiResponse({
		status: new InternalServerErrorException().getStatus(),
		description: categoriesExceptionMessages.INTERNAL_SERVER_ERROR(),
	})
	@Post()
	create(@Body() createCategoryDto: CreateCategoryDto) {
		return this.categoriesService.create(createCategoryDto);
	}

	@ApiOperation({
		summary: 'Get all categories',
		description: 'Get all categories',
	})
	@ApiOkResponse({ type: CategoriesEntity })
	@Get()
	findAll() {
		return this.categoriesService.findAll();
	}

	@ApiOperation({
		summary: 'Find a category by id',
		description: 'Find a category by a specific id',
	})
	@ApiOkResponse({ type: CategoriesEntity })
	@ApiResponse({
		status: new NotFoundException().getStatus(),
		description: categoriesExceptionMessages.NOT_FOUND(),
	})
	@ApiResponse({
		status: new BadRequestException().getStatus(),
		description: categoriesExceptionMessages.BAD_REQUEST(),
	})
	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.categoriesService.findOne(+id);
	}

	@ApiOperation({
		summary: 'Update a category by id',
		description: 'Update a category by a specific id',
	})
	@ApiOkResponse({ type: CategoriesEntity })
	@ApiResponse({
		status: new NotFoundException().getStatus(),
		description: categoriesExceptionMessages.NOT_FOUND(),
	})
	@ApiResponse({
		status: new ForbiddenException().getStatus(),
		description: categoriesExceptionMessages.ALREADY_EXISTS(),
	})
	@ApiResponse({
		status: new BadRequestException().getStatus(),
		description: categoriesExceptionMessages.BAD_REQUEST(),
	})
	@ApiResponse({
		status: new InternalServerErrorException().getStatus(),
		description: categoriesExceptionMessages.INTERNAL_SERVER_ERROR(),
	})
	@Patch(':id')
	update(
		@Param('id') id: string,
		@Body() updateCategoryDto: UpdateCategoryDto
	) {
		return this.categoriesService.update(+id, updateCategoryDto);
	}

	@ApiOperation({
		summary: 'Delete a category by id',
		description: 'Delete a category by a specific id',
	})
	@ApiOkResponse({ type: CategoriesEntity })
	@ApiResponse({
		status: new NotFoundException().getStatus(),
		description: categoriesExceptionMessages.NOT_FOUND(),
	})
	@ApiResponse({
		status: new BadRequestException().getStatus(),
		description: categoriesExceptionMessages.BAD_REQUEST(),
	})
	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.categoriesService.remove(+id);
	}
}
