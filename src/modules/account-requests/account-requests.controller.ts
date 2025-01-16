import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { AccountRequestsService } from './account-requests.service';
import { User_Auth } from '@auth/decorators/user-auth.decorator';
import { Session_Auth_I } from '@auth/interfaces/auth.interface';
import { Create_Request_Key_Dto } from './dto/create-request-key.dto';
import { Auth } from '../auth/decorators/auth.decorator';
import { Create_Password_Request_Dto } from './dto/create-password-request.dto';

@Controller('account-requests')
export class AccountRequestsController {

  constructor(private readonly accountRequestsService: AccountRequestsService) {}

  //  @ApiOperation({ summary: 'Crear solicitud de contraseña olvidada' })
    @Post('pass_request')
    async create_password_request(@Body() create_request_dto: Create_Password_Request_Dto) {
      return await this.accountRequestsService.create_password_request(create_request_dto);
    }

  //   @ApiOperation({ summary: 'Crear solicitud de cambio de email' })
    @Auth()
    @Post('create')
    async create_request(@Body() create_request_dto: Create_Request_Key_Dto, @User_Auth() user_auth: Session_Auth_I) {
      return await this.accountRequestsService.create_requestByAuth(create_request_dto, user_auth);
    }

  //   @ApiOperation({ summary: 'Obtener solicitud por key' })
    @Get(':key')
    async get_request(@Param('key') key: string) {
      return await this.accountRequestsService.get_request(key);
    }

  //   @ApiOperation({ summary: 'Verificar solicitud por key' })
    @Put('verify/:key')
    async verify_request(@Param('key') key: string) {
      return await this.accountRequestsService.verify_request(key);
    }


  //   @ApiOperation({ summary: 'Verificar solicitud de cambio de contraseña' })
  //   @Put('verify_pass/:key')
  //   verify_pass_request(
  //       @Param('key') key: string,
  //       @Body() Accept_Password_Request_Dto: Accept_Password_Request_Dto
  //   ) {

  //       return this.client.send('auth.requests.verify_pass', {
  //           key,
  //           data: Accept_Password_Request_Dto
  //       }).pipe(
  //           catchError(err => {
  //               throw new RpcException(err)
  //           })
  //       )

  //   }

}
