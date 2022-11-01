import {
  Body,
  Controller,
  Inject,
  Post,
  Headers,
  HttpCode,
  HttpStatus,
  Param,
  HttpException,
} from '@nestjs/common';
import {
  ApiBody,
  ApiHeader,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { MessageResponse, TyntecApiErorResponses } from '../tyntec';
import { ForwardToTyntecService } from './to-tyntec/forward-to-tyntec.service';
import {
  ChannelsDto,
  ContentTypeDto,
  ToTyntecBodyDto,
} from './to-tyntec/to-tyntec.dto';

@ApiTags('Messages')
@Controller('forward')
export class ForwardController {
  constructor(
    @Inject(ForwardToTyntecService)
    private forwardToTyntecService: ForwardToTyntecService,
  ) {}

  @Post('to/tyntec/:channel/:contentType')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiResponse({
    status: HttpStatus.ACCEPTED,
    description:
      'Message accepted. Ref to [Tyntec API](https://api.tyntec.com/reference/conversations/current.html#whatsapp-messageresponse)',
  })
  @TyntecApiErorResponses()
  @ApiHeader({
    name: 'tyntec-api-key',
    description: 'Api key to access Tyntec Conversation API',
  })
  @ApiBody({
    description:
      'Ref to [Tyntec API](https://api.tyntec.com/reference/conversations/current.html#whatsapp)',
  })
  @ApiParam({
    name: 'channel',
    enum: ChannelsDto,
  })
  @ApiParam({
    name: 'messageType',
    enum: ContentTypeDto,
  })
  public send(
    @Body() body: ToTyntecBodyDto,
    @Headers('tyntec-api-key') tyntecApiKey: string,
    @Param('channel') channel: ChannelsDto,
    @Param('contentType') contentType: ContentTypeDto,
  ): Promise<MessageResponse> {
    if (channel !== body.channel) {
      throw new HttpException(
        `Channel in params [${channel}] not equal with channel in body [${body.channel}].`,
        HttpStatus.BAD_REQUEST,
      );
    }

    if (contentType !== body.content.contentType) {
      throw new HttpException(
        `ContentType in params [${contentType}] not equal with contentType in body [${body.content?.contentType}].`,
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.forwardToTyntecService.forward(body, tyntecApiKey);
  }
}
