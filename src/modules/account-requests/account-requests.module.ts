import { Module } from '@nestjs/common';
import { AccountRequestsService } from './account-requests.service';
import { AccountRequestsController } from './account-requests.controller';

@Module({
  controllers: [AccountRequestsController],
  providers: [
    AccountRequestsService
  ],
})
export class AccountRequestsModule { }
