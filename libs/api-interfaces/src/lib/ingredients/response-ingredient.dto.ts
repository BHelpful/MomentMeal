import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateIngredientDto } from './create-ingredient.dto';

export class ResponseIngredientDto extends PartialType(CreateIngredientDto) {
  @ApiProperty({
    description: 'Id of a ingredient',
    default: '1',
  })
  id: number;

  @ApiProperty({
    description: 'Date of ingredient creation',
    default: new Date(),
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Date of ingredient update',
    default: new Date(),
  })
  updatedAt: Date;
}
