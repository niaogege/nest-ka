import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch(HttpException)
export default class AllExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const exceptionResponse = exception.getResponse?.();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    response.status(status).json({
      code: exception.code ?? status,
      error: exception.name,
      message: exceptionResponse?.message || exception.message,
      originUrl: request.originalUrl,
    });
  }
}
