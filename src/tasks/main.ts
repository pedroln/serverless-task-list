import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { INestApplication } from '@nestjs/common';
import { TaskModule } from './tasks.module';
import { Express } from 'express';

import { Server } from 'http';
import { Context } from 'aws-lambda';
import { createServer, proxy, Response } from 'aws-serverless-express';
import * as express from 'express';
let cachedServer: Server;

async function createExpressTask(
  expressTask: Express,
): Promise<INestApplication> {
  const Task = await NestFactory.create(
    TaskModule,
    new ExpressAdapter(expressTask),
  );
  return Task;
}


async function bootstrap(): Promise<Server> {
  const expressTask = express();
  const Task = await createExpressTask(expressTask);
  await Task.init();
  return createServer(expressTask);
}
export async function handler(event: any, context: Context): Promise<Response> {
  if (!cachedServer) {
    const server = await bootstrap();
    cachedServer = server;
  }
  return proxy(cachedServer, event, context, 'PROMISE').promise;
}