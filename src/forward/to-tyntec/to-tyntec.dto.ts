import { MessageRequest } from '../../tyntec';

export type ToTyntecBodyDto = MessageRequest;

export enum ChannelsDto {
  whatsapp = 'whatsapp',
  viber = 'viber',
}

export enum ContentTypeDto {
  text = 'text',
  video = 'vider',
  image = 'image',
  document = 'document',
  audio = 'audio',
  sticker = 'sticker',
  location = 'location',
  quick = 'quick',
  contacts = 'contacts',
  list = 'list',
  template = 'template',
}
