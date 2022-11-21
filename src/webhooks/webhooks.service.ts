import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { configKeys } from '../config';
import { ApiError, TyntecApiService } from '../tyntec';
import { WithApiResponseHandling } from '../tyntec/with-api-response-handling.service';
import {
  ChannelsDto,
  CreateWebhookDto,
  CreateWebhookResponseDto,
} from './webhooks.dtos';

export interface ConfigureResponse {
  result: CreateWebhookResponseDto;
  webhookDeletePath: string;
}

@Injectable()
export class WebhooksService extends WithApiResponseHandling {
  @Inject(TyntecApiService) private tyntecApiService: TyntecApiService;

  @Inject(ConfigService) private configService: ConfigService;

  public async configure(
    channel: ChannelsDto,
    phoneNumber: number,
    body: CreateWebhookDto,
    tyntecApiKey: string,
  ): Promise<ConfigureResponse> {
    try {
      let result: CreateWebhookResponseDto;

      const api = this.tyntecApiService.api(tyntecApiKey).callbackConfiguration;

      switch (channel) {
        case ChannelsDto.whatsapp:
          result = await api.updateWhatsAppChannelCallback({
            phoneNumber,
            requestBody: body,
          });
          break;
        case ChannelsDto.viber:
          result = await api.updateViberChannelCallback({
            serviceId: phoneNumber,
            requestBody: body,
          });
          break;
        case ChannelsDto.sms:
          result = await api.updateSmsChannelCallback({
            phoneNumber,
            requestBody: body,
          });
          break;
      }

      return {
        result,
        webhookDeletePath: this.configService.getOrThrow(
          configKeys.webhooks.deletePath,
        ),
      };
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
