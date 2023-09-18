import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'Электронная почта',
    example: 'example@gmail.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @ApiProperty({
    description: 'Пароль пользователя',
    example: '12345678',
    minimum: 8,
    maximum: 32,
  })
  @Length(8, 32)
  @IsString()
  @IsNotEmpty()
  password!: string;
}
