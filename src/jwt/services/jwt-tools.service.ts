import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtTokenPayload } from '../../auth/interfaces/token-payload.interface.js';

@Injectable()
export class JwtToolsService {
  constructor(private readonly jwtService: JwtService) {}

  public async createToken(
    payload: JwtTokenPayload,
    secret: string,
    expiresIn: string,
  ) {
    return this.jwtService.signAsync(payload, {
      secret: secret,
      expiresIn: expiresIn,
    });
  }
}
