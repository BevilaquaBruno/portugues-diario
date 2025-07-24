import 'dotenv/config'
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const config: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: process.env['DATABASE_URL'],
  synchronize: process.env.MODE == 'DEVELOPMENT' ? true : false,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
};
