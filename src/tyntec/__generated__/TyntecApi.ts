/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseHttpRequest } from './core/BaseHttpRequest';
import type { OpenAPIConfig } from './core/OpenAPI';
import { AxiosHttpRequest } from './core/AxiosHttpRequest';

import { ApiAccountConfigurationsService } from './services/ApiAccountConfigurationsService';
import { ChannelConfigurationsService } from './services/ChannelConfigurationsService';
import { MessagingService } from './services/MessagingService';

type HttpRequestConstructor = new (config: OpenAPIConfig) => BaseHttpRequest;

export class TyntecApi {

  public readonly apiAccountConfigurations: ApiAccountConfigurationsService;
  public readonly channelConfigurations: ChannelConfigurationsService;
  public readonly messaging: MessagingService;

  public readonly request: BaseHttpRequest;

  constructor(config?: Partial<OpenAPIConfig>, HttpRequest: HttpRequestConstructor = AxiosHttpRequest) {
    this.request = new HttpRequest({
      BASE: config?.BASE ?? 'https://api.tyntec.com/conversations/v3',
      VERSION: config?.VERSION ?? '3.0',
      WITH_CREDENTIALS: config?.WITH_CREDENTIALS ?? false,
      CREDENTIALS: config?.CREDENTIALS ?? 'include',
      TOKEN: config?.TOKEN,
      USERNAME: config?.USERNAME,
      PASSWORD: config?.PASSWORD,
      HEADERS: config?.HEADERS,
      ENCODE_PATH: config?.ENCODE_PATH,
    });

    this.apiAccountConfigurations = new ApiAccountConfigurationsService(this.request);
    this.channelConfigurations = new ChannelConfigurationsService(this.request);
    this.messaging = new MessagingService(this.request);
  }
}

