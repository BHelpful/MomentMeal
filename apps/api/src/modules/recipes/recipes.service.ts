// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import {
	CreateRecipeDto,
	UpdateRecipeDto,
} from '../../../../../libs/api-interfaces/src/index';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RecipesService {
  create(createRecipeDto: CreateRecipeDto) {
    return 'This action adds a new recipe';
  }

  findAll() {
    return `This action returns all recipes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} recipe`;
  }

  update(id: number, updateRecipeDto: UpdateRecipeDto) {
    return `This action updates a #${id} recipe`;
  }

  remove(id: number) {
    return `This action removes a #${id} recipe`;
  }
}
