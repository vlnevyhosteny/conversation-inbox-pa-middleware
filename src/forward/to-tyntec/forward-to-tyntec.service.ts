import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import {
  ApiError,
  isMessageResponse,
  MessageResponse,
  Problem,
  TyntecApiService,
} from '../../tyntec';
import { ToTyntecBodyDto } from './to-tyntec.dto';

@Injectable()
export class ForwardToTyntecService {
  constructor(
    @Inject(TyntecApiService) private tyntecApiService: TyntecApiService,
  ) {}

  public async forward(
    body: ToTyntecBodyDto,
    tyntecApiKey: string,
  ): Promise<MessageResponse> {
    try {
      const response = await this.tyntecApiService
        .api(tyntecApiKey)
        .messaging.sendMessage(body);

      if (isMessageResponse(response)) {
        return response;
      } else {
        throw this.toHttpException(
          response.status ?? HttpStatus.BAD_GATEWAY,
          response,
        );
      }
    } catch (e) {
      if (e instanceof ApiError) {
        throw this.toHttpException(e.status, e);
      }

      throw (new HttpException(
        'Unable to reach Tyntec Conversation Inbox',
        HttpStatus.BAD_GATEWAY,
      ).cause = e);
    }
  }

  private toHttpException(
    status: HttpStatus,
    cause: ApiError | Problem,
  ): HttpException {
    const message = (cause as Problem).detail ?? (cause as Error).message;

    let exception: HttpException;
    switch (status) {
      case HttpStatus.FORBIDDEN:
        exception = new HttpException(
          message ?? 'Access to Tyntec Conversation Inbox forbidden',
          HttpStatus.FORBIDDEN,
        );
        break;
      case HttpStatus.UNAUTHORIZED:
        exception = new HttpException(
          message ?? 'Access to Tyntec Conversation Inbox is not authorized',
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
        exception = new HttpException(
          'Unknown Error on Tyntec API',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
    }

    exception.cause = cause instanceof Error ? cause : new Error(cause.detail);

    return exception;
  }
}
