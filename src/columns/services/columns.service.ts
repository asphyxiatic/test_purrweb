import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Column } from '../entities/column.entity.js';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateColumnDto } from '../dto/update-column.dto.js';

@Injectable()
export class ColumnsService {
  constructor(
    @InjectRepository(Column)
    private readonly columnsRepository: Repository<Column>,
  ) {}

  //-------------------------------------------------------------------
  public async findOneFor(options: Partial<Column>): Promise<Column> {
    const column = await this.columnsRepository.findOne({ where: options });

    if (!column) {
      throw new NotFoundException('🚨 column not found!');
    }

    return column;
  }

  //-------------------------------------------------------------------
  public async update(
    columnId: string,
    body: UpdateColumnDto,
  ): Promise<Column> {
    const column = await this.findOneFor({ id: columnId });

    return this.columnsRepository.save({ id: column.id, ...body });
  }

  //-------------------------------------------------------------------
  public async delete(columnId: string): Promise<void> {
    try {
      await this.columnsRepository.delete({ id: columnId });
    } catch (error: any) {
      throw new InternalServerErrorException('🚨 failed to delete column!');
    }
  }
}
