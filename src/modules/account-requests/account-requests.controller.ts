import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AccountRequestsService } from './account-requests.service';

@Controller('account-requests')
export class AccountRequestsController {
  constructor(private readonly accountRequestsService: AccountRequestsService) {}


}
