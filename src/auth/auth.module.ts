import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service.js';
import { UsersModule } from '../users/users.module.js';
import { JwtToolsModule } from '../jwt/jwt-tools.module.js';
import { AuthController } from './controllers/auth.controller.js';
import { AtStrategy } from './strategies/at.strategy.js';
import { AuthAccessGuard } from './guards/at.guard.js';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [UsersModule, JwtToolsModule],
  controllers: [AuthController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthAccessGuard,
    },
    AuthService,
    AtStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule {}
