import {
  ArgumentsHost,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Catch,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { Request, Response } from 'express';

@Catch()
export class allExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapter: HttpAdapterHost['httpAdapter']) {}
  catch(exception: unknown, host: ArgumentsHost) {
    const { httpAdapter } = this;
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Internal server error';

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: String(httpAdapter.getRequestUrl(request)),
      message,
    });
  }
}
