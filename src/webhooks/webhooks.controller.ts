import {
  Body,
  Controller,
  Inject,
  Post,
  Headers,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { Response as ExpressResponse } from 'express';
import { AccountConfiguration } from '../tyntec';
import { CreateWebhookDto } from './webhooks.dtos';
import { WebhooksService } from './webhooks.service';

export const DELETING_PATH_HEADER_KEY = 'location';

@Controller('webhooks')
export class WebhooksController {
  constructor(
    @Inject(WebhooksService) private webhooksService: WebhooksService,
  ) {}

  @Post()
  public async create(
    @Body() body: CreateWebhookDto,
    @Headers('tyntec-api-key') tyntecApiKey: string,
    @Res() response: ExpressResponse,
  ): Promise<AccountConfiguration> {
    const creationResponse = await this.webhooksService.configure(
      body,
      tyntecApiKey,
    );

    response.set(DELETING_PATH_HEADER_KEY, creationResponse.webhookDeletePath);
    response.send(creationResponse.result);
    response.status(HttpStatus.OK);

    return creationResponse.result;
  }
}
