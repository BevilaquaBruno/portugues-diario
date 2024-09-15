import { Module } from '@nestjs/common';
import { UsuariosController } from './usuarios.controller';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule],
  controllers: [UsuariosController]
})
export class UsuariosModule {}
