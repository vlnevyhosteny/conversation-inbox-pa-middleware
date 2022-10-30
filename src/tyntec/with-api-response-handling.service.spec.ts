import { HttpException, HttpStatus } from '@nestjs/common';
import { WithApiResponseHandling } from './with-api-response-handling.service';
import { ApiError } from './__generated__';

class TestClass extends WithApiResponseHandling {}

describe('WithApiResponseHandlingService', () => {
  let service: TestClass;

  const url = 'some.url';

  beforeEach(() => {
    service = new TestClass();
  });

  it('creates Forbidden Exception', () => {
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

    const expected = new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    expected.cause = cause;

    expect(service.toHttpException(HttpStatus.FORBIDDEN, cause)).toMatchObject(
      expected,
    );
  });

  it('creates Unauthorized Exception', () => {
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

    const expected = new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    expected.cause = cause;

    expect(
      service.toHttpException(HttpStatus.UNAUTHORIZED, cause),
    ).toMatchObject(expected);
  });

  it('creates Bad Request Exception', () => {
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

    const expected = new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    expected.cause = cause;

    const exception = service.toHttpException(HttpStatus.BAD_REQUEST, cause);

    expect(exception.getStatus()).toBe(HttpStatus.BAD_REQUEST);
    expect(exception.cause).toMatchObject(cause);
  });

  it('creates Internal Service Error Exception', () => {
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

    const expected = new HttpException(
      'Internal Server Error',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
    expected.cause = cause;

    const exception = service.toHttpException(
      HttpStatus.INTERNAL_SERVER_ERROR,
      cause,
    );

    expect(exception.getStatus()).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
    expect(exception.cause).toMatchObject(cause);
  });

  it('creates Bad request error for problem response with status 400', () => {
    const problem = {
      status: 400,
      detail: 'validate.request.whatsapp.contentType must not be empty',
      title: 'Constraint Violation',
    };

    const exception = service.toHttpException(HttpStatus.BAD_REQUEST, problem);

    expect(exception.message).toBe(problem.detail);
    expect(exception.cause).toMatchObject(new Error(problem.detail));
  });
});
