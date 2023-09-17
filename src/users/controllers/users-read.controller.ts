import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { UsersService } from '../services/users.service.js';
import { User } from '../entities/user.entity.js';
import { Column } from '../../columns/entities/column.entity.js';
import { Card } from '../../cards/entities/card.entity.js';
import { Comment } from '../../comments/entities/comment.entity.js';

@Controller('users')
export class UsersReadContoller {
  constructor(private readonly usersService: UsersService) {}

  // Read
  // ---------------------------------------------------------------------------
  @Get()
  async getManyUsers(): Promise<User[]> {
    return this.usersService.getManyUsers();
  }

  @Get(':userId')
  async getOneUser(
    @Param('userId', ParseUUIDPipe) userId: string,
  ): Promise<User> {
    return this.usersService.getOneUser(userId);
  }

  @Get(':userId/columns')
  async getManyColumnsForUser(
    @Param('userId', ParseUUIDPipe) userId: string,
  ): Promise<Column[]> {
    return this.usersService.getManyColumnsForUser(userId);
  }

  @Get(':userId/columns/:columnId')
  async getOneColumnForUser(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Param('columnId', ParseUUIDPipe) columnId: string,
  ): Promise<Column> {
    return this.usersService.getOneColumnForUser(userId, columnId);
  }

  @Get(':userId/columns/:columnId/cards')
  async getManyCardsForUserColumn(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Param('columnId', ParseUUIDPipe) columnId: string,
  ): Promise<Card[]> {
    return this.usersService.getManyCardsForUserColumn(userId, columnId);
  }

  @Get(':userId/columns/:columnId/cards/:cardId')
  async getOneCardForUserColumn(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Param('columnId', ParseUUIDPipe) columnId: string,
    @Param('cardId', ParseUUIDPipe) cardId: string,
  ): Promise<Card> {
    return this.usersService.getOneCardForUserColumn(userId, columnId, cardId);
  }

  @Get(':userId/columns/:columnId/cards/:cardId/comments')
  async getManyCommentsForUserCard(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Param('columnId', ParseUUIDPipe) columnId: string,
    @Param('cardId', ParseUUIDPipe) cardId: string,
  ): Promise<Comment[]> {
    return this.usersService.getManyCommentsForUserCard(
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
    return this.usersService.getOneCommentForUserCard(
      userId,
      columnId,
      cardId,
      commentId,
    );
  }
}
