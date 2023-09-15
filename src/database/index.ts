import { DataSource } from 'typeorm';
import { config } from '../config/config.js';

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: config.DB_URL,
  entities: [],
  migrations: ['./dist/src/database/migrations/*.js'],
  migrationsTableName: 'migrations_table',
});
