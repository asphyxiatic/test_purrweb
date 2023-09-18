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

@Controller('comments')
export class CommentsWriteController {
  constructor(private readonly commentsService: CommentsService) {}

  // Create
  // --------------------------------------------------------------------------
  @Post()
  async createComment(
    @GetCurrentUser() { id }: UserFromJwt,
    @Body() body: CreateCommentDto,
  ) {
    return this.commentsService.create(id, body.cardId, body);
  }

  // Update
  // ---------------------------------------------------------------------------
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
  @Delete(':commentId')
  @UseGuards(IsCommentOwner)
  async deleteComment(
    @Param('commentId', ParseUUIDPipe) commentId: string,
  ): Promise<void> {
    return this.commentsService.delete(commentId);
  }
}
