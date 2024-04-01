import { Injectable, InternalServerErrorException, HttpException, HttpStatus } from '@nestjs/common';
import { DynamoDB } from 'aws-sdk';
import { v4 as uuid } from "uuid";
import { CreateTaskDto, UpdateTaskDto } from './dtos/tasks.dto';




const db = new DynamoDB.DocumentClient({
  convertEmptyValues: true,
  paramValidation: true,
});

@Injectable()
export class TasksService {
  async getTasks(): Promise<any> {
    try {
      const result = await db
        .scan({
          TableName: "TasksTable",
        })
        .promise();
        return result
    } catch (e) {
      throw new InternalServerErrorException(e);
    }

  }

  async getTasksByStatus(statusTask:string): Promise<any> {
    try {
      const result = await db
        .scan({
          TableName: "TasksTable",
          FilterExpression: "statusTask = :statusTask",
          ExpressionAttributeValues: {
            ":statusTask": statusTask ,
          },
        })
        .promise();
        return result
    } catch (e) {
      throw new InternalServerErrorException(e);
    }

  }

  async createTask(CreateTaskDto: CreateTaskDto): Promise<any> {
    if(!CreateTaskDto.title){
      throw new HttpException('Título Obrigatório', HttpStatus.BAD_REQUEST);

    }
    if(!CreateTaskDto.description){
      throw new HttpException('Descrição Obrigatória', HttpStatus.BAD_REQUEST);

    }
    if (!CreateTaskDto.statusTask){
      CreateTaskDto.statusTask = "pending"
    }
    const TaskObj = {
      id: uuid(),
      createdAt: new Date().toISOString(),
      ...CreateTaskDto,
    };
    try {
      await db
        .put({
          TableName: "TasksTable",
          Item: TaskObj,
        })
        .promise();
        return TaskObj;
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async getTask(id: string): Promise<any> {
    try {
      const result = await db
        .get({
          TableName: "TasksTable",
          Key: { id },
        })
        .promise();
        return result
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async deleteTask(id: string): Promise<any> {
    const result = await this.getTask(id)
    const length = Object.keys(result).length
    if(length === 0){
      throw new HttpException('Usuário com o ID inserido não encontrado', HttpStatus.NOT_FOUND);
        }
    else{
    try {
       await db
        .delete({
          TableName: "TasksTable",
          Key: {
            id:  id,
          },
        })
        .promise();
        return result 
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
  }

  async updateTask (id: string, UpdateTaskDto: UpdateTaskDto){
    const result = await this.getTask(id)
    const length = Object.keys(result).length
    if(length === 0){
      throw new HttpException('Usuário com o ID inserido não encontrado', HttpStatus.NOT_FOUND);
    }
    else{
      let update_expression_values = " "
      let endsComma = false;
      try{
        if(UpdateTaskDto.title){
          update_expression_values = update_expression_values + " " + '#title = :title,'
          endsComma = true
        }
        if(UpdateTaskDto.description) {
          update_expression_values = update_expression_values + " " + 'description = :description,'
          endsComma = true
        }
        if(UpdateTaskDto.statusTask) {
          update_expression_values = update_expression_values + " " + 'statusTask = :statusTask'
          endsComma = false
        }
        if (endsComma == true){
        update_expression_values = update_expression_values.replace(update_expression_values.charAt(update_expression_values.length - 1), "")
        }

      const updated = await db
        .update({
          TableName: "TasksTable",
          Key: { id },
          UpdateExpression:
            'set' + update_expression_values,
          ExpressionAttributeNames: {
            '#title': 'title',
          },
          ExpressionAttributeValues: {
            ':title': UpdateTaskDto.title,
            ':description': UpdateTaskDto.description,
            ':statusTask': UpdateTaskDto.statusTask,
          },
          ReturnValues: 'ALL_NEW',
        })
        .promise();
        update_expression_values = ''
        return updated?.Attributes

      } catch (e) {
        throw new InternalServerErrorException(e);
      }
  }

  }
}

