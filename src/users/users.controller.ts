import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@UsePipes(
  new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
  }),
)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getAll() {
    return await this.usersService.findAll();
  }

  @Get('/:id')
  async getById(@Param('id') id: string) {
    return await this.usersService.findById(id);
  }

  @Post()
  async create(@Body() data: Omit<CreateUserDto, 'role'>) {
    return await this.usersService.create(data);
  }

  @Patch('/:id')
  async update(
    @Param('id') id: string,
    @Body() data: Omit<UpdateUserDto, 'role'>,
  ) {
    return await this.usersService.update(id, data);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    return await this.usersService.delete(id);
  }
}
