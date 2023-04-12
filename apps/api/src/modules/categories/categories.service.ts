// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import {
	CreateCategoryDto,
	UpdateCategoryDto,
} from '../../../../../libs/api-interfaces/src/index';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoriesService {
  create(createCategoryDto: CreateCategoryDto) {
    return 'This action adds a new category';
  }

  findAll() {
    return `This action returns all categories`;
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
