import {
  Body,
  Controller,
  Inject,
  Post,
  Headers,
  Res,
  HttpStatus,
  HttpCode,
  Param,
} from '@nestjs/common';
import {
  ApiBody,
  ApiHeader,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Response as ExpressResponse } from 'express';
import { TyntecApiErorResponses } from '../tyntec';
import {
  ChannelsDto,
  CreateWebhookDto,
  CreateWebhookResponseDto,
} from './webhooks.dtos';
import { WebhooksService } from './webhooks.service';

export const DELETING_PATH_HEADER_KEY = 'location';

@ApiTags('Webhooks')
@Controller('webhooks')
export class WebhooksController {
  constructor(
    @Inject(WebhooksService) private webhooksService: WebhooksService,
  ) {}

  @Post('channels/:channel/phone-numbers/:phoneNumber')
  @HttpCode(HttpStatus.OK)
  @ApiHeader({
    name: 'apiKey',
    description: 'Api key to access Tyntec Conversation API',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    headers: {
      [DELETING_PATH_HEADER_KEY]: {
        description: 'Path to delete configured webhook',
      },
    },
    description: `Message accepted. Ref to [Viber ChannelCallback](https://api.tyntec.com/reference/conversations/current.html#viber-viberchannelresponse),
      [Whatsapp ChannelCallback](https://api.tyntec.com/reference/conversations/current.html#whatsapp-whatsappchannelresponse) 
      or [SMS ChannelCallback](https://api.tyntec.com/reference/conversations/current.html#sms-smschannelresponse)`,
  })
  @ApiBody({
    description: `Ref to [Viber ChannelCallback](https://api.tyntec.com/reference/conversations/current.html#viber-channelcallback),
      [Whatsapp ChannelCallback](https://api.tyntec.com/reference/conversations/current.html#whatsapp-channelcallback) 
      or [SMS ChannelCallback](https://api.tyntec.com/reference/conversations/current.html#sms-channelcallback)`,
  })
  @ApiParam({
    name: 'channel',
    enum: ChannelsDto,
  })
  @ApiParam({
    name: 'phoneNumber',
    type: Number,
  })
  @TyntecApiErorResponses()
  public async create(
    @Body() body: CreateWebhookDto,
    @Headers('apiKey') tyntecApiKey: string,
    @Param('channel') channel: ChannelsDto,
    @Param('phoneNumber') phoneNumber: number,
    @Res() response: ExpressResponse,
  ): Promise<CreateWebhookResponseDto> {
    const creationResponse = await this.webhooksService.configure(
      channel,
      phoneNumber,
      body,
      tyntecApiKey,
    );

    response.set(DELETING_PATH_HEADER_KEY, creationResponse.webhookDeletePath);
    response.send(creationResponse.result);
    response.status(HttpStatus.OK);

    return creationResponse.result;
  }
}
