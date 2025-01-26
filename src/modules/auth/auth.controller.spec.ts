import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './services/auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AccountRequestsModule } from '@ac-requests/account-requests.module';
import { AuthConfigModule } from './modules/authConfig.module';
import { PrismaModule } from '@db/prisma/prisma.module';
import { CoreModule } from '@core/core.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AuthRegister_Dto } from './dto/register-user.dto';

describe('AuthController', () => {
  let controller: AuthController;
  let authSerice_Mock: Partial<AuthService>;
  const user_mock: AuthRegister_Dto ={
    email: 'user_test01@gmail1.com',
    password: 'Aa_12345*',
    name: 'John Test',
    last_name: 'Doe Test',
  }
  beforeEach(async () => {

    authSerice_Mock = {
      login: jest.fn().mockResolvedValue({
        ok: true,
        data: {
          id: 'mock-id-123',
          email: 'test@example.com',
          someData: 'any'
        },
        message: 'Login successful',
        statusCode: 200,
      }),
      register: jest.fn(),
      delete: jest.fn(),
      renewToken: jest.fn(),
    }

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        JwtStrategy,
        // AuthService
        {
          provide: AuthService,
          useValue: authSerice_Mock,
        },
      ],
      imports: [
        PrismaModule,
        CoreModule,
        EventEmitterModule.forRoot(),
        AuthConfigModule,
        AccountRequestsModule,
      ]
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('POST /register', () => {

    it('should have a register endpoint', () => {
      expect(typeof controller.register).toBe('function');
    });

    it('should call AuthService.register with correct body', async () => {
      const registerDto: AuthRegister_Dto = {
        ...user_mock
      }
      const result = await controller.register(registerDto);
      expect(authSerice_Mock.register).toHaveBeenCalledWith(registerDto);
      console.log('result', result);
    });

  })

  // describe('POST /login', () => {

  //   it('should have a login endpoint', () => {
  //     expect(typeof controller.login).toBe('function');
  //   });

  //   it('should call AuthService.login with correct body', async () => {
  //     const loginDto: LoginAuth_Dto = {
  //       email: 'test@example.com',
  //       password: 'password123',
  //     };
  //     const result = await controller.login(loginDto);
  //     expect(authSerice_Mock.login).toHaveBeenCalledWith(loginDto);
  //     console.log('result', result);
  //     // expect(result).toEqual(mockLoginResponse);

  //   });

  // })

});
