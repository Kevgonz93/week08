import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsEmail()
  email: string;
  @MinLength(6, {
    message: 'Title is too short',
  })
  password: string;
}
