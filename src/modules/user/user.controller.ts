import { Session_Auth_I } from './../auth/interfaces/auth.interface';
import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Put, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { Auth, Auth_AdminOrSupport, Auth_SameIdOrAdmin } from '@auth/decorators/auth.decorator';
import { User_Auth } from '@auth/decorators/user-auth.decorator';
import { UpdateUser_Dto } from './dto/update-user.dto';
import { Pagination_Dto } from '../../core/dto/pagination.dto';

@Controller('user')
export class UserController {

  constructor(private readonly userService: UserService) { }

  @Auth_SameIdOrAdmin()
  @Get(':auth_id')
  async getOne(@Param('auth_id', ParseUUIDPipe) id: string) {
    return await this.userService.getOne(id);
  }

  @Auth()
  @Put()
  async updateUser( @Body() UpdateUser_Dto: UpdateUser_Dto, @User_Auth() User_Auth: Session_Auth_I ) {
    return await this.userService.updateUser( UpdateUser_Dto, User_Auth);
  }

  // @Auth_AdminOrSupport()
  @Get()
  async getUsers(  @Query() paginationDto: Pagination_Dto, ) {
    console.log('paginationDto', paginationDto);
    return await this.userService.getUsers(paginationDto);
  }


}


