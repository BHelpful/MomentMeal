import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateStoreDto } from './create-store.dto';

export class ResponseStoreDto extends PartialType(CreateStoreDto) {
  @ApiProperty({
    description: 'Id of a store',
    default: '1',
  })
  id: number;

  @ApiProperty({
    description: 'Date of store creation',
    default: new Date(),
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Date of store update',
    default: new Date(),
  })
  updatedAt: Date;
}
