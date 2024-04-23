import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateUserDto {
  @IsString()
  @IsEmail()
  email: string;
  @MinLength(6, {
    message: 'Title is too short. Remember: min 6.',
  })
  password: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  @IsEmail()
  @IsOptional()
  email?: string;
  @IsString()
  @IsOptional()
  password?: string;
}
