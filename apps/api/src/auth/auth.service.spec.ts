import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../modules/users/users.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
	let service: AuthService;
	let userService: UsersService;
	let jwtService: JwtService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				AuthService,
				{
					provide: UsersService,
					useValue: {
						constructor: jest.fn(),
						findByUsername: jest.fn(),
					},
				},
				{
					provide: JwtService,
					useValue: {
						constructor: jest.fn(),
						signAsync: jest.fn(),
					},
				},
			],
		}).compile();

		service = module.get<AuthService>(AuthService);
		userService = module.get<UsersService>(UsersService);
		jwtService = module.get<JwtService>(JwtService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
		expect(userService).toBeDefined();
		expect(jwtService).toBeDefined();
	});
});
