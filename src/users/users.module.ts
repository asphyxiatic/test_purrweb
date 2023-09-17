import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity.js';
import { UsersService } from './services/users.service.js';
import { UsersWriteController } from './controllers/users-write.controller.js';
import { ColumnsModule } from '../columns/columns.module.js';
import { CardsModule } from '../cards/cards.module.js';
import { CommentsModule } from '../comments/comments.module.js';
import { UsersReadContoller } from './controllers/users-read.controller.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    ColumnsModule,
    CardsModule,
    CommentsModule,
  ],
  controllers: [UsersWriteController, UsersReadContoller],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
