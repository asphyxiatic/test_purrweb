import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Card } from '../entities/card.entity.js';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateCardDto } from '../dto/update-card.dto.js';
import { Comment } from '../../comments/entities/comment.entity.js';
import { CommentsService } from '../../comments/services/comments.service.js';
import { UpdateCommentDto } from '../../comments/dto/update-comment.dto.js';
import { CreateCardDto } from '../dto/create-card.dto.js';
import { CreateCommentDto } from '../../comments/dto/create-comment.dto.js';

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(Card)
    private readonly cardRepository: Repository<Card>,
    private readonly commentsService: CommentsService,
  ) {}

  //-------------------------------------------------------------------
  public async findOneFor(options: Partial<Card>): Promise<Card> {
    const card = await this.cardRepository.findOne({
      where: options,
    });

    if (!card) {
      throw new NotFoundException('🚨 card not found!');
    }

    return card;
  }

  //-----------------------------------------------------------------------
  public async isOwner(ownerId: string, cardId: string): Promise<boolean> {
    const card = await this.cardRepository.findOne({
      where: { id: cardId, userId: ownerId },
    });

    return !!card;
  }

  //-------------------------------------------------------------------
  public async find(columnId: string): Promise<Card[]> {
    return this.cardRepository.find({ where: { columnId: columnId } });
  }

  //-------------------------------------------------------------------
  public async getOneCard(cardId: string): Promise<Card> {
    return this.findOneFor({ id: cardId });
  }

  //-------------------------------------------------------------------
  public async create(
    userId: string,
    columnId: string,
    body: CreateCardDto,
  ): Promise<Card> {
    return this.cardRepository.save({
      columnId: columnId,
      userId: userId,
      ...body,
    });
  }

  //-------------------------------------------------------------------
  public async update(cardId: string, body: UpdateCardDto): Promise<Card> {
    const card = await this.findOneFor({ id: cardId });

    return this.cardRepository.save({
      id: card.id,
      ...body,
    });
  }

  //-------------------------------------------------------------------
  public async delete(cardId: string): Promise<void> {
    try {
      await this.cardRepository.delete({ id: cardId });
    } catch (error: any) {
      throw new InternalServerErrorException('🚨 failed to delete card!');
    }
  }

  public async deleteCommentForCard(
    cardId: string,
    commentId: string,
  ): Promise<void> {
    const comment = await this.commentsService.findOneFor({
      id: commentId,
      cardId: cardId,
    });

    return this.commentsService.delete(comment.id);
  }

  //------------------------------------------------------------------
  public async createCommentForCard(
    userId: string,
    cardId: string,
    body: CreateCommentDto,
  ): Promise<Comment> {
    return this.commentsService.create(userId, cardId, body);
  }

  //------------------------------------------------------------------
  public async getManyCommentsForCard(cardId: string): Promise<Comment[]> {
    return this.commentsService.find(cardId);
  }

  //------------------------------------------------------------------
  public async getOneCommentForCard(
    cardId: string,
    commentId: string,
  ): Promise<Comment> {
    return this.commentsService.findOneFor({ id: commentId, cardId: cardId });
  }

  //------------------------------------------------------------------
  async updateCommentForCard(
    cardId: string,
    commentId: string,
    body: UpdateCommentDto,
  ): Promise<Comment> {
    const comment = await this.commentsService.findOneFor({
      id: commentId,
      cardId: cardId,
    });

    return this.commentsService.update(comment.id, body);
  }
}
