import { Module } from '@nestjs/common';
import { TipsModule } from './tips/tips.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './ormconfig';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { TipsService } from './tips/tips.service';

@Module({
  imports: [TipsModule, UserModule, AuthModule, TypeOrmModule.forRoot(config)],
  controllers: [AppController]
})

export class AppModule {}
