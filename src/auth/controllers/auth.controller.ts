import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service.js';
import { SignOutDto } from '../dto/sign-out.dto.js';
import { SignOutResponseDto } from '../dto/sign-out-response.dto.js';
import { SignInDto } from '../dto/sign-in.dto.js';
import { SignInResponseDto } from '../dto/sign-in-response.dto.js';
import { SkipAuth } from '../decorators/skip-auth.decorator.js';

@SkipAuth()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-out')
  async signOut(@Body() credentials: SignOutDto): Promise<SignOutResponseDto> {
    return this.authService.signOut(credentials);
  }

  @Post('sign-in')
  async signIn(@Body() credentials: SignInDto): Promise<SignInResponseDto> {
    return this.authService.signIn(credentials);
  }
}
