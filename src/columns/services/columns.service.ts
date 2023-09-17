import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Column } from '../entities/column.entity.js';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateColumnDto } from '../dto/update-column.dto.js';
import { Card } from '../../cards/entities/card.entity.js';
import { CardsService } from '../../cards/services/cards.service.js';
import { Comment } from '../../comments/entities/comment.entity.js';
import { CommentsService } from '../../comments/services/comments.service.js';
import { UpdateCardDto } from '../../cards/dto/update-card.dto.js';
import { UpdateCommentDto } from '../../comments/dto/update-comment.dto.js';
import { CreateCardDto } from '../../cards/dto/create-card.dto.js';
import { CreateCommentDto } from '../../comments/dto/create-comment.dto.js';

@Injectable()
export class ColumnsService {
  constructor(
    @InjectRepository(Column)
    private readonly columnsRepository: Repository<Column>,
    private readonly cardsService: CardsService,
    private readonly commentsService: CommentsService,
  ) {}

  //-------------------------------------------------------------------
  public async findOneFor(options: Partial<Column>): Promise<Column> {
    const column = await this.columnsRepository.findOne({
      where: options,
      relations: { cards: true },
    });

    if (!column) {
      throw new NotFoundException('🚨 column not found!');
    }

    return column;
  }

  //-------------------------------------------------------------------
  public async find(userId: string): Promise<Column[]> {
    return this.columnsRepository.find({ where: { userId: userId } });
  }

  //-------------------------------------------------------------------
  public async getOneColumn(columnId: string): Promise<Column> {
    return this.findOneFor({ id: columnId });
  }

  //-------------------------------------------------------------------
  public async create(userId: string, body): Promise<Column> {
    return this.columnsRepository.save({ userId: userId, ...body });
  }

  //-------------------------------------------------------------------
  public async createCardForColumn(
    columnId: string,
    body: CreateCardDto,
  ): Promise<Card> {
    return this.cardsService.create(columnId, body);
  }

  //-------------------------------------------------------------------
  public async createCommentForCard(
    columnId: string,
    cardId: string,
    body: CreateCommentDto,
  ): Promise<Comment> {
    const card = await this.cardsService.findOneFor({
      id: cardId,
      columnId: columnId,
    });
    return this.commentsService.create(card.id, body);
  }

  //-------------------------------------------------------------------
  public async update(
    columnId: string,
    body: UpdateColumnDto,
  ): Promise<Column> {
    const column = await this.findOneFor({ id: columnId });

    return this.columnsRepository.save({ id: column.id, ...body });
  }

  //-------------------------------------------------------------------
  public async delete(columnId: string): Promise<void> {
    try {
      await this.columnsRepository.delete({ id: columnId });
    } catch (error: any) {
      throw new InternalServerErrorException('🚨 failed to delete column!');
    }
  }

  //-------------------------------------------------------------------
  public async getManyCardsForColumn(columnId: string): Promise<Card[]> {
    const column = await this.findOneFor({ id: columnId });
    return column.cards;
  }

  //------------------------------------------------------------------
  public async getOneCardForColumn(
    columnId: string,
    cardId: string,
  ): Promise<Card> {
    return this.cardsService.findOneFor({ id: cardId, columnId: columnId });
  }

  //------------------------------------------------------------------
  public async getManyCommentsForCard(
    columnId: string,
    cardId: string,
  ): Promise<Comment[]> {
    const card = await this.cardsService.findOneFor({
      id: cardId,
      columnId: columnId,
    });

    return card.comments;
  }

  //------------------------------------------------------------------
  public async getOneCommentForCard(
    columnId: string,
    cardId: string,
    commentId: string,
  ): Promise<Comment> {
    const card = await this.cardsService.findOneFor({
      id: cardId,
      columnId: columnId,
    });

    return this.commentsService.findOneFor({ id: commentId, cardId: card.id });
  }

  //------------------------------------------------------------------
  public async updateCardForColumn(
    columnId: string,
    cardId: string,
    body: UpdateCardDto,
  ): Promise<Card> {
    const card = await this.cardsService.findOneFor({
      id: cardId,
      columnId: columnId,
    });

    return this.cardsService.update(card.id, body);
  }

  //------------------------------------------------------------------
  async updateCommentForCard(
    columnId: string,
    cardId: string,
    commentId: string,
    body: UpdateCommentDto,
  ): Promise<Comment> {
    const card = await this.cardsService.findOneFor({
      id: cardId,
      columnId: columnId,
    });

    const comment = await this.commentsService.findOneFor({
      id: commentId,
      cardId: card.id,
    });

    return this.commentsService.update(comment.id, body);
  }

  //------------------------------------------------------------------
  public async deleteCardForColumn(
    columnId: string,
    cardId: string,
  ): Promise<void> {
    const card = await this.cardsService.findOneFor({
      id: cardId,
      columnId: columnId,
    });

    return this.cardsService.delete(card.id);
  }

  //------------------------------------------------------------------
  public async deleteCommentForCard(
    columnId: string,
    cardId: string,
    commentId: string,
  ): Promise<void> {
    const card = await this.cardsService.findOneFor({
      id: cardId,
      columnId: columnId,
    });

    const comment = await this.commentsService.findOneFor({
      id: commentId,
      cardId: card.id,
    });

    return this.commentsService.delete(comment.id);
  }
}
