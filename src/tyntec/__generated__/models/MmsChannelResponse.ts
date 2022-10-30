/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ChannelResponse } from './ChannelResponse';
import type { PhoneNumberId } from './PhoneNumberId';

export type MmsChannelResponse = (ChannelResponse & {
  id?: PhoneNumberId;
});

