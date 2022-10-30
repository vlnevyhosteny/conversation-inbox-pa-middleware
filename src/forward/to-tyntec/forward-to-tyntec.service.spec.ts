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
import { ApiError, MessageRequest, TyntecApiService } from '../../tyntec';
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

  let url: string;

  const apiKey = 'some-api-key';

  const requestBody: MessageRequest = {
    to: '123456789',
    from: '987654321',
    channel: 'whatsapp',
    content: {
      contentType: 'text',
      text: 'A simple text message',
    },
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

    url = configService.getOrThrow(configKeys.tyntec.baseUrl);
  });

  it('should forward message to Tyntec', async () => {
    const succesfullResponse = {
      messageId: randomUUID(),
      acceptedAt: new Date(),
    };

    mockedApiService.setMockedResponse(succesfullResponse);

    const result = await service.forward(
      {
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
          requestBody,
        },
        apiKey,
      ),
    ).rejects.toThrow(new Error(errorMessage));
  });

  it('should throws an Forbidden error for 403 response', async () => {
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
      'Forbidden',
    );
    mockedApiService.setMockedResponse(cause);

    await expect(
      service.forward(
        {
          requestBody,
        },
        apiKey,
      ),
    ).rejects.toThrow(new HttpException('Forbidden', HttpStatus.FORBIDDEN));
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

    await expect(
      service.forward(
        {
          requestBody,
        },
        apiKey,
      ),
    ).rejects.toThrow(
      new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED),
    );
  });

  it('should throws an Bad request error for 400 response', async () => {
    const message = 'Given test request is Bad Request';

    const cause = new ApiError(
      {
        method: 'POST',
        url,
      },
      {
        body: {
          message,
        },
        ok: false,
        status: HttpStatus.BAD_REQUEST,
        url,
        statusText: 'Bad Request',
      },
      message,
    );
    mockedApiService.setMockedResponse(cause);

    await expect(
      service.forward(
        {
          requestBody,
        },
        apiKey,
      ),
    ).rejects.toThrow(new HttpException(message, HttpStatus.BAD_REQUEST));
  });

  it('should throws an Internal server error error for 500 response', async () => {
    const message = 'Something is wrong';

    const cause = new ApiError(
      {
        method: 'POST',
        url,
      },
      {
        body: {
          message,
        },
        ok: false,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        url,
        statusText: 'Internal Server Error',
      },
      message,
    );
    mockedApiService.setMockedResponse(cause);

    await expect(
      service.forward(
        {
          requestBody,
        },
        apiKey,
      ),
    ).rejects.toThrow(
      new HttpException(
        'Unknown Error on Tyntec API',
        HttpStatus.INTERNAL_SERVER_ERROR,
      ),
    );
  });

  it('should throws an Bad request error for problem response with status 400', async () => {
    const mockedResponse = {
      status: 400,
      detail: 'validate.request.whatsapp.contentType must not be empty',
      title: 'Constraint Violation',
    };

    mockedApiService.setMockedResponse(mockedResponse);

    await expect(
      service.forward(
        {
          requestBody,
        },
        apiKey,
      ),
    ).rejects.toThrow(
      new HttpException(mockedResponse.detail, mockedResponse.status),
    );
  });

  it('should throws an Bad gateway error for unknown response', async () => {
    const mockedResponse = {
      some: 'Completely unknown response',
    };

    mockedApiService.setMockedResponse(mockedResponse);

    await expect(
      service.forward(
        {
          requestBody,
        },
        apiKey,
      ),
    ).rejects.toThrow(
      new HttpException('Unknown Error on Tyntec API', HttpStatus.BAD_GATEWAY),
    );
  });
});
