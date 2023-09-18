import { IsNotEmpty, IsString, Length } from 'class-validator';

export class UpdateUserDto {
  @Length(8, 32)
  @IsString()
  @IsNotEmpty()
  password!: string;
}
