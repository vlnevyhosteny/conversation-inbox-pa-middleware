/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MessageRequest } from '../models/MessageRequest';
import type { MessageResponse } from '../models/MessageResponse';
import type { Problem } from '../models/Problem';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class MessagingService {

  constructor(public readonly httpRequest: BaseHttpRequest) {}

  /**
   * Send a message
   * Send chat messages via this path.
   * @returns Problem The default response in case of any other error. Please check the error object for details
   * @returns MessageResponse The message is accepted by our system
   * @throws ApiError
   */
  public sendMessage({
    requestBody,
    xTyntecMessageSource = 'core-api',
  }: {
    /**
     * The message you would like to send
     */
    requestBody: MessageRequest,
    /**
     * an authorization header
     */
    xTyntecMessageSource?: 'conversations-inbox' | 'power-automate' | 'zapier' | 'slack' | 'node-red' | 'core-api',
  }): CancelablePromise<Problem | MessageResponse> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/messages',
      headers: {
        'x-tyntec-message-source*': xTyntecMessageSource,
      },
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        400: `The request does not match our expectations. Please check the Problems object for details`,
        403: `You attempting to use a number that is not assigned to your account`,
      },
    });
  }

}
