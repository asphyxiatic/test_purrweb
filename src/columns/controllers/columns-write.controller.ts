import {
  Body,
  Controller,
  Delete,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { Column } from '../entities/column.entity.js';
import { GetCurrentUser } from '../../common/decorators/get-current-user.decorator.js';
import { UserFromJwt } from '../../auth/interfaces/user-from-jwt.interface.js';
import { CreateColumnDto } from '../dto/create-column.dto.js';
import { ColumnsService } from '../services/columns.service.js';
import { Card } from '../../cards/entities/card.entity.js';
import { UpdateColumnDto } from '../dto/update-column.dto.js';
import { UpdateCardDto } from '../../cards/dto/update-card.dto.js';
import { UpdateCommentDto } from '../../comments/dto/update-comment.dto.js';
import { Comment } from '../../comments/entities/comment.entity.js';
import { CreateCardDto } from '../../cards/dto/create-card.dto.js';
import { CreateCommentDto } from '../../comments/dto/create-comment.dto.js';

@Controller('columns')
export class ColumnsWriteController {
  constructor(private readonly columnsService: ColumnsService) {}

  // Create
  // ---------------------------------------------------------------------------
  @Post()
  async createColumn(
    @GetCurrentUser() { id }: UserFromJwt,
    @Body() body: CreateColumnDto,
  ): Promise<Column> {
    return this.columnsService.create(id, body);
  }

  @Post(':columnId')
  async createCardForColumn(
    @Param('columnId', ParseUUIDPipe) columnId: string,
    @Body() body: CreateCardDto,
  ): Promise<Card> {
    return this.columnsService.createCardForColumn(columnId, body);
  }

  @Post(':columnId/cards/:cardId')
  async createCommentForCard(
    @Param('columnId', ParseUUIDPipe) columnId: string,
    @Param('cardId', ParseUUIDPipe) cardId: string,
    @Body() body: CreateCommentDto,
  ): Promise<Comment> {
    return this.columnsService.createCommentForCard(columnId, cardId, body);
  }

  // Update
  // ---------------------------------------------------------------------------
  @Patch(':columnId')
  async updateColumn(
    @Param('columnId', ParseUUIDPipe) columnId: string,
    @Body() body: UpdateColumnDto,
  ): Promise<Column> {
    return this.columnsService.update(columnId, body);
  }

  @Patch(':columnId/cards/:cardId')
  async updateCardForColumn(
    @Param('columnId', ParseUUIDPipe) columnId: string,
    @Param('cardId', ParseUUIDPipe) cardId: string,
    @Body() body: UpdateCardDto,
  ): Promise<Card> {
    return this.columnsService.updateCardForColumn(columnId, cardId, body);
  }

  @Patch(':columnId/cards/:cardId/comments/:commentId')
  async updateCommentForCard(
    @Param('columnId', ParseUUIDPipe) columnId: string,
    @Param('cardId', ParseUUIDPipe) cardId: string,
    @Param('commentId', ParseUUIDPipe) commentId: string,
    @Body() body: UpdateCommentDto,
  ): Promise<Comment> {
    return this.columnsService.updateCommentForCard(
      columnId,
      cardId,
      commentId,
      body,
    );
  }

  // Delete
  // ---------------------------------------------------------------------------
  @Delete(':columnId')
  async deleteColumn(
    @Param('columnId', ParseUUIDPipe) columnId: string,
  ): Promise<void> {
    return this.columnsService.delete(columnId);
  }

  @Delete(':columnId/cards/:cardId')
  async deleteCardForColumn(
    @Param('columnId', ParseUUIDPipe) columnId: string,
    @Param('cardId', ParseUUIDPipe) cardId: string,
  ): Promise<void> {
    return this.columnsService.deleteCardForColumn(columnId, cardId);
  }

  @Delete(':columnId/cards/:cardId/comments/:commentId')
  async deleteCommentForCard(
    @Param('columnId', ParseUUIDPipe) columnId: string,
    @Param('cardId', ParseUUIDPipe) cardId: string,
    @Param('commentId', ParseUUIDPipe) commentId: string,
  ): Promise<void> {
    return this.columnsService.deleteCommentForCard(
      columnId,
      cardId,
      commentId,
    );
  }
}
