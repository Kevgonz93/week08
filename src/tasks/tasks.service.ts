/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTaskDto, UpdateTaskDto } from './entitites/task.dto';

@Injectable()
export class TasksService {
  constructor(private prismaService: PrismaService) {}

  async findAll() {
    return this.prismaService.task.findMany();
  }
  async findById(id: string) {
    const data = this.prismaService.task.findUnique({ where: { id } });
    if (!data) {
      throw new NotFoundException(`Task ${id} not found`);
    }
    return data;
  }

  async create(data: CreateTaskDto) {
    const newTask = this.prismaService.task.create({
      data,
    });
    return newTask;
  }

  async update(id: string, data: UpdateTaskDto) {
    try {
      const task = this.prismaService.task.update({
        where: { id },
        data,
      });
      return task;
    } catch (error) {
      throw new NotFoundException(`Task ${id} not found`);
    }
  }

  async delete(id: string) {
    try {
      const task = await this.prismaService.task.delete({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException(`Task ${id} not found`);
    }
  }
}
