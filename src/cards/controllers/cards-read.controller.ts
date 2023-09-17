import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { CardsService } from '../services/cards.service.js';
import { Card } from '../entities/card.entity.js';
import { Comment } from '../../comments/entities/comment.entity.js';

@Controller('cards')
export class CardsReadController {
  constructor(private readonly cardsService: CardsService) {}

  // Read
  // ---------------------------------------------------------------------------
  @Get(':cardId')
  async getOneCard(
    @Param('cardId', ParseUUIDPipe) cardId: string,
  ): Promise<Card> {
    return this.cardsService.getOneCard(cardId);
  }

  @Get(':cardId/comments')
  async getManyCommentsForCard(
    @Param('cardId', ParseUUIDPipe) cardId: string,
  ): Promise<Comment[]> {
    return this.cardsService.getManyCommentsForCard(cardId);
  }

  @Get(':cardId/comments/:commentId')
  async getOneCommentForCard(
    @Param('cardId', ParseUUIDPipe) cardId: string,
    @Param('commentId', ParseUUIDPipe) commentId: string,
  ): Promise<Comment> {
    return this.cardsService.getOneCommentForCard(cardId, commentId);
  }
}
