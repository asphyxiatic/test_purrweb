import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateCardDto {
  @ApiProperty({
    example: 'Карточка_0',
    description: 'Имя карточки',
  })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({
    example: '85944235-cf35-43af-816b-352e579edba5',
    description: 'Колонка карточки',
  })
  @IsUUID()
  @IsOptional()
  columnId?: string | undefined;

  @ApiProperty({
    example: 'Пример описания карточки',
    description: 'Описание карточки',
  })
  @IsString()
  @IsOptional()
  description?: string | undefined;
}
