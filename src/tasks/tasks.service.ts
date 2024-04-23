/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTaskDto, UpdateTaskDto } from './entitites/task.dto';
import { Task } from './entitites/task';

const select = {
  id: true,
  title: true,
  isDone: true,
  owner: {
    select: {
      id: true,
      email: true,
      role: true,
    },
  },
};

@Injectable()
export class TasksService {
  constructor(private prismaService: PrismaService) {}

  async findAll(): Promise<Task[]> {
    return this.prismaService.task.findMany({ select });
  }

  async findById(id: string): Promise<Task> {
    const data = await this.prismaService.task.findUnique({
      where: { id },
      select,
    });
    if (!data) {
      throw new NotFoundException(`Task ${id} not found`);
    }
    return data;
  }

  async create(data: CreateTaskDto): Promise<Task> {
    const newTask = this.prismaService.task.create({
      data,
      select,
    });
    return newTask;
  }

  async update(id: string, data: UpdateTaskDto): Promise<Task> {
    try {
      return await this.prismaService.task.update({
        where: { id },
        data,
        select,
      });
    } catch (error) {
      throw new NotFoundException(`Task ${id} not found`);
    }
  }

  async delete(id: string): Promise<Task> {
    try {
      return await this.prismaService.task.delete({
        where: { id },
        select,
      });
    } catch (error) {
      throw new NotFoundException(`Task ${id} not found`);
    }
  }
}
