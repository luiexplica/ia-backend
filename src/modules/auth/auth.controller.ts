
import { Controller, Get, Post, Body, Delete, Param } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthRegister_Dto } from './dto/register-user.dto';
import { LoginAuth_Dto } from './dto/login-user.dto';
import { User_Auth } from './decorators/user-auth.decorator';
import { Session_Auth_I } from './interfaces/auth.interface';
import { Auth, Auth_SameUser } from './decorators/auth.decorator';

@Controller('auth')
export class AuthController {

  constructor(
    // private readonly authService: AuthService
    private readonly authService: AuthService
  ) { }

  @Post('register')
  async register(@Body() register: AuthRegister_Dto) {
    return await this.authService.register(register);
  }

  @Auth_SameUser()
  @Delete(':auth_id')
  async delete(@Param('auth_id') auth_id: string) {
    return await this.authService.delete(auth_id);
  }

  @Post('login')
  async login(@Body() login: LoginAuth_Dto) {
    return await this.authService.login(login);
  }

  @Auth()
  @Get('verify')
  async verifyUser(@User_Auth() auth: Session_Auth_I) {
    return await this.authService.renewToken(auth.token);
  }

}
