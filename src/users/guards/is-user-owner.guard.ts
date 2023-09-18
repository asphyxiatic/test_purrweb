import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Request } from 'express';
import { UserFromJwt } from '../../auth/interfaces/user-from-jwt.interface.js';
import { RequestParams } from '../../common/interfaces/request-params.interface.js';

@Injectable()
export class IsUserOwner implements CanActivate {
  canActivate(ctx: ExecutionContext): boolean {
    const request: Request = ctx.switchToHttp().getRequest();

    const user = request.user as UserFromJwt;

    const params: RequestParams = request.params;

    const isOwner = user.id === params.userId;

    if (!isOwner) {
      throw new ForbiddenException('🚨 no access to endpoint!');
    }

    return true;
  }
}
