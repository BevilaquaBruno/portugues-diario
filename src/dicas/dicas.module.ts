import { Module } from '@nestjs/common';
import { DicasController } from './dicas.controller';

@Module({
  controllers: [DicasController]
})
export class DicasModule {}
