import { Session_Auth_I } from './../auth/interfaces/auth.interface';
import { Controller, Post, Body, Get } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { Auth } from '@auth/decorators/auth.decorator';
import { Create_Notification_Dto } from './dto/create-notification.dto';
import { User_Auth } from '../auth/decorators/user-auth.decorator';

@Controller('notifications')
export class NotificationsController {

  constructor(
    private readonly notificationsService: NotificationsService
  ) { }

  @Post()
  async create(@Body() create_notification: Create_Notification_Dto) {
    return await this.notificationsService.create(create_notification);
  }

  //  @ApiOperation({ summary: 'Obtener todas las notificaciones de un usuario' })
  @Auth()
  @Get()
  async get_all(
      @User_Auth() user_auth: Session_Auth_I
  ) {


  }

  //     @ApiOperation({ summary: 'Definir una notificación como leida' })
  // @Put(':id')
  // read_notification(
  //     @Param('id', ParseUUIDPipe) _id: string,
  //     @User_Auth() user_auth: User_I
  // ) {

  //     return this.client.send('notifications.read', {
  //         _id,
  //         user_auth
  //     }).pipe(
  //         catchError(err => {
  //             throw new RpcException(err)
  //         })
  //     )
  // }

  //     @ApiOperation({ summary: 'Eliminar una notificación' })
  // @Delete(':id')
  // delete_notification(
  //     @Param('id', ParseUUIDPipe) _id: string,
  //     @User_Auth() user_auth: User_I
  // ) {

  //     return this.client.send('notifications.delete', {
  //         _id,
  //         user_auth
  //     }).pipe(
  //         catchError(err => {
  //             throw new RpcException(err)
  //         })
  //     )
  // }

}
