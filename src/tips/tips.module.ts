import { Module } from '@nestjs/common';
import { TipsService } from './tips.service';
import { TipsController } from './tips.controller';
import { Tip } from './entities/tip.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [TypeOrmModule.forFeature([Tip]), CacheModule.register()],
  controllers: [TipsController],
  providers: [TipsService],
  exports: [TipsService]
})
export class TipsModule {}
