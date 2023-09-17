import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import { JwtTokenPayload } from '../interfaces/token-payload.interface.js';
import { config } from '../../config/config.js';
import { UserFromJwt } from '../interfaces/user-from-jwt.interface.js';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../../users/services/users.service.js';

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, 'jwt-access') {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.JWT_ACCESS_SECRET_KEY,
    } as StrategyOptions);
  }

  async validate(payload: JwtTokenPayload): Promise<UserFromJwt> {
    const user = await this.usersService.findOneFor({ id: payload.sub });

    if (!user) {
      throw new UnauthorizedException('🚨 unauthorized!');
    }

    return {
      id: payload.sub,
      email: payload.email,
    };
  }
}
