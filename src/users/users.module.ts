import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity.js';
import { UsersService } from './services/users.service.js';
import { UsersController } from './controllers/users.controllers.js';
import { ColumnsModule } from '../columns/columns.module.js';
import { CardsModule } from '../cards/cards.module.js';
import { CommentsModule } from '../comments/comments.module.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    ColumnsModule,
    CardsModule,
    CommentsModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
