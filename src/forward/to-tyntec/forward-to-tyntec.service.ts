import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ApiError, SendMessageResponse, TyntecApiService } from '../../tyntec';
import { ToTyntecBodyDto } from './to-tyntec.dto';

@Injectable()
export class ForwardToTyntecService {
  constructor(
    @Inject(TyntecApiService) private tyntecApiService: TyntecApiService,
  ) {}

  public async forward(
    body: ToTyntecBodyDto,
    tyntecApiKey: string,
  ): Promise<SendMessageResponse> {
    try {
      return this.tyntecApiService
        .api(tyntecApiKey)
        .messaging.sendMessage(body);
    } catch (e) {
      if (e instanceof ApiError) {
        if (e.status === HttpStatus.FORBIDDEN) {
          throw (new HttpException(
            'Access to Tyntec Conversation Inbox forbidden',
            HttpStatus.FORBIDDEN,
          ).cause = e);
        }

        if (e.status === HttpStatus.BAD_REQUEST) {
          throw (new HttpException(
            'Invalid request',
            HttpStatus.BAD_REQUEST,
          ).cause = e);
        }

        throw (new HttpException(
          'Unknown Error on Tyntec API',
          HttpStatus.INTERNAL_SERVER_ERROR,
        ).cause = e);
      }

      throw (new HttpException(
        'Unable to reach Tyntec Conversation Inbox',
        HttpStatus.BAD_GATEWAY,
      ).cause = e);
    }
  }
}
