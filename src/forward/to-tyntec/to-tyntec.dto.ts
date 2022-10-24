import {
  SendAudioMessageBodyType,
  SendContactMessageBodyType,
  SendDocumentMessageBodyType,
  SendGifMessageBodyType,
  SendImageMessageBodyType,
  SendLocationMessageBodyType,
  SendStickerMessageBodyType,
  SendTemplateMessageBodyType,
  SendTextMessageBodyType,
  SendVideoMessageBodyType,
  SendVoiceMessageBodyType,
} from '../../tyntec';

export class ToTyntecBodyDto {
  /**
   * Jabber IDs to represent channel
   */
  channelJid: string;
  /**
   * Jabber IDs to represent contacts
   */
  contactJid: string;
  /**
   * The message you would like to send
   */
  requestBody:
    | SendTextMessageBodyType
    | SendVideoMessageBodyType
    | SendTemplateMessageBodyType
    | SendStickerMessageBodyType
    | SendVoiceMessageBodyType
    | SendLocationMessageBodyType
    | SendImageMessageBodyType
    | SendGifMessageBodyType
    | SendDocumentMessageBodyType
    | SendContactMessageBodyType
    | SendAudioMessageBodyType;
}
