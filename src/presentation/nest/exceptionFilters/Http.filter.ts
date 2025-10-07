import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CommonError, ErrorAny, HttpError } from '../../../core/application/common/exceptions';
import { Response } from 'express';

interface ErrorBody {
  message: string;
  errors?: ErrorAny | ErrorAny[];
  statusCode?: number;
}

@Catch(CommonError, HttpException)
export class CommonErrorFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    
    if (exception instanceof CommonError) {
      const httpError = new HttpError(exception);
      const errors = exception.errors as ErrorAny[];
      const responseBody: ErrorBody = {
        message: exception.message,
        errors,
        statusCode: httpError.status,
      };
      response.status(httpError.status).json(responseBody);
      return;
    }

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const responseData = exception.getResponse();
      let message: string;
      let errors: ErrorAny[] = [];
      if (typeof responseData === 'string') {
        message = responseData;
      } else {
        message = responseData['message'] || 'Unknown error';
        errors = responseData['errors'] || [];
      }
      if (exception.cause && !errors.length) {
        errors = [exception.cause as ErrorAny];
      }

      const responseBody: ErrorBody = {
        message,
        errors: errors.length ? errors : undefined,
        statusCode: status,
      };

      response.status(status).json(responseBody);
      return ;
    }

    const responseBody: ErrorBody = {
      message: 'Internal Server Error',
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    };

    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(responseBody);
  }
}