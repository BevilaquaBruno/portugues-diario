import { Module } from '@nestjs/common';
import { TipsModule } from './tips/tips.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './ormconfig';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { UsuariosModule } from './usuarios/usuarios.module';
import { DicasModule } from './dicas/dicas.module';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [TypeOrmModule.forRoot(config), TipsModule, UserModule, AuthModule, UsuariosModule, DicasModule, CacheModule.register()],
  controllers: [AppController]
})

export class AppModule { }
