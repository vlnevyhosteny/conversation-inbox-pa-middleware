import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import {
  ApiError,
  isMessageResponse,
  MessageResponse,
  Problem,
  TyntecApiService,
} from '../../tyntec';
import { WithApiResponseHandling } from '../../tyntec/with-api-response-handling.service';
import { ToTyntecBodyDto } from './to-tyntec.dto';

@Injectable()
export class ForwardToTyntecService extends WithApiResponseHandling {
  @Inject(TyntecApiService) private tyntecApiService: TyntecApiService;

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
}
