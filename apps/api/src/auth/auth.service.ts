import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Users } from '@prisma/client';
import * as bcrypt from 'bcrypt';

import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
	constructor(
		private usersService: UsersService,
		private jwtService: JwtService
	) {}

	async validateUser(
		email: string,
		password: string
	): Promise<Omit<Users, 'password'> | null> {
		const user = await this.usersService.findOne({ email });

		if (user?.password == null) {
			return null;
		}

		const isPasswordMatch = await bcrypt.compare(password, user.password);
		if (isPasswordMatch) {
			// return user without password
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const { password, ...result } = user;
			return result;
		}
		return null;
	}

	login(user: Omit<Users, 'password'> | null) {
		if (user == null) {
			throw new Error('Invalid User');
		}

		return {
			access_token: this.jwtService.sign({
				sub: user.id,
			}),
		};
	}
}
