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
import { IsColumnOwner } from '../guards/is-column-owner.guard.js';
import { IsCardOwner } from '../../cards/guards/is-card-owner.guard.js';
import { IsCommentOwner } from '../../comments/guards/is-comment-owner.guard.js';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Колонки')
@Controller('columns')
export class ColumnsWriteController {
  constructor(private readonly columnsService: ColumnsService) {}

  // Create
  // ---------------------------------------------------------------------------
  @ApiOperation({ summary: 'Создание колонки' })
  @ApiResponse({ status: 201 })
  @Post()
  async createColumn(
    @GetCurrentUser() { id }: UserFromJwt,
    @Body() body: CreateColumnDto,
  ): Promise<Column> {
    return this.columnsService.create(id, body);
  }

  @ApiOperation({ summary: 'Создание карточки колонки' })
  @ApiResponse({ status: 201 })
  @Post(':columnId/cards')
  async createCardForColumn(
    @GetCurrentUser() { id }: UserFromJwt,
    @Param('columnId', ParseUUIDPipe) columnId: string,
    @Body() body: CreateCardDto,
  ): Promise<Card> {
    return this.columnsService.createCardForColumn(id, columnId, body);
  }

  @ApiOperation({ summary: 'Создание комментария карточки' })
  @ApiResponse({ status: 201 })
  @Post(':columnId/cards/:cardId/comments')
  async createCommentForCard(
    @GetCurrentUser() { id }: UserFromJwt,
    @Param('columnId', ParseUUIDPipe) columnId: string,
    @Param('cardId', ParseUUIDPipe) cardId: string,
    @Body() body: CreateCommentDto,
  ): Promise<Comment> {
    return this.columnsService.createCommentForCard(id, columnId, cardId, body);
  }

  // Update
  // ---------------------------------------------------------------------------
  @ApiOperation({ summary: 'Обновление колонки' })
  @ApiResponse({ status: 200 })
  @Patch(':columnId')
  @UseGuards(IsColumnOwner)
  async updateColumn(
    @Param('columnId', ParseUUIDPipe) columnId: string,
    @Body() body: UpdateColumnDto,
  ): Promise<Column> {
    return this.columnsService.update(columnId, body);
  }

  @ApiOperation({ summary: 'Обновление карточки колонки' })
  @ApiResponse({ status: 200 })
  @Patch(':columnId/cards/:cardId')
  @UseGuards(IsCardOwner)
  async updateCardForColumn(
    @Param('columnId', ParseUUIDPipe) columnId: string,
    @Param('cardId', ParseUUIDPipe) cardId: string,
    @Body() body: UpdateCardDto,
  ): Promise<Card> {
    return this.columnsService.updateCardForColumn(columnId, cardId, body);
  }

  @ApiOperation({ summary: 'Обновление комментария карточки' })
  @ApiResponse({ status: 200 })
  @Patch(':columnId/cards/:cardId/comments/:commentId')
  @UseGuards(IsCommentOwner)
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
  @ApiOperation({ summary: 'Удаление колонки' })
  @ApiResponse({ status: 204 })
  @Delete(':columnId')
  @UseGuards(IsColumnOwner)
  async deleteColumn(
    @Param('columnId', ParseUUIDPipe) columnId: string,
  ): Promise<void> {
    return this.columnsService.delete(columnId);
  }

  @ApiOperation({ summary: 'Удаление карточки колонки' })
  @ApiResponse({ status: 204 })
  @Delete(':columnId/cards/:cardId')
  @UseGuards(IsCardOwner)
  async deleteCardForColumn(
    @Param('columnId', ParseUUIDPipe) columnId: string,
    @Param('cardId', ParseUUIDPipe) cardId: string,
  ): Promise<void> {
    return this.columnsService.deleteCardForColumn(columnId, cardId);
  }

  @ApiOperation({ summary: 'Удаление комментария карточки' })
  @ApiResponse({ status: 204 })
  @Delete(':columnId/cards/:cardId/comments/:commentId')
  @UseGuards(IsCommentOwner)
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
