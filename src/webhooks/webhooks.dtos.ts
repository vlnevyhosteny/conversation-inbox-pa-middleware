import {
  ChannelCallback,
  SMSChannelResponse,
  ViberChannelResponse,
  WhatsAppChannelResponse,
} from '../tyntec';

export type CreateWebhookDto = ChannelCallback;

export type CreateWebhookResponseDto =
  | ViberChannelResponse
  | WhatsAppChannelResponse
  | SMSChannelResponse;

export enum ChannelsDto {
  whatsapp = 'whatsapp',
  viber = 'viber',
  sms = 'sms',
}
