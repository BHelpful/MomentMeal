import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateCategoryDto } from './create-category.dto';

export class ResponseCategoryDto extends PartialType(CreateCategoryDto) {
  @ApiProperty({
    description: 'Id of a category',
    default: '1',
  })
  id: number;

  @ApiProperty({
    description: 'Date of category creation',
    default: new Date(),
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Date of category update',
    default: new Date(),
  })
  updatedAt: Date;
}
