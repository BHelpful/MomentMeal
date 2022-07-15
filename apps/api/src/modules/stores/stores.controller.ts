import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StoresService } from './stores.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  CreateStoreDto,
  ResponseStoreDto,
  UpdateStoreDto,
} from '@meal-time/api-interfaces';

@ApiTags('Stores')
@Controller('stores')
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

  @ApiOperation({
    summary: 'Create a new store',
    description: 'Test',
  })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully created.',
    type: ResponseStoreDto,
  })
  @Post()
  create(@Body() createStoreDto: CreateStoreDto): string {
    return this.storesService.create(createStoreDto);
  }

  @ApiOperation({
    summary: 'Get all stores',
    description: 'Test',
  })
  @ApiResponse({
    status: 200,
    description: 'Response object containing all records',
    type: [ResponseStoreDto],
  })
  @Get()
  findAll() {
    return this.storesService.findAll();
  }

  @ApiOperation({
    summary: 'Find a store by id',
    description: 'Test',
  })
  @ApiResponse({
    status: 200,
    description: 'Response object containing the record',
    type: ResponseStoreDto,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.storesService.findOne(+id);
  }

  @ApiOperation({
    summary: 'Update a store by id',
    description: 'Test',
  })
  @ApiResponse({
    status: 200,
    description: 'Response object containing the updated record',
    type: ResponseStoreDto,
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStoreDto: UpdateStoreDto) {
    return this.storesService.update(+id, updateStoreDto);
  }

  @ApiOperation({
    summary: 'Delete a store by id',
    description: 'Test',
  })
  @ApiResponse({
    status: 201,
    description: 'Store deleted successfully',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.storesService.remove(+id);
  }
}
