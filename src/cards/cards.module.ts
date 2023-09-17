import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Card } from './entities/card.entity.js';
import { CardsService } from './services/cards.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([Card])],
  providers: [CardsService],
  exports: [CardsService],
})
export class CardsModule {}
