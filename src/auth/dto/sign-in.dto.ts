import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class SignInDto {
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @Length(8, 32)
  @IsString()
  @IsNotEmpty()
  password!: string;
}
