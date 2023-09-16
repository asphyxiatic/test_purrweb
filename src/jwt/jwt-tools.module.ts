import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtToolsService } from './services/jwt-tools.service.js';

@Module({
  imports: [JwtModule.register({})],
  providers: [JwtToolsService],
  exports: [JwtToolsService],
})
export class JwtToolsModule {}
