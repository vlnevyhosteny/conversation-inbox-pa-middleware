/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ChannelResponse } from './ChannelResponse';
import type { WeChatCredentials } from './WeChatCredentials';
import type { WeChatId } from './WeChatId';

export type WeChatChannelResponse = (ChannelResponse & {
  id?: WeChatId;
  credentials?: WeChatCredentials;
});

