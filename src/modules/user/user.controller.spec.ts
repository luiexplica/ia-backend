import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaModule } from '@db/prisma/prisma.module';
import { CoreModule } from '@core/core.module';
import { UpdateUser_Dto } from './dto/update-user.dto';
import { Pagination_Dto } from '@core/dto/pagination.dto';
import { CreateResponse } from '../../core/helpers/createResponse';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        PrismaModule,
        CoreModule
      ],
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });


});
