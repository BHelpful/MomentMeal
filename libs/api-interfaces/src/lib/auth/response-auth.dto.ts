import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateAuthDto } from './create-auth.dto';

export class ResponseAuthDto extends PartialType(CreateAuthDto) {
  @ApiProperty({
    description: 'Id of a auth',
    default: '1',
  })
  id: number;

  @ApiProperty({
    description: 'Date of auth creation',
    default: new Date(),
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Date of auth update',
    default: new Date(),
  })
  updatedAt: Date;
}
