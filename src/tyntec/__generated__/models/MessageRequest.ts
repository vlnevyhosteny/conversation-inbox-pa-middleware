/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { MessageRequestOverrides } from './MessageRequestOverrides';

/**
 * The message you would like to send
 */
export type MessageRequest = {
  /**
   * The message's recipient
   * The format depends on the specific channel
   *
   */
  to: string;
  /**
   * The sender of the messages. The format depends on the specific channel.
   *
   */
  from: string;
  /**
   * The channel selected for delivery.
   */
  channel: string;
  overrides?: MessageRequestOverrides;
  /**
   * The context for this particular message
   */
  context?: string;
  content?: any;
};

