import { Controller, Post } from '@nestjs/common';
import { MikroService } from './mikro.service';

@Controller('mikro')
export class MikroController {

  constructor(private readonly mikroService: MikroService) {}

  @Post()
  create() {
    return this.mikroService.create();
  }

}
