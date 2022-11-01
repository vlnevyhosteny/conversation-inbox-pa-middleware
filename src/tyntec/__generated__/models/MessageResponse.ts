/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * The response after the server has accepted the request
 */
export type MessageResponse = {
  /**
   * Global Message Id reference
   */
  messageId: string;
  /**
   * Point in time when the API confirms that the message request was accepted
   */
  timestamp: string;
};

