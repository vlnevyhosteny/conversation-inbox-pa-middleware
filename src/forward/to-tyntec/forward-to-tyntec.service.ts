import { Inject, Injectable } from '@nestjs/common';
import { SendMessageResponse, TyntecApiService } from '../../tyntec';
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
      throw e;
    }
  }
}
