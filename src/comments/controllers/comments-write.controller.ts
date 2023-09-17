import {
  Body,
  Controller,
  Delete,
  Param,
  ParseUUIDPipe,
  Patch,
} from '@nestjs/common';
import { CommentsService } from '../services/comments.service.js';
import { Comment } from '../entities/comment.entity.js';
import { UpdateCommentDto } from '../dto/update-comment.dto.js';

@Controller('comments')
export class CommentsWriteController {
  constructor(private readonly commentsService: CommentsService) {}

  // Update
  // ---------------------------------------------------------------------------
  @Patch(':commentId')
  async updateComment(
    @Param('commentId', ParseUUIDPipe) commentId: string,
    @Body() body: UpdateCommentDto,
  ): Promise<Comment> {
    return this.commentsService.update(commentId, body);
  }

  // Delete
  // ---------------------------------------------------------------------------
  @Delete(':commentId')
  async deleteComment(
    @Param('commentId', ParseUUIDPipe) commentId: string,
  ): Promise<void> {
    return this.commentsService.delete(commentId);
  }
}
