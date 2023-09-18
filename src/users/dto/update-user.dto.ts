import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class UpdateUserDto {
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
