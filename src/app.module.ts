import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module.js';
import { AuthModule } from './auth/auth.module.js';
import { UsersModule } from './users/users.module.js';
import { ColumnsModule } from './columns/columns.module.js';
import { CardsModule } from './cards/cards.module.js';
import { CommentsModule } from './comments/comments.module.js';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    UsersModule,
    ColumnsModule,
    CardsModule,
    CommentsModule,
  ],
})
export class AppModule {}
