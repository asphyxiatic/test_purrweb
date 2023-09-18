import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({
    example: 'Это комментарий',
    description: 'Текст комментария',
  })
  @IsString()
  @IsNotEmpty()
  comment!: string;

  @ApiProperty({
    example: '85944235-cf35-43af-816b-352e579edba5',
    description: 'Карточка комментария',
  })
  @IsUUID()
  @IsOptional()
  cardId?: string | undefined;
}
