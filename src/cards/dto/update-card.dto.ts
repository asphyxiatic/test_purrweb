import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateCardDto {
  @ApiProperty({
    example: 'Карточка_0',
    description: 'Имя карточки',
  })
  @IsString()
  @IsOptional()
  name?: string | undefined;

  @ApiProperty({
    example: 'Пример описания карточки',
    description: 'Описание карточки',
  })
  @IsString()
  @IsOptional()
  description?: string | undefined;
}
