import {
  Body,
  Controller,
  Delete,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
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
import { CreateColumnDto } from '../../columns/dto/create-column.dto.js';
import { CreateCardDto } from '../../cards/dto/create-card.dto.js';
import { CreateCommentDto } from '../../comments/dto/create-comment.dto.js';
import { IsUserOwner } from '../guards/is-user-owner.guard.js';
import { IsColumnOwner } from '../../columns/guards/is-column-owner.guard.js';
import { IsCardOwner } from '../../cards/guards/is-card-owner.guard.js';
import { IsCommentOwner } from '../../comments/guards/is-comment-owner.guard.js';
import { SkipAuth } from '../../auth/decorators/skip-auth.decorator.js';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Пользователи')
@Controller('users')
export class UsersWriteController {
  constructor(private readonly userService: UsersService) {}

  // Create
  // ---------------------------------------------------------------------------
  @ApiOperation({ summary: 'Создание пользователя' })
  @ApiResponse({ status: 201 })
  @Post()
  @SkipAuth()
  async createUser(@Body() body: CreateUserDto): Promise<User> {
    return this.userService.create(body);
  }

  @ApiOperation({ summary: 'Создание колонки пользователя' })
  @ApiResponse({ status: 201 })
  @Post(':userId/columns')
  @UseGuards(IsUserOwner)
  async createColumnForUser(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Body() body: CreateColumnDto,
  ): Promise<Column> {
    return this.userService.createColumnForUser(userId, body);
  }

  @ApiOperation({ summary: 'Создание карточки колонки' })
  @ApiResponse({ status: 201 })
  @Post(':userId/columns/:columnId/cards')
  async createCardForUserColumn(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Param('columnId', ParseUUIDPipe) columnId: string,
    @Body() body: CreateCardDto,
  ): Promise<Card> {
    return this.userService.createCardForUserColumn(userId, columnId, body);
  }

  @ApiOperation({ summary: 'Создание комментария карточки' })
  @ApiResponse({ status: 201 })
  @Post(':userId/columns/:columnId/cards/:cardId/comments')
  async createCommentForUserCard(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Param('columnId', ParseUUIDPipe) columnId: string,
    @Param('cardId', ParseUUIDPipe) cardId: string,
    @Body() body: CreateCommentDto,
  ): Promise<Comment> {
    return this.userService.createCommentForUserCard(
      userId,
      columnId,
      cardId,
      body,
    );
  }

  // Update
  // ---------------------------------------------------------------------------
  @ApiOperation({ summary: 'Обновление пользователя' })
  @ApiResponse({ status: 200 })
  @Patch(':userId')
  @UseGuards(IsUserOwner)
  async updateUser(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Body() body: UpdateUserDto,
  ): Promise<User> {
    return this.userService.updateUser(userId, body);
  }

  @ApiOperation({ summary: 'Обновление колонки пользователя' })
  @ApiResponse({ status: 200 })
  @Patch(':userId/columns/:columnId')
  @UseGuards(IsColumnOwner)
  async updateColumnForUser(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Param('columnId', ParseUUIDPipe) columnId: string,
    @Body() body: UpdateColumnDto,
  ): Promise<Column> {
    return this.userService.updateColumnForUser(userId, columnId, body);
  }

  @ApiOperation({ summary: 'Обновление карточки колонки' })
  @ApiResponse({ status: 200 })
  @Patch(':userId/columns/:columnId/cards/:cardId')
  @UseGuards(IsCardOwner)
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

  @ApiOperation({ summary: 'Обновление комментария карточки' })
  @ApiResponse({ status: 200 })
  @Patch(':userId/columns/:columnId/cards/:cardId/comments/:commentId')
  @UseGuards(IsCommentOwner)
  async updateCommentForUserCard(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Param('columnId', ParseUUIDPipe) columnId: string,
    @Param('cardId', ParseUUIDPipe) cardId: string,
    @Param('commentId', ParseUUIDPipe) commentId: string,
    @Body() body: UpdateCommentDto,
  ): Promise<Comment> {
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
  @ApiOperation({ summary: 'Удаление пользователя' })
  @ApiResponse({ status: 204 })
  @Delete(':userId')
  @UseGuards(IsUserOwner)
  async deleteUser(
    @Param('userId', ParseUUIDPipe) userId: string,
  ): Promise<void> {
    return this.userService.delete(userId);
  }

  @ApiOperation({ summary: 'Удаление колонки пользователя' })
  @ApiResponse({ status: 204 })
  @Delete(':userId/columns/:columnId')
  @UseGuards(IsColumnOwner)
  async deleteColumnForUser(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Param('columnId', ParseUUIDPipe) columnId: string,
  ): Promise<void> {
    return this.userService.deleteColumnForUser(userId, columnId);
  }

  @ApiOperation({ summary: 'Удаление карточки колонки' })
  @ApiResponse({ status: 204 })
  @Delete(':userId/columns/:columnId/cards/:cardId')
  @UseGuards(IsCardOwner)
  async deleteCardForUserColumn(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Param('columnId', ParseUUIDPipe) columnId: string,
    @Param('cardId', ParseUUIDPipe) cardId: string,
  ): Promise<void> {
    return this.userService.deleteCardForUserColumn(userId, columnId, cardId);
  }

  @ApiOperation({ summary: 'Удаление комментария карточки' })
  @ApiResponse({ status: 204 })
  @Delete(':userId/columns/:columnId/cards/:cardId/comments/:commentId')
  @UseGuards(IsCommentOwner)
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
