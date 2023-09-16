import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Column } from './entities/column.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([Column])],
})
export class ColumnsModule {}
