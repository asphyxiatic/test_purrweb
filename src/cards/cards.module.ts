import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Card } from './entities/card.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([Card])],
})
export class CardsModule {}
