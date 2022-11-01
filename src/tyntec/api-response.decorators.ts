import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

export function TyntecApiErorResponses() {
  return applyDecorators(
    ApiResponse({
      status: HttpStatus.BAD_GATEWAY,
      description: 'There is error on middleware side.',
    }),
    ApiResponse({
      status: HttpStatus.FORBIDDEN,
      description: 'Access to Tyntec Conversation forbidden.',
    }),
    ApiResponse({
      status: HttpStatus.UNAUTHORIZED,
      description: 'Access to Tyntec Conversation is not authorized.',
    }),
    ApiResponse({
      status: HttpStatus.BAD_REQUEST,
      description: 'Invalid request to Tyntec Conversation.',
    }),
  );
}
