/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * A signature configuration for incoming events. Can be disabled by setting the
 * signature property to empty.
 *
 */
export type Signature = {
  /**
   * A shared secret key
   */
  secret: string;
  /**
   * A cryptographic algorithm used for signature calculation
   */
  method: 'HS256' | 'HS512';
};

