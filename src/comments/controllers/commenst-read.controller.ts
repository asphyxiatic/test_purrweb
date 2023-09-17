import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { CommentsService } from '../services/comments.service.js';
import { Comment } from '../entities/comment.entity.js';

@Controller('comments')
export class CommentsReadController {
  constructor(private readonly commentsService: CommentsService) {}

  // Read
  // ---------------------------------------------------------------------------
  @Get(':commentId')
  async getOneComment(
    @Param('commentId', ParseUUIDPipe) commentId: string,
  ): Promise<Comment> {
    return this.commentsService.getOneComment(commentId);
  }
}
