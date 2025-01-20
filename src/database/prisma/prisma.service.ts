import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Pagination_I, Pagination_meta, PaginationMeta_I } from '@core/helpers/pagination.meta';
import { Prisma_FindMany_I } from './interfaces';
import { DeleteOrphansOneToOneMiddleware } from './middleware/deleteOrphans-one-one.middleware';
import { AutoDateMiddleware } from './middleware/autoDate.middleware';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {

  constructor() {
    super();
  }

  async onModuleInit() {
    this.setupMiddlewares();
    await this.$connect();
  }

  async setupMiddlewares() {
    const autoDate_middleware = await AutoDateMiddleware(this);
    this.$use(autoDate_middleware);
    const deleteOrphan_middleware = await DeleteOrphansOneToOneMiddleware(this);
    this.$use(deleteOrphan_middleware);
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  async find_pagination<T, J>({ model, args, pagination }: Prisma_FindMany_I<J>): Promise<Pagination_I<T>> {

    const { page, limit } = pagination;
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      model.findMany({
        ...args,
        skip,
        take: limit,
      }),
      model.count(),
    ]);

    const meta: PaginationMeta_I = Pagination_meta(page, limit, total);

    return { data, meta };
  }


}