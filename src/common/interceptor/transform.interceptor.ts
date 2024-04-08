import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  data: T;
}

@Injectable()
export default class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<Response<T>> | Promise<Observable<Response<T>>> {
    const req = context.getArgByIndex(1).req as Request;
    return next.handle().pipe(
      map((data) => {
        return {
          data,
          code: 200,
          message: 'OK',
          originUrl: req.originalUrl,
        };
      }),
    );
  }
}
