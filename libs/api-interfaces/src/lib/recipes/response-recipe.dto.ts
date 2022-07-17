import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateRecipeDto } from './create-recipe.dto';

export class ResponseRecipeDto extends PartialType(CreateRecipeDto) {
  @ApiProperty({
    description: 'Id of a recipe',
    default: '1',
  })
  id: number;

  @ApiProperty({
    description: 'Date of recipe creation',
    default: new Date(),
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Date of recipe update',
    default: new Date(),
  })
  updatedAt: Date;
}
