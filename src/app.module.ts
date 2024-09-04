import { Module } from '@nestjs/common';
import { TipsModule } from './tips/tips.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './ormconfig';
import { UserModule } from './user/user.module';

@Module({
  imports: [TipsModule, UserModule, TypeOrmModule.forRoot(config)],
})
export class AppModule {}
