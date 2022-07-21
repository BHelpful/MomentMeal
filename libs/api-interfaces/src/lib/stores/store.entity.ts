import { Stores } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class StoreEntity implements Stores {
  @ApiProperty({
    description: 'Id of store',
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

  @ApiProperty({
    description: 'Name of store',
    default: 'Rema 1000',
  })
  readonly name: string;
}
