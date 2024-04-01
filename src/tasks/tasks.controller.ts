import { TasksService } from './tasks.service';
import { Controller, Get, Post, Delete, Body, Param, Put, Query } from '@nestjs/common';

import  Task from './interface'
import { CreateTaskDto, UpdateTaskDto } from './dtos/tasks.dto';


@Controller('tasks')
export class TasksController {
  constructor(private readonly TasksService: TasksService) {}

  @Get()
  async getTasks(): Promise<Task[]> {
    return await this.TasksService.getTasks();
  }

  @Get('getTaskById/:id')
  async getTaskById(@Param('id') id : string): Promise<Task> {
    return await this.TasksService.getTask(id);
  }

  @Post('createTask')
  async createTask(@Body() CreateTaskDto: CreateTaskDto): Promise<Task> {
    return await this.TasksService.createTask(CreateTaskDto);
  }

  @Get('getTasksByStatus')
  async getTask(@Query('status') statusTask: string): Promise<Task[]> {
    return await this.TasksService.getTasksByStatus(statusTask);
  }


  @Delete('deleteTask/:id')
  async deleteTask(@Param('id') id : string): Promise<Task> {
    return await this.TasksService.deleteTask(id);
  }

  @Put('updateTask/:id')
  async updateTask(@Param('id') id : string, @Body() UpdateTaskDto: UpdateTaskDto): Promise<Task> {
    return await this.TasksService.updateTask(id, UpdateTaskDto);
  }




}