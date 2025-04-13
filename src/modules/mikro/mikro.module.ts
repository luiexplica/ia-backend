import { Module } from '@nestjs/common';
import { MikroService } from './mikro.service';
import { MikroController } from './mikro.controller';

@Module({
  controllers: [MikroController],
  providers: [MikroService],
})
export class MikroModule {}
