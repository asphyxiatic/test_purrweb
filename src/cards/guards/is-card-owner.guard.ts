import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Request } from 'express';
import { UserFromJwt } from '../../auth/interfaces/user-from-jwt.interface.js';
import { RequestParams } from '../../common/interfaces/request-params.interface.js';
import { CardsService } from '../services/cards.service.js';

@Injectable()
export class IsCardOwner implements CanActivate {
  constructor(private readonly cardsService: CardsService) {}

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const request: Request = ctx.switchToHttp().getRequest();

    const user = request.user as UserFromJwt;

    const params: RequestParams = request.params;

    const isOwner = await this.cardsService.isOwner(user.id, params.cardId);

    if (!isOwner) {
      throw new ForbiddenException('🚨 no access to endpoint!');
    }

    return true;
  }
}
