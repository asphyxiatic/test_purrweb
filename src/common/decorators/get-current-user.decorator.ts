import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { UserFromJwt } from '../../auth/interfaces/user-from-jwt.interface.js';
import { Request } from 'express';

export const GetCurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): UserFromJwt => {
    const request: Request = ctx.switchToHttp().getRequest();

    const user = request.user as UserFromJwt;

    return user;
  },
);
