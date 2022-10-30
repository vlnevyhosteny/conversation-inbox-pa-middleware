/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * An additional custom header to be sent with the event transmission. Can be used for setting
 * authentication tokens, or similar.
 *
 */
export type Header = {
  /**
   * The name of the HTTP header
   */
  key: string;
  /**
   * The value of the HTTP header
   */
  value: string;
};

