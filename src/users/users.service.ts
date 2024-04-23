import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto, UpdateUserDto } from './entities/users.dto';
import { User } from './entities/user';

const select = {
  id: true,
  email: true,
  role: true,
  tasks: {
    select: {
      id: true,
      title: true,
      isDone: true,
    },
  },
};

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async findAll(): Promise<User[]> {
    return this.prismaService.user.findMany({ select });
  }

  async findById(id: string): Promise<User> {
    const data = await this.prismaService.user.findUnique({
      where: { id },
      select,
    });
    if (!data) {
      throw new NotFoundException(`User ${id} not found`);
    }
    return data;
  }

  async create(data: CreateUserDto): Promise<User> {
    const newUser = this.prismaService.user.create({ data, select });
    return newUser;
  }

  async update(id: string, data: UpdateUserDto): Promise<User> {
    try {
      const user = this.prismaService.user.update({
        where: { id },
        data,
        select,
      });
      return user;
    } catch (error) {
      throw new NotFoundException(`User ${id} not found`);
    }
  }

  async delete(id: string): Promise<User> {
    try {
      return await this.prismaService.user.delete({
        where: { id },
        select,
      });
    } catch (error) {
      throw new NotFoundException(`User ${id} not found`);
    }
  }
}
