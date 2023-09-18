import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { ColumnsService } from '../services/columns.service.js';
import { UserFromJwt } from '../../auth/interfaces/user-from-jwt.interface.js';
import { GetCurrentUser } from '../../common/decorators/get-current-user.decorator.js';
import { Column } from '../entities/column.entity.js';
import { Card } from '../../cards/entities/card.entity.js';
import { Comment } from '../../comments/entities/comment.entity.js';

@Controller('columns')
export class ColumnsReadController {
  constructor(private readonly columnsService: ColumnsService) {}

  // Read
  // ---------------------------------------------------------------------------
  @Get()
  async getManyColumns(
    @GetCurrentUser() { id }: UserFromJwt,
  ): Promise<Column[]> {
    return this.columnsService.getManyColumns(id);
  }

  @Get(':columnId')
  async getOneColumn(
    @Param('columnId', ParseUUIDPipe) columnId: string,
  ): Promise<Column> {
    return this.columnsService.getOneColumn(columnId);
  }

  @Get(':columnId/cards')
  async getManyCardsForColumn(
    @Param('columnId', ParseUUIDPipe) columnId: string,
  ): Promise<Card[]> {
    return this.columnsService.getManyCardsForColumn(columnId);
  }

  @Get(':columnId/cards/:cardId')
  async getOneCardForColumn(
    @Param('columnId', ParseUUIDPipe) columnId: string,
    @Param('cardId', ParseUUIDPipe) cardId: string,
  ): Promise<Card> {
    return this.columnsService.getOneCardForColumn(columnId, cardId);
  }

  @Get(':columnId/cards/:cardId/comments')
  async getManyCommentsForCard(
    @Param('columnId', ParseUUIDPipe) columnId: string,
    @Param('cardId', ParseUUIDPipe) cardId: string,
  ): Promise<Comment[]> {
    return this.columnsService.getManyCommentsForCard(columnId, cardId);
  }

  @Get(':columnId/cards/:cardId/comments/:commentId')
  async getOneCommentForCard(
    @Param('columnId', ParseUUIDPipe) columnId: string,
    @Param('cardId', ParseUUIDPipe) cardId: string,
    @Param('commentId', ParseUUIDPipe) commentId: string,
  ): Promise<Comment> {
    return this.columnsService.getOneCommentForCard(
      columnId,
      cardId,
      commentId,
    );
  }
}
