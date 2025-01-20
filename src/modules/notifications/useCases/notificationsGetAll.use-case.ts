import { notifications_Ety, Prisma } from "@prisma/client";
import { CreateResponse } from "@core/helpers/createResponse";
import { HttpException, HttpStatus } from "@nestjs/common";
import { PrismaService } from "@db/prisma/prisma.service";
import { Pagination_Dto } from '@core/dto/pagination.dto';

const isNotFound = () => {
  const resp =  CreateResponse({
    ok: true,
    statusCode: HttpStatus.OK,
    message: 'Notifications not found',
    data: [],
    paginator: null
  });
  throw new HttpException(resp, resp.statusCode);

}

export const NotificationsGetAll_UC = async (user_id: string, Pagination_Dto: Pagination_Dto, prisma: PrismaService) => {

  const notifications = await prisma.find_pagination<notifications_Ety, Prisma.notifications_EtyFindManyArgs>({
    model: prisma.notifications_Ety,
    pagination: Pagination_Dto,
    args: {
      where: {
        user_id
      }
    }
  });

  if (notifications.data.length === 0) {
    isNotFound();
  }

  return notifications;

};
