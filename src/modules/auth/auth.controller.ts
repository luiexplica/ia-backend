
import { Controller, Get, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthRegister_Dto } from './dto/register-user.dto';
import { LoginAuth_Dto } from './dto/login-user.dto';
import { User_Auth } from './decorators/user-auth.decorator';
import { Session_Auth_I } from './interfaces/auth.interface';
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

  // @Delete(':id')
  // async delete(@Param('id') id: string) {
  //   return await this.authService.delete(id);
  // }

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
