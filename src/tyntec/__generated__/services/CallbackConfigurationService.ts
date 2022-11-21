/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ChannelCallback } from '../models/ChannelCallback';
import type { Problem } from '../models/Problem';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class CallbackConfigurationService {

  constructor(public readonly httpRequest: BaseHttpRequest) {}

  /**
   * Update the callback
   * Update the callback settings of a specific phone number.
   * @returns any
   * @returns Problem The default response in case of any other error. Please check the error object for details
   * @throws ApiError
   */
  public updateWhatsAppChannelCallback({
    phoneNumber,
    requestBody,
  }: {
    /**
     * The phone number used for WhatsApp messaging
     */
    phoneNumber: number,
    requestBody?: ChannelCallback,
  }): CancelablePromise<any | Problem> {
    return this.httpRequest.request({
      method: 'PUT',
      url: '/configurations/channels/whatsapp/phone-numbers/{phone-number}/callbacks',
      path: {
        'phone-number': phoneNumber,
      },
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        400: `The request does not match our expectations. Please check the Problems object for details`,
        403: `You attempting to use a number that is not assigned to your account`,
      },
    });
  }

  /**
   * Update the callback
   * Update the callback settings for a specific inbound phone number. **Note** The complete object must be provided
   * @returns any
   * @returns Problem The default response in case of any other error. Please check the error object for details
   * @throws ApiError
   */
  public updateSmsChannelCallback({
    phoneNumber,
    requestBody,
  }: {
    /**
     * The phone number used for WhatsApp messaging
     */
    phoneNumber: number,
    requestBody?: ChannelCallback,
  }): CancelablePromise<any | Problem> {
    return this.httpRequest.request({
      method: 'PUT',
      url: '/configurations/channels/sms/phone-numbers/{phone-number}/callbacks',
      path: {
        'phone-number': phoneNumber,
      },
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        400: `The request does not match our expectations. Please check the Problems object for details`,
        403: `You attempting to use a number that is not assigned to your account`,
      },
    });
  }

  /**
   * Update the callback
   * Update the callback settings of a specific Service ID.
   * @returns any
   * @returns Problem The default response in case of any other error. Please check the error object for details
   * @throws ApiError
   */
  public updateViberChannelCallback({
    serviceId,
    requestBody,
  }: {
    /**
     * The Service ID used for a Viber Channel.
     */
    serviceId: number,
    requestBody?: ChannelCallback,
  }): CancelablePromise<any | Problem> {
    return this.httpRequest.request({
      method: 'PUT',
      url: '/configurations/channels/viber/service-ids/{service-id}/callbacks',
      path: {
        'service-id': serviceId,
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
