import { Body, Controller, Inject, Post, Headers } from '@nestjs/common';
import { SendMessageResponse } from '../tyntec';
import { ForwardToTyntecService } from './to-tyntec/forward-to-tyntec.service';
import { ToTyntecBodyDto } from './to-tyntec/to-tyntec.dto';

@Controller('forward')
export class ForwardController {
  constructor(
    @Inject(ForwardToTyntecService)
    private forwardToTyntecService: ForwardToTyntecService,
  ) {}

  @Post('to/tyntec')
  public send(
    @Body() body: ToTyntecBodyDto,
    @Headers('tyntec-api-key') tyntecApiKey: string,
  ): Promise<SendMessageResponse> {
    return this.forwardToTyntecService.forward(body, tyntecApiKey);
  }
}
