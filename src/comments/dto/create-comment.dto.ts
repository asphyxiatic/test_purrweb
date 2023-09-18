import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  comment!: string;

  @IsUUID()
  @IsOptional()
  cardId?: string | undefined;
}
