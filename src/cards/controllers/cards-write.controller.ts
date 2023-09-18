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
import { CardsService } from '../services/cards.service.js';
import { Card } from '../entities/card.entity.js';
import { UpdateCommentDto } from '../../comments/dto/update-comment.dto.js';
import { UpdateCardDto } from '../dto/update-card.dto.js';
import { Comment } from '../../comments/entities/comment.entity.js';
import { CreateCommentDto } from '../../comments/dto/create-comment.dto.js';
import { IsCardOwner } from '../guards/is-card-owner.guard.js';
import { IsCommentOwner } from '../../comments/guards/is-comment-owner.guard.js';
import { GetCurrentUser } from '../../common/decorators/get-current-user.decorator.js';
import { UserFromJwt } from '../../auth/interfaces/user-from-jwt.interface.js';
import { CreateCardDto } from '../dto/create-card.dto.js';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Карточки')
@Controller('cards')
export class CardsWriteController {
  constructor(private readonly cardsService: CardsService) {}

  // Create
  // ---------------------------------------------------------------------------

  @ApiOperation({ summary: 'Создание карточки' })
  @ApiResponse({ status: 201 })
  @Post()
  async createCard(
    @GetCurrentUser() { id }: UserFromJwt,
    @Body() body: CreateCardDto,
  ): Promise<Card> {
    return this.cardsService.create(id, body.columnId, body);
  }

  @ApiOperation({ summary: 'Создание комментария карточки' })
  @ApiResponse({ status: 201 })
  @Post(':cardId/comments')
  async createCommentForCard(
    @GetCurrentUser() { id }: UserFromJwt,
    @Param('cardId', ParseUUIDPipe) cardId: string,
    @Body() body: CreateCommentDto,
  ): Promise<Comment> {
    return this.cardsService.createCommentForCard(id, cardId, body);
  }

  // Update
  // ---------------------------------------------------------------------------
  @ApiOperation({ summary: 'Обновление карточки' })
  @ApiResponse({ status: 200 })
  @Patch(':cardId')
  @UseGuards(IsCardOwner)
  async updateCardForColumn(
    @Param('cardId', ParseUUIDPipe) cardId: string,
    @Body() body: UpdateCardDto,
  ): Promise<Card> {
    return this.cardsService.update(cardId, body);
  }

  @ApiOperation({ summary: 'Обновление комментария карточки' })
  @ApiResponse({ status: 200 })
  @Patch(':cardId/comments/:commentId')
  @UseGuards(IsCommentOwner)
  async updateCommentForCard(
    @Param('cardId', ParseUUIDPipe) cardId: string,
    @Param('commentId', ParseUUIDPipe) commentId: string,
    @Body() body: UpdateCommentDto,
  ): Promise<Comment> {
    return this.cardsService.updateCommentForCard(cardId, commentId, body);
  }

  // Delete
  // ---------------------------------------------------------------------------
  @ApiOperation({ summary: 'Удаление карточки' })
  @ApiResponse({ status: 204 })
  @Delete(':cardId')
  @UseGuards(IsCardOwner)
  async deleteCard(
    @Param('cardId', ParseUUIDPipe) cardId: string,
  ): Promise<void> {
    return this.cardsService.delete(cardId);
  }

  @ApiOperation({ summary: 'Удаление комментария карточки' })
  @ApiResponse({ status: 204 })
  @Delete(':cardId/comments/:commentId')
  @UseGuards(IsCommentOwner)
  async deleteCommentForCard(
    @Param('cardId', ParseUUIDPipe) cardId: string,
    @Param('commentId', ParseUUIDPipe) commentId: string,
  ): Promise<void> {
    return this.cardsService.deleteCommentForCard(cardId, commentId);
  }
}
