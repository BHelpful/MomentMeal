import { LoginUserDto, UserEntity } from '@meal-time/api-interfaces';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Users } from '@prisma/client';
import * as bcrypt from 'bcrypt';

import { UsersService } from '../modules/users/users.service';

@Injectable()
export class AuthService {
	constructor(
		private usersService: UsersService,
		private jwtService: JwtService
	) {}

	async register(email: string, password: string) {
		const hashedPassword = await bcrypt.hash(password, 10);
		return this.usersService.create({
			email,
			password: hashedPassword,
		});
	}

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

	async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
		// find user in db
		const user = await this.usersService.findByLogin(loginUserDto);

		const accessToken = this._createToken(user);

		return {
			...user,
			accessToken,
		};
	}

	private _createToken({ email }: Omit<Users, 'password'>) {
		const user = { email };
		const accessToken = this.jwtService.sign(user);
		return accessToken;
	}
}
