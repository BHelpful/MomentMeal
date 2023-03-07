import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
export class LoginUserDto {
	@IsNotEmpty()
	@IsEmail()
	@ApiProperty({
		description: 'Email of a user',
		default: 'example@gmail.com',
	})
	email: string;

	@IsNotEmpty()
	@ApiProperty({
		description: 'Password of a user',
		default: 'password',
	})
	password: string;
}
