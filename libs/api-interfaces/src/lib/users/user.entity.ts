import { Stores } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class UserEntity implements Stores {
  @ApiProperty({
    description: 'Id of user',
    default: '1',
  })
  id: number;

  @ApiProperty({
    description: 'Date of user creation',
    default: new Date(),
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Date of user update',
    default: new Date(),
  })
  updatedAt: Date;

  @ApiProperty({
    description: 'Name of user',
    default: 'Rema 1000',
  })
  readonly name: string;
}
