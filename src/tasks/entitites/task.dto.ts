import { IsString, IsBoolean, MinLength } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  title: string;
  @IsString()
  ownerId: string;
}

export class UpdateTaskDto {
  @IsString()
  @MinLength(3, {
    message: 'Title is too short',
  })
  title?: string;
  @IsString()
  ownerId?: string;
  @IsBoolean()
  isDone?: boolean;
}
