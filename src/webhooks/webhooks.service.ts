import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { configKeys } from '../config';
import { AccountConfiguration, ApiError, TyntecApiService } from '../tyntec';
import { WithApiResponseHandling } from '../tyntec/with-api-response-handling.service';
import { CreateWebhookDto } from './webhooks.dtos';

export interface ConfigureResponse {
  result: AccountConfiguration;
  webhookDeletePath: string;
}

@Injectable()
export class WebhooksService extends WithApiResponseHandling {
  @Inject(TyntecApiService) private tyntecApiService: TyntecApiService;

  @Inject(ConfigService) private configService: ConfigService;

  public async configure(
    body: CreateWebhookDto,
    tyntecApiKey: string,
  ): Promise<ConfigureResponse> {
    try {
      const result = await this.tyntecApiService
        .api(tyntecApiKey)
        .apiAccountConfigurations.updateAccountCallback({
          requestBody: body,
        });

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
