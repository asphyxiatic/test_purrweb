import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { UsersService } from '../services/users.service.js';
import { User } from '../entities/user.entity.js';
import { Column } from '../../columns/entities/column.entity.js';
import { Card } from '../../cards/entities/card.entity.js';
import { Comment } from '../../comments/entities/comment.entity.js';
import { GetCurrentUser } from '../../common/decorators/get-current-user.decorator.js';
import { UserFromJwt } from '../../auth/interfaces/user-from-jwt.interface.js';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Пользователи')
@Controller('users')
export class UsersReadContoller {
  constructor(private readonly usersService: UsersService) {}

  // Read
  // ---------------------------------------------------------------------------
  @ApiOperation({ summary: 'Получение списока всех пользователей' })
  @ApiResponse({ status: 200 })
  @Get()
  async getManyUsers(): Promise<User[]> {
    return this.usersService.getManyUsers();
  }

  @ApiOperation({ summary: 'Получение данных о себе' })
  @ApiResponse({ status: 200 })
  @Get('me')
  async getCurrentUser(@GetCurrentUser() { id }: UserFromJwt) {
    return this.usersService.getOneUser(id);
  }

  @ApiOperation({ summary: 'Получение пользователя по Id' })
  @ApiResponse({ status: 200 })
  @Get(':userId')
  async getOneUser(
    @Param('userId', ParseUUIDPipe) userId: string,
  ): Promise<User> {
    return this.usersService.getOneUser(userId);
  }

  @ApiOperation({ summary: 'Получение списка колонок пользователя' })
  @ApiResponse({ status: 200 })
  @Get(':userId/columns')
  async getManyColumnsForUser(
    @Param('userId', ParseUUIDPipe) userId: string,
  ): Promise<Column[]> {
    return this.usersService.getManyColumnsForUser(userId);
  }

  @ApiOperation({ summary: 'Получение колонки пользователя' })
  @ApiResponse({ status: 200 })
  @Get(':userId/columns/:columnId')
  async getOneColumnForUser(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Param('columnId', ParseUUIDPipe) columnId: string,
  ): Promise<Column> {
    return this.usersService.getOneColumnForUser(userId, columnId);
  }

  @ApiOperation({ summary: 'Получение списка карточек для колонки' })
  @ApiResponse({ status: 200 })
  @Get(':userId/columns/:columnId/cards')
  async getManyCardsForUserColumn(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Param('columnId', ParseUUIDPipe) columnId: string,
  ): Promise<Card[]> {
    return this.usersService.getManyCardsForUserColumn(userId, columnId);
  }

  @ApiOperation({ summary: 'Получение карточки пользователя' })
  @ApiResponse({ status: 200 })
  @Get(':userId/columns/:columnId/cards/:cardId')
  async getOneCardForUserColumn(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Param('columnId', ParseUUIDPipe) columnId: string,
    @Param('cardId', ParseUUIDPipe) cardId: string,
  ): Promise<Card> {
    return this.usersService.getOneCardForUserColumn(userId, columnId, cardId);
  }

  @ApiOperation({ summary: 'Получение списка комментрариев для карточки' })
  @ApiResponse({ status: 200 })
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

  @ApiOperation({ summary: 'Получение комментария пользователя' })
  @ApiResponse({ status: 200 })
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
