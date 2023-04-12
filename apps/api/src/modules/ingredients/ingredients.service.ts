// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import {
	CreateIngredientDto,
	UpdateIngredientDto,
} from '../../../../../libs/api-interfaces/src/index';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IngredientsService {
  create(createIngredientDto: CreateIngredientDto) {
    return 'This action adds a new ingredient';
  }

  findAll() {
    return `This action returns all ingredients`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ingredient`;
  }

  update(id: number, updateIngredientDto: UpdateIngredientDto) {
    return `This action updates a #${id} ingredient`;
  }

  remove(id: number) {
    return `This action removes a #${id} ingredient`;
  }
}
