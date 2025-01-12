
import { Controller, Get, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthRegister_Dto } from './dto/register-user.dto';
import { LoginAuth_Dto } from './dto/login-user.dto';
import { User_Auth } from './decorators/user-auth.decorator';
import { Session_Auth_I } from './interfaces/auth.interface';
import { Response_I } from '../../core/interfaces/response.interface';
import { Auth } from './decorators/auth.decorator';

@Controller('auth')
export class AuthController {

  constructor(
    private readonly authService: AuthService
  ) { }

  @Post('register')
  async register(@Body() register: AuthRegister_Dto) {
    return await this.authService.register(register);
  }

  @Post('login')
  async login(@Body() login: LoginAuth_Dto) {
    return await this.authService.login(login);
  }

  @Auth()
  @Get('verify')
  verifyUser(@User_Auth() auth: Session_Auth_I) {

    const resp: Response_I<Session_Auth_I> = {
      ok: true,
      statusCode: 200,
      message: 'Token verify',
      data: auth
    };

    return resp;
  }

}
