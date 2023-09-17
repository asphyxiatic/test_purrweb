import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity.js';
import { Column } from '../../columns/entities/column.entity.js';
import { ColumnsService } from '../../columns/services/columns.service.js';
import { Card } from '../../cards/entities/card.entity.js';
import { CardsService } from '../../cards/services/cards.service.js';
import { Comment } from '../../comments/entities/comment.entity.js';
import { CommentsService } from '../../comments/services/comments.service.js';
import { UpdateUserDto } from '../dto/update-user.dto.js';
import { UpdateCardDto } from '../../cards/dto/update-card.dto.js';
import { UpdateColumnDto } from '../../columns/dto/update-column.dto.js';
import { UpdateCommentDto } from '../../comments/dto/update-comment.dto.js';
import { CreateUserDto } from '../dto/create-user.dto.js';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly columnsService: ColumnsService,
    private readonly cardsService: CardsService,
    private readonly commentsService: CommentsService,
  ) {}

  //------------------------------------------------------------------
  public async findOneFor(options: Partial<User>): Promise<User | null> {
    return this.userRepository.findOne({
      where: options,
      relations: { columns: true },
    });
  }

  //------------------------------------------------------------------
  public async create(options: CreateUserDto): Promise<User> {
    return this.userRepository.save(options);
  }

  //------------------------------------------------------------------
  public async getManyUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  //------------------------------------------------------------------
  public async getOneUser(userId: string): Promise<User> {
    const user = await this.findOneFor({ id: userId });

    if (!user) {
      throw new NotFoundException('🚨 user not found!');
    }

    return user;
  }

  //------------------------------------------------------------------
  public async getManyColumnsForUser(userId: string): Promise<Column[]> {
    const user = await this.findOneFor({ id: userId });

    if (!user) {
      throw new NotFoundException('🚨 user not found!');
    }

    return user.columns;
  }

  //------------------------------------------------------------------
  public async getOneColumnForUser(
    userId: string,
    columnId: string,
  ): Promise<Column> {
    return this.columnsService.findOneFor({
      id: columnId,
      userId: userId,
    });
  }

  //------------------------------------------------------------------
  public async getManyCardsForUserColumn(
    userId: string,
    columnId: string,
  ): Promise<Card[]> {
    const column = await this.columnsService.findOneFor({
      id: columnId,
      userId: userId,
    });

    return column.cards;
  }

  //------------------------------------------------------------------
  public async getOneCardForUserColumn(
    userId: string,
    columnId: string,
    cardId: string,
  ): Promise<Card> {
    const column = await this.columnsService.findOneFor({
      id: columnId,
      userId: userId,
    });

    return this.cardsService.findOneFor({ id: cardId, columnId: column.id });
  }

  //------------------------------------------------------------------
  public async getManyCommentsForUserCard(
    userId: string,
    columnId: string,
    cardId: string,
  ): Promise<Comment[]> {
    const column = await this.columnsService.findOneFor({
      id: columnId,
      userId: userId,
    });

    const card = await this.cardsService.findOneFor({
      id: cardId,
      columnId: column.id,
    });

    return card.comments;
  }

  //------------------------------------------------------------------
  public async getOneCommentForUserCard(
    userId: string,
    columnId: string,
    cardId: string,
    commentId: string,
  ): Promise<Comment> {
    const column = await this.columnsService.findOneFor({
      id: columnId,
      userId: userId,
    });

    const card = await this.cardsService.findOneFor({
      id: cardId,
      columnId: column.id,
    });

    return this.commentsService.findOneFor({ id: commentId, cardId: card.id });
  }

  //------------------------------------------------------------------
  public async updateUser(userId: string, body: UpdateUserDto): Promise<User> {
    const user = await this.findOneFor({ id: userId });

    if (!user) {
      throw new NotFoundException('🚨 user not found!');
    }

    return this.userRepository.save({
      id: user.id,
      ...body,
    });
  }

  //------------------------------------------------------------------
  public async updateColumnForUser(
    userId,
    columnId: string,
    body: UpdateColumnDto,
  ): Promise<Column> {
    const column = await this.columnsService.findOneFor({
      id: columnId,
      userId: userId,
    });

    return this.columnsService.update(column.id, body);
  }

  //------------------------------------------------------------------
  public async updateCardForUserColumn(
    userId,
    columnId: string,
    cardId: string,
    body: UpdateCardDto,
  ): Promise<Card> {
    const column = await this.columnsService.findOneFor({
      id: columnId,
      userId: userId,
    });

    const card = await this.cardsService.findOneFor({
      id: cardId,
      columnId: column.id,
    });

    return this.cardsService.update(card.id, body);
  }

  //------------------------------------------------------------------
  async updateCommentForUserCard(
    userId,
    columnId: string,
    cardId: string,
    commentId: string,
    body: UpdateCommentDto,
  ): Promise<Comment> {
    const column = await this.columnsService.findOneFor({
      id: columnId,
      userId: userId,
    });

    const card = await this.cardsService.findOneFor({
      id: cardId,
      columnId: column.id,
    });

    const comment = await this.commentsService.findOneFor({
      id: commentId,
      cardId: card.id,
    });

    return this.commentsService.update(comment.id, body);
  }

  //------------------------------------------------------------------
  public async delete(userId: string): Promise<void> {
    try {
      await this.userRepository.delete({ id: userId });
    } catch (error: any) {
      throw new InternalServerErrorException('🚨 failed to delete user!');
    }
  }

  //------------------------------------------------------------------
  public async deleteColumnForUser(
    userId: string,
    columnId: string,
  ): Promise<void> {
    const column = await this.columnsService.findOneFor({
      id: columnId,
      userId: userId,
    });

    return this.columnsService.delete(column.id);
  }

  //------------------------------------------------------------------
  public async deleteCardForUserColumn(
    userId: string,
    columnId: string,
    cardId: string,
  ): Promise<void> {
    const column = await this.columnsService.findOneFor({
      id: columnId,
      userId: userId,
    });

    const card = await this.cardsService.findOneFor({
      id: cardId,
      columnId: column.id,
    });

    return this.cardsService.delete(card.id);
  }

  //------------------------------------------------------------------
  public async deleteCommentForUserCard(
    userId: string,
    columnId: string,
    cardId: string,
    commentId: string,
  ): Promise<void> {
    const column = await this.columnsService.findOneFor({
      id: columnId,
      userId: userId,
    });

    const card = await this.cardsService.findOneFor({
      id: cardId,
      columnId: column.id,
    });

    const comment = await this.commentsService.findOneFor({
      id: commentId,
      cardId: card.id,
    });

    return this.commentsService.delete(comment.id);
  }
}
