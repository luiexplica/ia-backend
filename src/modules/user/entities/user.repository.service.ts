import { Injectable } from '@nestjs/common';
import { EntityManager, EntityRepository, PopulatePath, RequiredEntityData } from '@mikro-orm/postgresql';

import { Pagination_I, Pagination_meta } from '@core/helpers/pagination.meta';
import { _Process_Save_I, _Find_Many_I, _Process_Delete_I, _Process_Update_I } from '@core/interfaces/orm.interfaces';
import { Pagination_Dto } from '@core/dto/pagination.dto';
import { User_Ety } from './user.entity';


@Injectable()
export class User_ormRepository extends EntityRepository<User_Ety> {


  constructor(
    em: EntityManager,
  ) {
    super(em.fork(), User_Ety);
  }

  async create_user({ save, _em }: _Process_Save_I<RequiredEntityData<User_Ety, never, false>>): Promise<User_Ety> {

    const new_user = await _em.create(User_Ety, save);
    await _em.persist(new_user);
    return new_user;

  }

  async find_all({ find, options, pagination, _em }: _Find_Many_I<User_Ety>): Promise<Pagination_I<User_Ety>> {

    if (!pagination) {
      return {
        data: await this.find(find, options),
        meta: null
      };
    }

    const { page, limit } = pagination;

    const totalRecords = await _em.count(User_Ety, find);

    const data = await _em.find(User_Ety, find, {
      ...options,
      limit,
      offset: (page - 1) * limit,
    });

    const meta: Pagination_I['meta'] = Pagination_meta(page, limit, totalRecords);

    return {
      data,
      meta
    }

  }

  async delete_user({ find, _em }: _Process_Delete_I<User_Ety>): Promise<boolean> {

    const user_find = await this.findOne(find);

    if (!user_find) {
      throw new Error('User not found');
    }

    await _em.nativeDelete(User_Ety, {
      _id: user_find._id
    });
    return true;

  }

  async update_user({ find, update, _em }: _Process_Update_I<User_Ety>): Promise<User_Ety> {

    const user_find = await this.findOne(find);

    if (!user_find) {
      throw new Error('User not found');
    }

    Object.assign(user_find, update);
    await _em.persist(user_find);
    return user_find;

  }

}
