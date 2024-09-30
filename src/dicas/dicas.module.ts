import { Module } from '@nestjs/common';
import { DicasController } from './dicas.controller';
import { TipsModule } from 'src/tips/tips.module';

@Module({
  imports: [TipsModule],
  controllers: [DicasController]
})
export class DicasModule {}
