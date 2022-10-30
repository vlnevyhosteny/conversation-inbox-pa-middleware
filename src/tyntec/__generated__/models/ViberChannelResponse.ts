/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ChannelResponse } from './ChannelResponse';
import type { ServiceId } from './ServiceId';
import type { ViberChannelConfigs } from './ViberChannelConfigs';

export type ViberChannelResponse = (ChannelResponse & {
  id?: ServiceId;
  config?: ViberChannelConfigs;
});

