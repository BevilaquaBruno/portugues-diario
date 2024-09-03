import { Module } from '@nestjs/common';
import { TipsModule } from './tips/tips.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './ormconfig';

@Module({
  imports: [TipsModule, TypeOrmModule.forRoot(config)],
})
export class AppModule {}
