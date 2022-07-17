import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class ResponseUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({
    description: 'Id of a user',
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
}
