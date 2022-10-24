import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { configKeys } from '../config';
import { TyntecApi } from './__generated__';

@Injectable()
export class TyntecApiService {
  private baseUrl: string;

  constructor(@Inject(ConfigService) config: ConfigService) {
    this.baseUrl = config.getOrThrow(configKeys.tyntec.baseUrl);
  }

  public api = (token: string) =>
    new TyntecApi({ TOKEN: token, BASE: this.baseUrl });
}
