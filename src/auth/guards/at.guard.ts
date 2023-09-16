import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from '../decorators/skip-auth.decorator.js';

@Injectable()
export class AuthAccessGuard
  extends AuthGuard('jwt-access')
  implements CanActivate
{
  constructor(private readonly reflector: Reflector) {
    super();
  }

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride(IS_PUBLIC_KEY, [
      ctx.getHandler(),
      ctx.getClass(),
    ]);

    if (!isPublic) {
      await super.canActivate(ctx);
    }

    return true;
  }
}
