/* eslint-disable prettier/prettier */
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { CreateUsersTable1753400459601 } from './migrations/1753400459601-create_users_table';
import { CreateTipsTable1753400512166 } from './migrations/1753400512166-create_tips_table';


dotenv.config();

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env['DB_HOST'],
  port: Number(process.env['DB_PORT']),
  username: process.env['DB_USERNAME'],
  password: process.env['DB_PASSWORD'],
  database: process.env['DB_DATABASE'],
  migrations: [
    CreateUsersTable1753400459601,
    CreateTipsTable1753400512166
  ],
  migrationsTableName: 'migrations',
});