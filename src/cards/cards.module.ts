import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Card } from './entities/card.entity.js';
import { CardsService } from './services/cards.service.js';
import { CardsWriteController } from './controllers/cards-write.controller.js';
import { CommentsModule } from '../comments/comments.module.js';
import { CardsReadController } from './controllers/cards-read.controller.js';

@Module({
  imports: [TypeOrmModule.forFeature([Card]), CommentsModule],
  controllers: [CardsWriteController, CardsReadController],
  providers: [CardsService],
  exports: [CardsService],
})
export class CardsModule {}
