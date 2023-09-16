import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class SignOutDto {
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @Length(8, 32)
  @IsString()
  @IsNotEmpty()
  password!: string;
}
