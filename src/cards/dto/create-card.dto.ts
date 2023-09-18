import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateCardDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsUUID()
  @IsOptional()
  columnId?: string | undefined;

  @IsString()
  @IsOptional()
  description?: string | undefined;
}
