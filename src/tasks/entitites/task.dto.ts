import { IsString, IsBoolean, MinLength } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  title: string;
  @IsString()
  owner: string;
}

export class UpdateTaskDto {
  @IsString()
  @MinLength(3, {
    message: 'Title is too short',
  })
  title?: string;
  @IsString()
  owner?: string;
  @IsBoolean()
  isDone?: boolean;
}
