/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ChannelCallback } from './ChannelCallback';
import type { ChannelScopes } from './ChannelScopes';

/**
 * General channel configuration
 */
export type ChannelResponse = {
  channel?: string;
  scopes?: Array<ChannelScopes>;
  callback?: ChannelCallback;
  name?: string;
};

