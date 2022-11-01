import {
  Body,
  Controller,
  Inject,
  Post,
  Headers,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { MessageResponse } from '../tyntec';
import { ForwardToTyntecService } from './to-tyntec/forward-to-tyntec.service';
import { ToTyntecBodyDto } from './to-tyntec/to-tyntec.dto';

@Controller('forward')
export class ForwardController {
  constructor(
    @Inject(ForwardToTyntecService)
    private forwardToTyntecService: ForwardToTyntecService,
  ) {}

  @Post('to/tyntec')
  @HttpCode(HttpStatus.ACCEPTED)
  public send(
    @Body() body: ToTyntecBodyDto, // TODO: produce invalid docs
    @Headers('tyntec-api-key') tyntecApiKey: string,
  ): Promise<MessageResponse> {
    return this.forwardToTyntecService.forward(body, tyntecApiKey);
  }
}
