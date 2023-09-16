import { DataSource } from 'typeorm';
import { config } from '../config/config.js';
import { User } from '../users/entities/user.entity.js';
import { Column } from '../columns/entities/column.entity.js';
import { Card } from '../cards/entities/card.entity.js';
import { Comment } from '../comments/entities/comment.entity.js';

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: config.DB_URL,
  entities: [User, Column, Card, Comment],
  migrations: ['./dist/src/database/migrations/*.js'],
  migrationsTableName: 'migrations_table',
});
