import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity.js';
import { CommentsService } from './services/comments.service.js';
import { CommentsWriteController } from './controllers/comments-write.controller.js';
import { CommentsReadController } from './controllers/commenst-read.controller.js';

@Module({
  imports: [TypeOrmModule.forFeature([Comment])],
  controllers: [CommentsWriteController, CommentsReadController],
  providers: [CommentsService],
  exports: [CommentsService],
})
export class CommentsModule {}
