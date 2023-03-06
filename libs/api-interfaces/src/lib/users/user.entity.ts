import { ApiProperty } from '@nestjs/swagger';
import { Users } from '@prisma/client';

export class UserEntity implements Omit<Users, 'password'> {
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
		description: 'Email of user',
		default: 'example@gmail.com',
	})
	readonly email: string;
	@ApiProperty({
		description: 'First name of user',
		default: 'John',
	})
	readonly firstName: string;
	@ApiProperty({
		description: 'Last name of user',
		default: 'Doe',
	})
	readonly lastName: string;
}
