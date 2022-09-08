import {
	CreateStoreDto,
	StoreEntity,
	UpdateStoreDto,
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
import { StoreExceptionMessages } from './stores.exceptionMessages';
import { StoresService } from './stores.service';

@ApiTags('Stores')
@Controller('stores')
export class StoresController {
	constructor(private readonly storesService: StoresService) {}

	@ApiOperation({
		summary: 'Create a new store',
		description: 'Create a new store',
	})
	@ApiCreatedResponse({ type: StoreEntity })
	@ApiResponse({
		status: new ForbiddenException().getStatus(),
		description: StoreExceptionMessages.ALREADY_EXISTS,
	})
	@ApiResponse({
		status: new InternalServerErrorException().getStatus(),
		description: StoreExceptionMessages.INTERNAL_SERVER_ERROR,
	})
	@Post()
	create(@Body() createStoreDto: CreateStoreDto) {
		return this.storesService.create(createStoreDto);
	}

	@ApiOperation({
		summary: 'Get all stores',
		description: 'Get all stores, sorted in ascending order.',
	})
	@ApiOkResponse({ type: StoreEntity, isArray: true })
	@Get()
	findAll() {
		return this.storesService.findAll();
	}

	@ApiOperation({
		summary: 'Find a store by id',
		description: 'Find a store by a specific id.',
	})
	@ApiOkResponse({ type: StoreEntity })
	@ApiResponse({
		status: new NotFoundException().getStatus(),
		description: StoreExceptionMessages.NOT_FOUND,
	})
	@ApiResponse({
		status: new BadRequestException().getStatus(),
		description: StoreExceptionMessages.BAD_REQUEST,
	})
	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.storesService.findOne(+id);
	}

	@ApiOperation({
		summary: 'Update a store by id',
		description: 'Update a store by a specific id.',
	})
	@ApiOkResponse({ type: StoreEntity })
	@ApiResponse({
		status: new NotFoundException().getStatus(),
		description: StoreExceptionMessages.NOT_FOUND,
	})
	@ApiResponse({
		status: new ForbiddenException().getStatus(),
		description: StoreExceptionMessages.ALREADY_EXISTS,
	})
	@ApiResponse({
		status: new InternalServerErrorException().getStatus(),
		description: StoreExceptionMessages.INTERNAL_SERVER_ERROR,
	})
	@ApiResponse({
		status: new BadRequestException().getStatus(),
		description: StoreExceptionMessages.BAD_REQUEST,
	})
	@Patch(':id')
	update(@Param('id') id: string, @Body() updateStoreDto: UpdateStoreDto) {
		return this.storesService.update(+id, updateStoreDto);
	}

	@ApiOperation({
		summary: 'Delete a store by id',
		description: 'Delete a store by a specific id.',
	})
	@ApiOkResponse({ type: StoreEntity })
	@ApiResponse({
		status: new NotFoundException().getStatus(),
		description: StoreExceptionMessages.NOT_FOUND,
	})
	@ApiResponse({
		status: new BadRequestException().getStatus(),
		description: StoreExceptionMessages.BAD_REQUEST,
	})
	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.storesService.remove(+id);
	}
}
