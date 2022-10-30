/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { MmsChannelResponse } from './MmsChannelResponse';
import type { SMSChannelResponse } from './SMSChannelResponse';
import type { TelegramChannelResponse } from './TelegramChannelResponse';
import type { ViberChannelResponse } from './ViberChannelResponse';
import type { WeChatChannelResponse } from './WeChatChannelResponse';
import type { WhatsAppChannelResponse } from './WhatsAppChannelResponse';

export type AllChannelResponses = Array<(SMSChannelResponse | TelegramChannelResponse | MmsChannelResponse | ViberChannelResponse | WeChatChannelResponse | WhatsAppChannelResponse)>;
