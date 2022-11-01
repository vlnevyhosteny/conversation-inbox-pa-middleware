import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TestingModule } from '@nestjs/testing';
import exp from 'constants';
import { compileTestingModule } from '../../test/helpers';
import { configKeys } from '../config';
import { ApiError, TyntecApiService } from '../tyntec';
import { WebhooksService } from './webhooks.service';

@Injectable()
class MockedTyntecApiService {
  private mockedResponse: Record<string, unknown> | Error = new Error(
    'Not mocked response set',
  );

  public setMockedResponse(response: Record<string, unknown> | Error): void {
    this.mockedResponse = response;
  }

  public api = (...params: any) => ({
    apiAccountConfigurations: {
      updateAccountCallback: (_: unknown) => {
        if (this.mockedResponse instanceof Error) {
          throw this.mockedResponse;
        } else {
          return this.mockedResponse;
        }
      },
    },
  });
}

describe('ForwardToTyntecService', () => {
  let service: WebhooksService;
  let mockedApiService: MockedTyntecApiService;
  let configService: ConfigService;

  let url: string;

  const apiKey = 'some-api-key';
  const inboundMessageUrl = 'some.webhook.url';
  const requestBody = {
    inboundMessageUrl,
  };

  beforeEach(async () => {
    const app: TestingModule = await compileTestingModule({
      providers: [
        {
          provide: TyntecApiService,
          useClass: MockedTyntecApiService,
        },
        WebhooksService,
      ],
    });

    service = app.get(WebhooksService);
    mockedApiService = app.get(TyntecApiService);
    configService = app.get(ConfigService);

    url = configService.getOrThrow(configKeys.tyntec.baseUrl);
  });

  it('should create a webhook', async () => {
    const successfullResponse = {
      scopes: ['channels:read'],
      callback: {
        callbackVersion: '2.12',
        inboundMessageUrl,
      },
    };

    mockedApiService.setMockedResponse(successfullResponse);

    const result = await service.configure(requestBody, apiKey);

    expect(result.result).toMatchObject(successfullResponse);
    expect(result.webhookDeletePath).toBe('test.delete.path');
  });

  it('should throws an Bad Gateway error for unknown Error', async () => {
    const errorMessage = 'Something is wrong with middleware';
    mockedApiService.setMockedResponse(new Error(errorMessage));

    await expect(service.configure(requestBody, apiKey)).rejects.toThrow(
      new Error(errorMessage),
    );
  });

  it('should throws an Unauthorized error for 401 response', async () => {
    const cause = new ApiError(
      {
        method: 'POST',
        url,
      },
      {
        body: {
          message: 'Unauthorized',
        },
        ok: false,
        status: HttpStatus.UNAUTHORIZED,
        url,
        statusText: 'Unauthorized',
      },
      'Unauthorized',
    );
    mockedApiService.setMockedResponse(cause);

    await expect(service.configure(requestBody, apiKey)).rejects.toThrow(
      new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED),
    );
  });
});
