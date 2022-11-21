import { HttpStatus, INestApplication, Injectable } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';
import { compileTestingModule } from '../../test/helpers';
import request from 'supertest';
import { ForwardController } from './forward.controller';
import { ForwardToTyntecService } from './to-tyntec/forward-to-tyntec.service';
import { ChannelsDto, ContentTypeDto } from './to-tyntec/to-tyntec.dto';

@Injectable()
class MockedForwardToTyntecService {
  private mockedResponse: Record<string, unknown> | Error = new Error(
    'Not mocked response set',
  );

  public setMockedResponse(response: Record<string, unknown> | Error): void {
    this.mockedResponse = response;
  }

  public forward = (..._: any) => this.mockedResponse;
}

describe('ForwardController', () => {
  let app: INestApplication;

  const requestBody = (channel: ChannelsDto, contentType: ContentTypeDto) => ({
    channel,
    content: {
      contentType,
    },
  });

  beforeEach(async () => {
    const module: TestingModule = await compileTestingModule({
      providers: [
        {
          provide: ForwardToTyntecService,
          useClass: MockedForwardToTyntecService,
        },
      ],
      controllers: [ForwardController],
    });

    app = module.createNestApplication();
    await app.init();
  });

  it('should throw when chennel in param differ from channel in body', async () => {
    const channel = ChannelsDto.whatsapp;
    const body = requestBody(ChannelsDto.viber, ContentTypeDto.text);
    return request(app.getHttpServer())
      .post(`/forward/to/tyntec/${channel}/text`)
      .send(body)
      .expect(400)
      .expect({
        statusCode: HttpStatus.BAD_REQUEST,
        message: `Channel in params [${channel}] not equal with channel in body [${body.channel}].`,
      });
  });
});
