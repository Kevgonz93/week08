import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async findAll() {
    return this.prismaService.user.findMany();
  }
  async findById(id: string) {
    const data = this.prismaService.user.findUnique({ where: { id } });
    if (!data) {
      throw new NotFoundException(`User ${id} not found`);
    }
    return data;
  }

  async create(data: CreateUserDto) {
    const newUser = this.prismaService.user.create({ data });
    return newUser;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const user = this.prismaService.user.update({
        where: { id },
        data,
      });
      return user;
    } catch (error) {
      throw new NotFoundException(`User ${id} not found`);
    }
  }

  async delete(id: string) {
    try {
      return await this.prismaService.user.delete({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException(`User ${id} not found`);
    }
  }
}
