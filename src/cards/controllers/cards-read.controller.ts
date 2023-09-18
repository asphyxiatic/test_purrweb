import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { CardsService } from '../services/cards.service.js';
import { Card } from '../entities/card.entity.js';
import { Comment } from '../../comments/entities/comment.entity.js';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Карточки')
@Controller('cards')
export class CardsReadController {
  constructor(private readonly cardsService: CardsService) {}

  // Read
  // ---------------------------------------------------------------------------
  @ApiOperation({ summary: 'Получение карточки' })
  @ApiResponse({ status: 200 })
  @Get(':cardId')
  async getOneCard(
    @Param('cardId', ParseUUIDPipe) cardId: string,
  ): Promise<Card> {
    return this.cardsService.getOneCard(cardId);
  }

  @ApiOperation({ summary: 'Получение списка комментариев карточки' })
  @ApiResponse({ status: 200 })
  @Get(':cardId/comments')
  async getManyCommentsForCard(
    @Param('cardId', ParseUUIDPipe) cardId: string,
  ): Promise<Comment[]> {
    return this.cardsService.getManyCommentsForCard(cardId);
  }

  @ApiOperation({ summary: 'Получение комментария карточки' })
  @ApiResponse({ status: 200 })
  @Get(':cardId/comments/:commentId')
  async getOneCommentForCard(
    @Param('cardId', ParseUUIDPipe) cardId: string,
    @Param('commentId', ParseUUIDPipe) commentId: string,
  ): Promise<Comment> {
    return this.cardsService.getOneCommentForCard(cardId, commentId);
  }
}
