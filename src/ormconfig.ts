import { DataSourceOptions } from 'typeorm';
import 'dotenv/config'

export const config: DataSourceOptions = {
  type: 'sqlite',
  database: 'db/database.sqlite',
  synchronize: process.env.MODE == 'DEVELOPMENT' ? true: false,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
};
