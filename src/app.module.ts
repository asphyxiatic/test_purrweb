import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module.js';

@Module({
  imports: [DatabaseModule],
})
export class AppModule {}
