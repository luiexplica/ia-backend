import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { TempoHandler } from '../../core/helpers/TempoHandler';
import { Pagination_I, Pagination_meta, PaginationMeta_I } from '../../core/helpers/pagination.meta';
import { Pagination_Dto } from '../../core/dto/pagination.dto';
import { Prisma_FindMany_I } from './interfaces';


// type schemaTypes = 'auth_ety' | 'user_Ety';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {

  constructor() {
    super();

    // Middleware global
    this.$use(async (params, next) => {
      if (['create', 'update', 'upsert'].includes(params.action)) {
        if (params.args.data) {
          const date = new TempoHandler().date_now();
          if (params.action === 'create' && params.args.data.created_at === undefined) {
            params.args.data.created_at = date
          }
          if (['create', 'update', 'upsert'].includes(params.action)) {
            params.args.data.updated_at = date
          }
        }
      }
      return next(params);
    });

  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  async find_pagination<T, J>( { model, args, pagination }: Prisma_FindMany_I<J> ): Promise<Pagination_I<T>> {

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