import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Request } from 'express';
import { UserFromJwt } from '../../auth/interfaces/user-from-jwt.interface.js';
import { RequestParams } from '../../common/interfaces/request-params.interface.js';
import { CommentsService } from '../services/comments.service.js';

@Injectable()
export class IsCommentOwner implements CanActivate {
  constructor(private readonly commentsService: CommentsService) {}

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const request: Request = ctx.switchToHttp().getRequest();

    const user = request.user as UserFromJwt;

    const params: RequestParams = request.params;

    const isOwner = await this.commentsService.isOwner(
      user.id,
      params.commentId,
    );

    if (!isOwner) {
      throw new ForbiddenException('🚨 no access to endpoint!');
    }

    return true;
  }
}
