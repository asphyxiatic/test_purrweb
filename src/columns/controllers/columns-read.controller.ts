import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { ColumnsService } from '../services/columns.service.js';
import { UserFromJwt } from '../../auth/interfaces/user-from-jwt.interface.js';
import { GetCurrentUser } from '../../common/decorators/get-current-user.decorator.js';
import { Column } from '../entities/column.entity.js';
import { Card } from '../../cards/entities/card.entity.js';
import { Comment } from '../../comments/entities/comment.entity.js';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Колонки')
@Controller('columns')
export class ColumnsReadController {
  constructor(private readonly columnsService: ColumnsService) {}

  // Read
  // ---------------------------------------------------------------------------
  @ApiOperation({ summary: 'Получение колонок пользователя' })
  @ApiResponse({ status: 200 })
  @Get()
  async getManyColumns(
    @GetCurrentUser() { id }: UserFromJwt,
  ): Promise<Column[]> {
    return this.columnsService.getManyColumns(id);
  }

  @ApiOperation({ summary: 'Получение колоноки пользователя' })
  @ApiResponse({ status: 200 })
  @Get(':columnId')
  async getOneColumn(
    @Param('columnId', ParseUUIDPipe) columnId: string,
  ): Promise<Column> {
    return this.columnsService.getOneColumn(columnId);
  }

  @ApiOperation({ summary: 'Получение карточек колонки' })
  @ApiResponse({ status: 200 })
  @Get(':columnId/cards')
  async getManyCardsForColumn(
    @Param('columnId', ParseUUIDPipe) columnId: string,
  ): Promise<Card[]> {
    return this.columnsService.getManyCardsForColumn(columnId);
  }

  @ApiOperation({ summary: 'Получение карточки колонки' })
  @ApiResponse({ status: 200 })
  @Get(':columnId/cards/:cardId')
  async getOneCardForColumn(
    @Param('columnId', ParseUUIDPipe) columnId: string,
    @Param('cardId', ParseUUIDPipe) cardId: string,
  ): Promise<Card> {
    return this.columnsService.getOneCardForColumn(columnId, cardId);
  }

  @ApiOperation({ summary: 'Получение коментариев карточки' })
  @ApiResponse({ status: 200 })
  @Get(':columnId/cards/:cardId/comments')
  async getManyCommentsForCard(
    @Param('columnId', ParseUUIDPipe) columnId: string,
    @Param('cardId', ParseUUIDPipe) cardId: string,
  ): Promise<Comment[]> {
    return this.columnsService.getManyCommentsForCard(columnId, cardId);
  }

  @ApiOperation({ summary: 'Получение коментария карточки' })
  @ApiResponse({ status: 200 })
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
