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
import { Comment } from '../../comments/entities/comment.entity.js';
import { UpdateUserDto } from '../dto/update-user.dto.js';
import { UpdateCardDto } from '../../cards/dto/update-card.dto.js';
import { UpdateColumnDto } from '../../columns/dto/update-column.dto.js';
import { UpdateCommentDto } from '../../comments/dto/update-comment.dto.js';
import { CreateUserDto } from '../dto/create-user.dto.js';
import { CreateColumnDto } from '../../columns/dto/create-column.dto.js';
import { CreateCardDto } from '../../cards/dto/create-card.dto.js';
import { CreateCommentDto } from '../../comments/dto/create-comment.dto.js';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  private readonly saltRounds = 5;

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly columnsService: ColumnsService,
  ) {}

  //------------------------------------------------------------------
  public async findOneFor(options: Partial<User>): Promise<User | null> {
    return this.userRepository.findOne({
      where: options,
    });
  }

  //------------------------------------------------------------------
  public async create(credentials: CreateUserDto): Promise<User> {
    const hashedPassword = bcrypt.hashSync(
      credentials.password,
      this.saltRounds,
    );

    return this.userRepository.save({
      ...credentials,
      password: hashedPassword,
    });
  }

  //------------------------------------------------------------------
  public async createColumnForUser(
    userId: string,
    body: CreateColumnDto,
  ): Promise<Column> {
    return this.columnsService.create(userId, body);
  }

  //------------------------------------------------------------------
  public async createCardForUserColumn(
    userId: string,
    columnId: string,
    body: CreateCardDto,
  ): Promise<Card> {
    return this.columnsService.createCardForColumn(userId, columnId, body);
  }

  //------------------------------------------------------------------
  public async createCommentForUserCard(
    userId: string,
    columnId: string,
    cardId: string,
    body: CreateCommentDto,
  ): Promise<Comment> {
    return this.columnsService.createCommentForCard(
      userId,
      columnId,
      cardId,
      body,
    );
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

    return this.columnsService.find(user.id);
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

    return this.columnsService.getManyCardsForColumn(column.id);
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

    return this.columnsService.getOneCardForColumn(column.id, cardId);
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

    return this.columnsService.getManyCommentsForCard(column.id, cardId);
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

    return this.columnsService.getOneCommentForCard(
      column.id,
      cardId,
      commentId,
    );
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

    return this.columnsService.updateCardForColumn(column.id, cardId, body);
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

    return this.columnsService.updateCommentForCard(
      column.id,
      cardId,
      commentId,
      body,
    );
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

    return this.columnsService.deleteCardForColumn(column.id, cardId);
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

    return this.columnsService.deleteCommentForCard(
      column.id,
      cardId,
      commentId,
    );
  }
}
