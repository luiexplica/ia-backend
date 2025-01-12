import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { Auth, Auth_SameIdOrAdmin } from '@auth/decorators/auth.decorator';

@Controller('user')
export class UserController {

  constructor(private readonly userService: UserService) {

  }

  @Auth_SameIdOrAdmin()
  // @Auth()
  @Get(':auth_id')
  async getOne(@Param('auth_id', ParseUUIDPipe) id: string) {
    return await this.userService.getOne(id);
  }

}


