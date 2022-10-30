import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TestingModule } from '@nestjs/testing';
import { randomUUID } from 'crypto';
import { compileTestingModule } from '../../../test/helpers';
import { configKeys } from '../../config';
import {
  ApiError,
  SendTextMessageBodyType,
  TyntecApiService,
} from '../../tyntec';
import { ForwardToTyntecService } from './forward-to-tyntec.service';
import { ToTyntecBodyDto } from './to-tyntec.dto';

@Injectable()
class MockedTyntecApiService {
  private mockedResponse: Record<string, unknown> | Error = new Error(
    'Not mocked response set',
  );

  public setMockedResponse(response: Record<string, unknown> | Error): void {
    this.mockedResponse = response;
  }

  public api = (...params: any) => ({
    messaging: {
      sendMessage: (_: ToTyntecBodyDto) => {
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
  let service: ForwardToTyntecService;
  let mockedApiService: MockedTyntecApiService;
  let configService: ConfigService;

  const channelJid = 'whatsapp.eazy.im';
  const contactJid = '31611111111';
  const apiKey = 'some-api-key';

  const requestBody: SendTextMessageBodyType = {
    type: 'text',
    body: 'hello world',
  };

  beforeEach(async () => {
    const app: TestingModule = await compileTestingModule({
      providers: [
        {
          provide: TyntecApiService,
          useClass: MockedTyntecApiService,
        },
        ForwardToTyntecService,
      ],
    });

    service = app.get(ForwardToTyntecService);
    mockedApiService = app.get(TyntecApiService);
    configService = app.get(ConfigService);
  });

  it('should forward message to Tyntec', async () => {
    const succesfullResponse = {
      id: randomUUID(),
    };

    mockedApiService.setMockedResponse(succesfullResponse);

    const result = await service.forward(
      {
        channelJid,
        contactJid,
        requestBody,
      },
      apiKey,
    );

    expect(result).toMatchObject(succesfullResponse);
  });

  it('should throws an Bad Gateway error for unknown Error', async () => {
    const errorMessage = 'Something is wrong with middleware';
    mockedApiService.setMockedResponse(new Error(errorMessage));

    await expect(
      service.forward(
        {
          channelJid,
          contactJid,
          requestBody,
        },
        apiKey,
      ),
    ).rejects.toThrow(new Error(errorMessage));
  });

  it('should throws an Forbidden error for 403 response', async () => {
    const url = configService.getOrThrow(configKeys.tyntec.baseUrl);

    const cause = new ApiError(
      {
        method: 'POST',
        url,
      },
      {
        body: {
          message: 'Forbidden',
        },
        ok: false,
        status: HttpStatus.FORBIDDEN,
        url,
        statusText: 'Forbidden',
      },
      'Bad Request',
    );
    mockedApiService.setMockedResponse(cause);

    await expect(
      service.forward(
        {
          channelJid,
          contactJid,
          requestBody,
        },
        apiKey,
      ),
    ).rejects.toThrow(
      (new HttpException(
        'Access to Tyntec Conversation Inbox forbidden',
        HttpStatus.FORBIDDEN,
      ).cause = cause),
    );
  });
});
