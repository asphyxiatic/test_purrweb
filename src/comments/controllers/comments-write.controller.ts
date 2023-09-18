import {
  Body,
  Controller,
  Delete,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CommentsService } from '../services/comments.service.js';
import { Comment } from '../entities/comment.entity.js';
import { UpdateCommentDto } from '../dto/update-comment.dto.js';
import { IsCommentOwner } from '../guards/is-comment-owner.guard.js';
import { UserFromJwt } from '../../auth/interfaces/user-from-jwt.interface.js';
import { GetCurrentUser } from '../../common/decorators/get-current-user.decorator.js';
import { CreateCommentDto } from '../dto/create-comment.dto.js';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Коментарии')
@Controller('comments')
export class CommentsWriteController {
  constructor(private readonly commentsService: CommentsService) {}

  // Create
  // --------------------------------------------------------------------------
  @ApiOperation({ summary: 'Создание комментария' })
  @ApiResponse({ status: 201 })
  @Post()
  async createComment(
    @GetCurrentUser() { id }: UserFromJwt,
    @Body() body: CreateCommentDto,
  ) {
    return this.commentsService.create(id, body.cardId, body);
  }

  // Update
  // ---------------------------------------------------------------------------
  @ApiOperation({ summary: 'Обновление комментария' })
  @ApiResponse({ status: 200 })
  @Patch(':commentId')
  @UseGuards(IsCommentOwner)
  async updateComment(
    @Param('commentId', ParseUUIDPipe) commentId: string,
    @Body() body: UpdateCommentDto,
  ): Promise<Comment> {
    return this.commentsService.update(commentId, body);
  }

  // Delete
  // ---------------------------------------------------------------------------
  @ApiOperation({ summary: 'Удаление комментария' })
  @ApiResponse({ status: 204 })
  @Delete(':commentId')
  @UseGuards(IsCommentOwner)
  async deleteComment(
    @Param('commentId', ParseUUIDPipe) commentId: string,
  ): Promise<void> {
    return this.commentsService.delete(commentId);
  }
}
