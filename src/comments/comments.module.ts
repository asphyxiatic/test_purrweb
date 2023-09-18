import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity.js';
import { CommentsService } from './services/comments.service.js';
import { CommentsWriteController } from './controllers/comments-write.controller.js';
import { CommentsReadController } from './controllers/commenst-read.controller.js';
import { IsCommentOwner } from './guards/is-comment-owner.guard.js';

@Module({
  imports: [TypeOrmModule.forFeature([Comment])],
  controllers: [CommentsWriteController, CommentsReadController],
  providers: [CommentsService, IsCommentOwner],
  exports: [CommentsService, IsCommentOwner],
})
export class CommentsModule {}
