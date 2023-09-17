import { IsOptional, IsString } from 'class-validator';

export class UpdateCardDto {
  @IsString()
  @IsOptional()
  name?: string | undefined;

  @IsString()
  @IsOptional()
  description?: string | undefined;
}
