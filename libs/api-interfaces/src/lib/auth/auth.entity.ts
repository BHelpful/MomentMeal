import { ApiProperty } from '@nestjs/swagger';

export class AuthEntity {
	@ApiProperty({
		description: 'Email of user',
		default: 'example@gmail.com',
	})
	email: string;

	@ApiProperty({
		description: 'Access token of user',
	})
	readonly accessToken: string;
}
