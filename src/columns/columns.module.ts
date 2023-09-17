import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Column } from './entities/column.entity.js';
import { ColumnsService } from './services/columns.service.js';
import { ColumnsWriteController } from './controllers/columns-write.controller.js';
import { CardsModule } from '../cards/cards.module.js';
import { CommentsModule } from '../comments/comments.module.js';
import { ColumnsReadController } from './controllers/columns-read.controller.js';

@Module({
  imports: [TypeOrmModule.forFeature([Column]), CardsModule, CommentsModule],
  controllers: [ColumnsWriteController, ColumnsReadController],
  providers: [ColumnsService],
  exports: [ColumnsService],
})
export class ColumnsModule {}
