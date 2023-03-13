import { LoginUserDto, UserEntity } from '@meal-time/api-interfaces';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
	let controller: AuthController;
	let authService: AuthService;
	beforeEach(async () => {
		const app: TestingModule = await Test.createTestingModule({
			controllers: [AuthController],
			providers: [
				{
					provide: AuthService,
					useValue: {
						constructor: jest.fn(),
						login: jest.fn(),
					},
				},
			],
		}).compile();

		controller = app.get<AuthController>(AuthController);
		authService = app.get<AuthService>(AuthService);
  });
  
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

	describe('login', () => {
		it('should return UserEntity', async () => {
			const loginUserDto: LoginUserDto = {
				email: 'email',
				password: 'password',
			};
			const userEntity: UserEntity = {
				id: 'id',
				email: 'email',
				firstName: 'firstName',
				lastName: 'lastName',
				createdAt: new Date(),
				updatedAt: new Date(),
				accessToken: 'accessToken',
			};
			jest
				.spyOn(authService, 'login')
				.mockImplementation(async () => userEntity);
			expect(await controller.login(loginUserDto)).toEqual(userEntity);
			expect(authService.login).toBeCalled();
		});
	});
});
