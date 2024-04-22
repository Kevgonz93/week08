/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './entities/task';

const tasks: Task[] = [
  {
    id: '1',
    title: 'Hacer la compra',
    owner: 'Juan',
    isDone: false,
  },
  {
    id: '2',
    title: 'Lavar el coche',
    owner: 'Ana',
    isDone: true,
  },
  {
    id: '3',
    title: 'Preparar la presentación',
    owner: 'Carlos',
    isDone: false,
  },
];

@Injectable()
export class TasksService {
  tasks: Task[] = tasks;

  async findAll() {
    return this.tasks;
  }
  async findById(id: string) {
    return this.tasks.find((task) => task.id === id);
  }
  async create(data: Omit<Task, 'id'>) {
    const newTask = { ...data, id: String(this.tasks.length + 1) };
    this.tasks.push(newTask);
    return newTask;
  }
  async update(id: string, data: Partial<Omit<Task, 'id'>>) {
    const task = this.tasks.find((task) => task.id === id);
    if (task) {
      Object.assign(task, data);
      return task;
    }
  }
  async delete(id: string) {
    const index = this.tasks.findIndex((task) => task.id === id);
    if (index > -1) {
      const task = this.tasks[index];
      this.tasks.splice(index, 1);
    } else {
      throw new NotFoundException(`task ${id} not found`);
    }
  }
}
