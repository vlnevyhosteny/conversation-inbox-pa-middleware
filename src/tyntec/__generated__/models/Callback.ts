/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { EventTypes } from './EventTypes';
import type { Header } from './Header';
import type { Signature } from './Signature';

/**
 * A configuration of callbacks to your system
 */
export type Callback = {
  /**
   * The event version to be used.
   */
  callbackVersion?: '2.11' | '2.12';
  signature?: Signature;
  header?: Header;
  /**
   * A webhook for events related to inbound messages
   */
  inboundMessageUrl?: string;
  /**
   * A webhook for events related to message status changes
   */
  messageStatusUrl?: string;
  /**
   * A list of status events to listen to. If empty, all events are submitted.
   *
   */
  eventFilter?: Array<EventTypes>;
};

