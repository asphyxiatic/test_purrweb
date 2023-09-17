import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Column } from './entities/column.entity.js';
import { ColumnsService } from './services/columns.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([Column])],
  providers: [ColumnsService],
  exports: [ColumnsService],
})
export class ColumnsModule {}
