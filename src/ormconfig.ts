import { DataSourceOptions } from 'typeorm';
import 'dotenv/config'

export const config: DataSourceOptions = {
  type: 'sqlite',
  database: process.env.DATABASE_URL,
  synchronize: process.env.MODE == 'DEVELOPMENT' ? true: false,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
};
