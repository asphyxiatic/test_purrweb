import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersService } from '../services/users.service.js';
import { User } from '../entities/user.entity.js';
import { Column } from '../../columns/entities/column.entity.js';
import { Card } from '../../cards/entities/card.entity.js';
import { Comment } from '../../comments/entities/comment.entity.js';
import { UpdateUserDto } from '../dto/update-user.dto.js';
import { UpdateCardDto } from '../../cards/dto/update-card.dto.js';
import { UpdateColumnDto } from '../../columns/dto/update-column.dto.js';
import { UpdateCommentDto } from '../../comments/dto/update-comment.dto.js';
import { CreateUserDto } from '../dto/create-user.dto.js';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  // Create
  // ---------------------------------------------------------------------------
  @Post()
  async createUser(body: CreateUserDto): Promise<User> {
    return this.userService.create(body);
  }

  // Read
  // ---------------------------------------------------------------------------
  @Get()
  async getManyUsers(): Promise<User[]> {
    return this.userService.getManyUsers();
  }

  @Get(':userId')
  async getOneUser(
    @Param('userId', ParseUUIDPipe) userId: string,
  ): Promise<User> {
    return this.userService.getOneUser(userId);
  }

  @Get(':userId/columns')
  async getManyColumnsForUser(
    @Param('userId', ParseUUIDPipe) userId: string,
  ): Promise<Column[]> {
    return this.userService.getManyColumnsForUser(userId);
  }

  @Get(':userId/columns/:columnId')
  async getOneColumnForUser(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Param('columnId', ParseUUIDPipe) columnId: string,
  ): Promise<Column> {
    return this.userService.getOneColumnForUser(userId, columnId);
  }

  @Get(':userId/columns/:columnId/cards')
  async getManyCardsForUserColumn(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Param('columnId', ParseUUIDPipe) columnId: string,
  ): Promise<Card[]> {
    return this.userService.getManyCardsForUserColumn(userId, columnId);
  }

  @Get(':userId/columns/:columnId/cards/:cardId')
  async getOneCardForUserColumn(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Param('columnId', ParseUUIDPipe) columnId: string,
    @Param('cardId', ParseUUIDPipe) cardId: string,
  ): Promise<Card> {
    return this.userService.getOneCardForUserColumn(userId, columnId, cardId);
  }

  @Get(':userId/columns/:columnId/cards/:cardId/comments')
  async getManyCommentsForUserCard(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Param('columnId', ParseUUIDPipe) columnId: string,
    @Param('cardId', ParseUUIDPipe) cardId: string,
  ): Promise<Comment[]> {
    return this.userService.getManyCommentsForUserCard(
      userId,
      columnId,
      cardId,
    );
  }

  @Get(':userId/columns/:columnId/cards/:cardId/comments/:commentId')
  async getOneCommentForUserCard(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Param('columnId', ParseUUIDPipe) columnId: string,
    @Param('cardId', ParseUUIDPipe) cardId: string,
    @Param('commentId', ParseUUIDPipe) commentId: string,
  ): Promise<Comment> {
    return this.userService.getOneCommentForUserCard(
      userId,
      columnId,
      cardId,
      commentId,
    );
  }

  // Update
  // ---------------------------------------------------------------------------
  @Patch()
  async updateUser(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Body() body: UpdateUserDto,
  ): Promise<User> {
    return this.userService.updateUser(userId, body);
  }

  @Patch(':userId/columns/:columnId')
  async updateColumnForUser(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Param('columnId', ParseUUIDPipe) columnId: string,
    @Body() body: UpdateColumnDto,
  ): Promise<Column> {
    return this.userService.updateColumnForUser(userId, columnId, body);
  }

  @Patch(':userId/columns/:columnId/cards/:cardId')
  async updateCardForUserColumn(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Param('columnId', ParseUUIDPipe) columnId: string,
    @Param('cardId', ParseUUIDPipe) cardId: string,
    @Body() body: UpdateCardDto,
  ): Promise<Card> {
    return this.userService.updateCardForUserColumn(
      userId,
      columnId,
      cardId,
      body,
    );
  }

  @Patch(':userId/columns/:columnId/cards/:cardId/comments/:commentId')
  async updateCommentForUserCard(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Param('columnId', ParseUUIDPipe) columnId: string,
    @Param('cardId', ParseUUIDPipe) cardId: string,
    @Param('commentId', ParseUUIDPipe) commentId: string,
    @Body() body: UpdateCommentDto,
  ) {
    return this.userService.updateCommentForUserCard(
      userId,
      columnId,
      cardId,
      commentId,
      body,
    );
  }

  // Delete
  // ---------------------------------------------------------------------------
  @Delete(':userId')
  async deleteUser(
    @Param('userId', ParseUUIDPipe) userId: string,
  ): Promise<void> {
    return this.userService.delete(userId);
  }

  @Delete(':userId/columns/:columnId')
  async deleteColumnForUser(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Param('columnId', ParseUUIDPipe) columnId: string,
  ): Promise<void> {
    return this.userService.deleteColumnForUser(userId, columnId);
  }

  @Delete(':userId/columns/:columnId/cards/:cardId')
  async deleteCardForUserColumn(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Param('columnId', ParseUUIDPipe) columnId: string,
    @Param('cardId', ParseUUIDPipe) cardId: string,
  ): Promise<void> {
    return this.userService.deleteCardForUserColumn(userId, columnId, cardId);
  }

  @Delete(':userId/columns/:columnId/cards/:cardId/comments/:commentId')
  async deleteCommentForUserCard(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Param('columnId', ParseUUIDPipe) columnId: string,
    @Param('cardId', ParseUUIDPipe) cardId: string,
    @Param('commentId', ParseUUIDPipe) commentId: string,
  ): Promise<void> {
    return this.userService.deleteCommentForUserCard(
      userId,
      columnId,
      cardId,
      commentId,
    );
  }
}
