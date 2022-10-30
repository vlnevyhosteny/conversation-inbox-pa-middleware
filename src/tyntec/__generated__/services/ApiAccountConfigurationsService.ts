/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AccountConfiguration } from '../models/AccountConfiguration';
import type { Callback } from '../models/Callback';
import type { MediaCredentials } from '../models/MediaCredentials';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class ApiAccountConfigurationsService {

  constructor(public readonly httpRequest: BaseHttpRequest) {}

  /**
   * Get account configuration
   * Returns the configuration of the API account
   * @returns AccountConfiguration The configuration of the account
   * @throws ApiError
   */
  public getAccountConfiguration(): CancelablePromise<AccountConfiguration> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/configurations',
    });
  }

  /**
   * Update the callback
   * Update the callback settings of the account. **Note** The complete object must be provided
   * @returns AccountConfiguration The configuration of the account
   * @throws ApiError
   */
  public updateAccountCallback({
    requestBody,
  }: {
    requestBody?: Callback,
  }): CancelablePromise<AccountConfiguration> {
    return this.httpRequest.request({
      method: 'PUT',
      url: '/configurations/callbacks',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * Update the media credentials
   * Update the media credentials of the account.
   * @returns AccountConfiguration The configuration of the account
   * @throws ApiError
   */
  public updateAccountMediaCredentialsCallback({
    requestBody,
  }: {
    requestBody?: MediaCredentials,
  }): CancelablePromise<AccountConfiguration> {
    return this.httpRequest.request({
      method: 'PUT',
      url: '/configurations/mediaCredentials',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * Remove the media credentials
   * Remove the media credentials of the account.
   * @returns AccountConfiguration The configuration of the account
   * @throws ApiError
   */
  public removeAccountMediaCredentials(): CancelablePromise<AccountConfiguration> {
    return this.httpRequest.request({
      method: 'DELETE',
      url: '/configurations/mediaCredentials',
    });
  }

}
