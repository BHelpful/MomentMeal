import { ApiTags } from '@nestjs/swagger';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { CreateRecipeDto, UpdateRecipeDto } from '@meal-time/api-interfaces';

@ApiTags('Recipes')
@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Post('/private')
  privateCreate(@Body() createRecipeDto: CreateRecipeDto) {
    return this.recipesService.create(createRecipeDto);
  }

  @Get('/private')
  privateFindAll() {
    return this.recipesService.findAll();
  }

  @Get('/private/:id')
  privateFindOne(@Param('id') id: string) {
    return this.recipesService.findOne(+id);
  }

  @Patch('/private/:id')
  privateUpdate(
    @Param('id') id: string,
    @Body() updateRecipeDto: UpdateRecipeDto
  ) {
    return this.recipesService.update(+id, updateRecipeDto);
  }

  @Delete('/private/:id')
  privateRemove(@Param('id') id: string) {
    return this.recipesService.remove(+id);
  }

  @Post('/public')
  publicCreate(@Body() createRecipeDto: CreateRecipeDto) {
    return this.recipesService.create(createRecipeDto);
  }

  @Get('/public')
  publicFindAll() {
    return this.recipesService.findAll();
  }

  @Get('/public/:id')
  publicFindOne(@Param('id') id: string) {
    return this.recipesService.findOne(+id);
  }

  @Patch('/public/:id')
  publicUpdate(
    @Param('id') id: string,
    @Body() updateRecipeDto: UpdateRecipeDto
  ) {
    return this.recipesService.update(+id, updateRecipeDto);
  }

  @Delete('/public/:id')
  publicRemove(@Param('id') id: string) {
    return this.recipesService.remove(+id);
  }
}
