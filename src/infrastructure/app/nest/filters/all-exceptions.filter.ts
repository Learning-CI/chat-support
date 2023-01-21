import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { DefaultError } from '../../../../@shared/error/default.error';

const INTERNAL_SERVER_ERROR_MESSAGE = 'Internal server error';

@Injectable()
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = INTERNAL_SERVER_ERROR_MESSAGE;

    if (exception instanceof DefaultError) {
      statusCode = exception.getStatusCode();
      message = exception.message;
    }

    response.status(statusCode).json({
      statusCode,
      message,
      error: exception.name,
      path: request.url,
    });
  }
}
