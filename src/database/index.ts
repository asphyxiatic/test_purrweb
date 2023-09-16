import { DataSource } from 'typeorm';
import { config } from '../config/config.js';
import { User } from '../users/entities/user.entity.js';

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: config.DB_URL,
  entities: [User],
  migrations: ['./dist/src/database/migrations/*.js'],
  migrationsTableName: 'migrations_table',
});
