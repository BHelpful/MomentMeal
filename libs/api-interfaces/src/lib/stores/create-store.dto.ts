import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateStoreDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Name of a store',
    default: 'Rema 1000',
  })
  readonly name: string;
}
