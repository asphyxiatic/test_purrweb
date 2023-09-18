import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service.js';
import { SignInDto } from '../dto/sign-in.dto.js';
import { SignInResponseDto } from '../dto/sign-in-response.dto.js';
import { SkipAuth } from '../decorators/skip-auth.decorator.js';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SignUpResponseDto } from '../dto/sign-up-response.dto.js';
import { SignUpDto } from '../dto/sign-up.dto.js';

@ApiTags('Аутентификация')
@SkipAuth()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Регистрация пользователя' })
  @ApiResponse({ status: 201 })
  @Post('sign-up')
  async signOut(@Body() credentials: SignUpDto): Promise<SignUpResponseDto> {
    return this.authService.signUp(credentials);
  }

  @ApiOperation({ summary: 'Аутентификация пользователя' })
  @ApiResponse({ status: 200 })
  @Post('sign-in')
  async signIn(@Body() credentials: SignInDto): Promise<SignInResponseDto> {
    return this.authService.signIn(credentials);
  }
}
