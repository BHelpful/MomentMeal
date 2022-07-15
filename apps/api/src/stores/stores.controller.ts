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
import { CreateStoreDto, ResponseStoreDto, UpdateStoreDto } from '@meal-time/api-interfaces';

@ApiTags('Stores')
@Controller('stores')
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

  @ApiOperation({
    summary: 'Retrieve all teams',
    description: 'Test',
  })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: ResponseStoreDto,
  })
  @Post()
  create(@Body() createStoreDto: CreateStoreDto): string {
    return this.storesService.create(createStoreDto);
  }

  @Get()
  findAll() {
    return this.storesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.storesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStoreDto: UpdateStoreDto) {
    return this.storesService.update(+id, updateStoreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.storesService.remove(+id);
  }
}
