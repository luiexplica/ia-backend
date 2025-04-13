import { Injectable } from '@nestjs/common';
import { CreateMikroDto } from './dto/create-mikro.dto';
import { UpdateMikroDto } from './dto/update-mikro.dto';
import { EntityManager } from '@mikro-orm/core';
import { User_Ety } from './entities/users.entity';

@Injectable()
export class MikroService {

  constructor(
    private readonly em: EntityManager,
  ) {

  }

  create() {

    const f_em = this.em.fork();
    const _User_Repository = f_em.getRepository(User_Ety);

    _User_Repository.findOne( {

    }, {
      populate: ['profile'],


    })


  }

}
