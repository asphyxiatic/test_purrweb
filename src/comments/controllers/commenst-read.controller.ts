import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { CommentsService } from '../services/comments.service.js';
import { Comment } from '../entities/comment.entity.js';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Коментарии')
@Controller('comments')
export class CommentsReadController {
  constructor(private readonly commentsService: CommentsService) {}

  // Read
  // ---------------------------------------------------------------------------
  @ApiOperation({ summary: 'Получение комментария' })
  @ApiResponse({ status: 200 })
  @Get(':commentId')
  async getOneComment(
    @Param('commentId', ParseUUIDPipe) commentId: string,
  ): Promise<Comment> {
    return this.commentsService.getOneComment(commentId);
  }
}
