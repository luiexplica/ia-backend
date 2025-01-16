import { Global, Module } from '@nestjs/common';
import { ExceptionsHandler } from './helpers/Exceptions.handler';

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [
    ExceptionsHandler
  ],
  exports: [
    ExceptionsHandler
  ]
})
export class CoreModule {}