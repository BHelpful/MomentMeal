import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
export class CreateUserDto {
	@IsNotEmpty()
	@IsEmail()
	@ApiProperty({
		description: 'Name of a store',
		default: 'Rema 1000',
	})
	email: string;

	@IsNotEmpty()
	@ApiProperty({
		description: 'Name of a store',
		default: 'Rema 1000',
	})
	password: string;
}
