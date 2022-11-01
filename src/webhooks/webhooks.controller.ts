import {
  Body,
  Controller,
  Inject,
  Post,
  Headers,
  Res,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { ApiBody, ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response as ExpressResponse } from 'express';
import { AccountConfiguration, TyntecApiErorResponses } from '../tyntec';
import { CreateWebhookDto } from './webhooks.dtos';
import { WebhooksService } from './webhooks.service';

export const DELETING_PATH_HEADER_KEY = 'location';

@ApiTags('Webhooks')
@Controller('webhooks')
export class WebhooksController {
  constructor(
    @Inject(WebhooksService) private webhooksService: WebhooksService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiHeader({
    name: 'tyntec-api-key',
    description: 'Api key to access Tyntec Conversation API',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    headers: {
      [DELETING_PATH_HEADER_KEY]: {
        description: 'Path to delete configured webhook',
      },
    },
    description:
      'Message accepted. Ref to [Tyntec API](https://api.tyntec.com/reference/conversations/current.html#configurations-accountconfiguration)',
  })
  @ApiBody({
    description:
      'Ref to [Tyntec API](https://api.tyntec.com/reference/conversations/current.html#configurations-callback)',
  })
  @TyntecApiErorResponses()
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
