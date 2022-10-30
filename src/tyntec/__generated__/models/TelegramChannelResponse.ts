/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ChannelResponse } from './ChannelResponse';
import type { TelegramCredentials } from './TelegramCredentials';
import type { TelegramId } from './TelegramId';

export type TelegramChannelResponse = (ChannelResponse & {
  id?: TelegramId;
  credentials?: TelegramCredentials;
});

