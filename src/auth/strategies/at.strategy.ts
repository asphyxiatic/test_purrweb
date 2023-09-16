import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import { JwtTokenPayload } from '../interfaces/token-payload.interface.js';
import { config } from '../../config/config.js';
import { UserFromJwt } from '../interfaces/user-from-jwt.interface.js';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, 'jwt-access') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.JWT_ACCESS_SECRET_KEY,
    } as StrategyOptions);
  }

  async validate(payload: JwtTokenPayload): Promise<UserFromJwt> {
    const user: UserFromJwt = {
      id: payload.sub,
      email: payload.email,
    };
    return user;
  }
}
