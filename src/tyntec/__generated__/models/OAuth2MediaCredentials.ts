/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Oauth 2 credentials. **Only** supports _client secret_ flow
 */
export type OAuth2MediaCredentials = {
  /**
   * Determines the type of credentials. Always _oauth2_.
   */
  type?: 'oauth2';
  oauth2?: {
    clientId: string;
    clientSecret: string;
    url: string;
  };
};

