import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateCommentDto {
  @ApiProperty({
    example: 'Это комментарий',
    description: 'Текст комментария',
  })
  @IsString()
  @IsNotEmpty()
  comment!: string;
}
