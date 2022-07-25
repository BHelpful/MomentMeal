import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { StoresService } from './stores.service';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  CreateStoreDto,
  StoreEntity,
  UpdateStoreDto,
} from '@meal-time/api-interfaces';
import { STORES_EXCEPTION_MSG } from './stores.exceptionMessages';

@ApiTags('Stores')
@Controller('stores')
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

  @ApiOperation({
    summary: 'Create a new store',
    description: 'Test',
  })
  @ApiCreatedResponse({ type: StoreEntity })
  @ApiResponse({
    status: new ForbiddenException().getStatus(),
    description: STORES_EXCEPTION_MSG.ALREADY_EXISTS,
  })
  @Post()
  create(@Body() createStoreDto: CreateStoreDto) {
    return this.storesService.create(createStoreDto);
  }

  @ApiOperation({
    summary: 'Get all stores',
    description: 'Test',
  })
  @ApiOkResponse({ type: StoreEntity, isArray: true })
  @Get()
  findAll() {
    return this.storesService.findAll();
  }

  @ApiOperation({
    summary: 'Find a store by id',
    description: 'Test',
  })
  @ApiOkResponse({ type: StoreEntity })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.storesService.findOne(+id);
  }

  @ApiOperation({
    summary: 'Update a store by id',
    description: 'Test',
  })
  @ApiOkResponse({ type: StoreEntity })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStoreDto: UpdateStoreDto) {
    return this.storesService.update(+id, updateStoreDto);
  }

  @ApiOperation({
    summary: 'Delete a store by id',
    description: 'Test',
  })
  @ApiOkResponse({ type: StoreEntity })
  @ApiResponse({
    status: new NotFoundException().getStatus(),
    description: STORES_EXCEPTION_MSG.NOT_FOUND,
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.storesService.remove(+id);
  }
}
