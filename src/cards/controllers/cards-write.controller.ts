import {
  Body,
  Controller,
  Delete,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CardsService } from '../services/cards.service.js';
import { Card } from '../entities/card.entity.js';
import { UpdateCommentDto } from '../../comments/dto/update-comment.dto.js';
import { UpdateCardDto } from '../dto/update-card.dto.js';
import { Comment } from '../../comments/entities/comment.entity.js';
import { CreateCommentDto } from '../../comments/dto/create-comment.dto.js';

@Controller('cards')
export class CardsWriteController {
  constructor(private readonly cardsService: CardsService) {}

  // Create
  // ---------------------------------------------------------------------------
  @Post(':cardId')
  async createCommentForCard(
    @Param('cardId', ParseUUIDPipe) cardId: string,
    @Body() body: CreateCommentDto,
  ): Promise<Comment> {
    return this.cardsService.createCommentForCard(cardId, body);
  }

  // Update
  // ---------------------------------------------------------------------------
  @Patch(':cardId')
  async updateCardForColumn(
    @Param('cardId', ParseUUIDPipe) cardId: string,
    @Body() body: UpdateCardDto,
  ): Promise<Card> {
    return this.cardsService.update(cardId, body);
  }

  @Patch(':cardId/comments/:commentId')
  async updateCommentForCard(
    @Param('cardId', ParseUUIDPipe) cardId: string,
    @Param('commentId', ParseUUIDPipe) commentId: string,
    @Body() body: UpdateCommentDto,
  ): Promise<Comment> {
    return this.cardsService.updateCommentForCard(cardId, commentId, body);
  }

  // Delete
  // ---------------------------------------------------------------------------
  @Delete(':cardId')
  async deleteCard(
    @Param('cardId', ParseUUIDPipe) cardId: string,
  ): Promise<void> {}

  @Delete(':cardId/comments/:commentId')
  async deleteCommentForCard(
    @Param('cardId', ParseUUIDPipe) cardId: string,
    @Param('commentId', ParseUUIDPipe) commentId: string,
  ): Promise<void> {}
}
