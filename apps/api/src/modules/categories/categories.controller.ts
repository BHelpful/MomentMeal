import {
	CreateCategoryDto,
	UpdateCategoryDto,
	CategoriesEntity,
} from '@meal-time/api-interfaces';
import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	ForbiddenException,
	InternalServerErrorException,
	NotFoundException,
	BadRequestException,
} from '@nestjs/common';
import {
	ApiTags,
	ApiOperation,
	ApiCreatedResponse,
	ApiResponse,
	ApiOkResponse,
} from '@nestjs/swagger';
import { CategoriesService } from './categories.service';
import { CATEGORIES_EXCEPTION_MSG } from './categories.exceptionMessages';

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
		description: CATEGORIES_EXCEPTION_MSG.ALREADY_EXISTS,
	})
	@ApiResponse({
		status: new InternalServerErrorException().getStatus(),
		description: CATEGORIES_EXCEPTION_MSG.INTERNAL_SERVER_ERROR,
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
		description: CATEGORIES_EXCEPTION_MSG.NOT_FOUND,
	})
	@ApiResponse({
		status: new BadRequestException().getStatus(),
		description: CATEGORIES_EXCEPTION_MSG.BAD_REQUEST,
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
		description: CATEGORIES_EXCEPTION_MSG.NOT_FOUND,
	})
	@ApiResponse({
		status: new ForbiddenException().getStatus(),
		description: CATEGORIES_EXCEPTION_MSG.ALREADY_EXISTS,
	})
	@ApiResponse({
		status: new BadRequestException().getStatus(),
		description: CATEGORIES_EXCEPTION_MSG.BAD_REQUEST,
	})
	@ApiResponse({
		status: new InternalServerErrorException().getStatus(),
		description: CATEGORIES_EXCEPTION_MSG.INTERNAL_SERVER_ERROR,
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
		description: CATEGORIES_EXCEPTION_MSG.NOT_FOUND,
	})
	@ApiResponse({
		status: new BadRequestException().getStatus(),
		description: CATEGORIES_EXCEPTION_MSG.BAD_REQUEST,
	})
	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.categoriesService.remove(+id);
	}
}
