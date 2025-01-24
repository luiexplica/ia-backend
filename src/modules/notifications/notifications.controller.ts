import { Session_Auth_I } from '@auth/interfaces/auth.interface';
import { Controller, Get, Query, Param, ParseIntPipe, Delete, Post, Body, Inject } from '@nestjs/common';
import { NOTIFICATIONS_SERVICE_TOKEN, NotificationsService } from './notifications.service';
import { Auth } from '@auth/decorators/auth.decorator';
import { User_Auth } from '@auth/decorators/user-auth.decorator';
import { Pagination_Dto } from '@core/dto/pagination.dto';
import { Create_Notification_Dto } from './dto/create-notification.dto';

@Controller('notifications')
export class NotificationsController {

  constructor(
    @Inject(NOTIFICATIONS_SERVICE_TOKEN)
    private readonly notificationsService: NotificationsService,
  ) { }

  @Post()
  async create(@Body() create_notification: Create_Notification_Dto) {
    return await this.notificationsService.create(create_notification);
  }

  //  @ApiOperation({ summary: 'Obtener todas las notificaciones de un usuario' })
  @Auth()
  @Get()
  async get_all(
    @Query() paginationDto: Pagination_Dto,
    @User_Auth() user_auth: Session_Auth_I
  ) {
    return await this.notificationsService.get_all(user_auth, paginationDto);
  }

  @Auth()
  @Get(':id')
  async read_notification(
    @Param('id', ParseIntPipe) id: number,
    @User_Auth() user_auth: Session_Auth_I
  ) {
    return await this.notificationsService.read_notification(id, user_auth);
  }

  @Auth()
  @Delete(':id')
  async delete_notification(
    @Param('id', ParseIntPipe) id: number,
    @User_Auth() user_auth: Session_Auth_I
  ) {
    return await this.notificationsService.delete_notification(id, user_auth);
  }

}
