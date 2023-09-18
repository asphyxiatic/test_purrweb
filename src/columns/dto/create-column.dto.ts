import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateColumnDto {
  @ApiProperty({
    example: 'Колонка_0',
    description: 'Имя колонки',
  })
  @IsString()
  @IsNotEmpty()
  name!: string;
}
