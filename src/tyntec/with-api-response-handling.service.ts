import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ApiError, Problem } from './__generated__';

@Injectable()
export abstract class WithApiResponseHandling {
  public toHttpException(
    status: HttpStatus,
    cause: ApiError | Problem,
  ): HttpException {
    const message = (cause as Problem).detail ?? (cause as Error).message;

    let exception: HttpException;
    switch (status) {
      case HttpStatus.FORBIDDEN:
        exception = new HttpException(
          message ?? 'Access to Tyntec Conversation forbidden',
          HttpStatus.FORBIDDEN,
        );
        break;
      case HttpStatus.UNAUTHORIZED:
        exception = new HttpException(
          message ?? 'Access to Tyntec Conversation is not authorized',
          HttpStatus.UNAUTHORIZED,
        );
        break;
      case HttpStatus.BAD_REQUEST:
        exception = new HttpException(
          message ?? 'Invalid request',
          HttpStatus.BAD_REQUEST,
        );
        break;

      default:
        exception = new HttpException('Unknown Error on Tyntec API', status);
    }

    exception.cause = cause instanceof Error ? cause : new Error(cause.detail);

    return exception;
  }
}
