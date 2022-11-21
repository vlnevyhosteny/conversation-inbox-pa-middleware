/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseHttpRequest } from './core/BaseHttpRequest';
import type { OpenAPIConfig } from './core/OpenAPI';
import { AxiosHttpRequest } from './core/AxiosHttpRequest';

import { CallbackConfigurationService } from './services/CallbackConfigurationService';
import { MessagingService } from './services/MessagingService';

type HttpRequestConstructor = new (config: OpenAPIConfig) => BaseHttpRequest;

export class TyntecApi {

  public readonly callbackConfiguration: CallbackConfigurationService;
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

    this.callbackConfiguration = new CallbackConfigurationService(this.request);
    this.messaging = new MessagingService(this.request);
  }
}

