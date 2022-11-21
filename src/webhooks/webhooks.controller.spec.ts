import { INestApplication, Injectable } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';
import { compileTestingModule } from '../../test/helpers';
import {
  DELETING_PATH_HEADER_KEY,
  WebhooksController,
} from './webhooks.controller';
import { ConfigureResponse, WebhooksService } from './webhooks.service';
import request from 'supertest';
import { ChannelsDto, CreateWebhookResponseDto } from './webhooks.dtos';

@Injectable()
class MockedWebhooksService {
  private mockedResponse: ConfigureResponse | Error = new Error(
    'Not mocked response set',
  );

  public setMockedResponse(response: ConfigureResponse | Error): void {
    this.mockedResponse = response;
  }

  public configure = (..._: any) => this.mockedResponse;
}

describe('WebhooksController', () => {
  let app: INestApplication;
  let mockedService: MockedWebhooksService;

  const channel = ChannelsDto.whatsapp;
  const phoneNumber = 15559876543;

  beforeEach(async () => {
    const module: TestingModule = await compileTestingModule({
      providers: [
        {
          provide: WebhooksService,
          useClass: MockedWebhooksService,
        },
      ],
      controllers: [WebhooksController],
    });

    app = module.createNestApplication();
    await app.init();

    mockedService = app.get(WebhooksService);
  });

  describe('/POST webhooks', () => {
    it('successfully creates webhook', async () => {
      const inboundMessageUrl = 'some.webhook.url';
      const successfullResponse: CreateWebhookResponseDto = {
        scopes: ['channels:read'],
        callback: {
          callbackVersion: '2.11',
          inboundMessageUrl,
        },
      };

      const webhookDeletePath = 'delete.path';

      mockedService.setMockedResponse({
        result: successfullResponse,
        webhookDeletePath,
      });

      return request(app.getHttpServer())
        .post(`/webhooks/channels/${channel}/phone-numbers/${phoneNumber}`)
        .expect(200)
        .expect(successfullResponse)
        .expect((res) => {
          expect(res.headers[DELETING_PATH_HEADER_KEY]).toBe(webhookDeletePath);
        });
    });
  });
});
