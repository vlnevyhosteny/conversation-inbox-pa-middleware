/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AllChannelResponses } from '../models/AllChannelResponses';
import type { MmsChannelResponses } from '../models/MmsChannelResponses';
import type { SMSChannelResponses } from '../models/SMSChannelResponses';
import type { TelegramChannelResponses } from '../models/TelegramChannelResponses';
import type { ViberChannelResponses } from '../models/ViberChannelResponses';
import type { WeChatChannelResponses } from '../models/WeChatChannelResponses';
import type { WhatsAppChannelResponses } from '../models/WhatsAppChannelResponses';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class ChannelConfigurationsService {

  constructor(public readonly httpRequest: BaseHttpRequest) {}

  /**
   * List all channels
   * List all channels available to your API account
   * @returns AllChannelResponses A list of all channel configurations
   * @throws ApiError
   */
  public listAllChannels(): CancelablePromise<AllChannelResponses> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/configurations/channels',
    });
  }

  /**
   * List all SMS channels
   * List all Inbound SMS channels available to your API account
   * @returns SMSChannelResponses A list of SMS channel configurations
   * @throws ApiError
   */
  public listAllSmsChannels(): CancelablePromise<SMSChannelResponses> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/configurations/channels/sms',
    });
  }

  /**
   * List all Telegram channels
   * List all Telegram channels available to your API account
   * @returns TelegramChannelResponses A list of Telegram channel configurations
   * @throws ApiError
   */
  public listAllTelegramChannels(): CancelablePromise<TelegramChannelResponses> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/configurations/channels/telegram',
    });
  }

  /**
   * List all Mms channels
   * List all Mms channels available to your API account
   * @returns MmsChannelResponses A list of Mms channel configurations
   * @throws ApiError
   */
  public listAllMmsChannels(): CancelablePromise<MmsChannelResponses> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/configurations/channels/mms',
    });
  }

  /**
   * List all Viber channels
   * List all Viber channels available to your API account
   * @returns ViberChannelResponses A list of Viber channel configurations
   * @throws ApiError
   */
  public listAllViberChannels(): CancelablePromise<ViberChannelResponses> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/configurations/channels/viber',
    });
  }

  /**
   * List all WeChat channels
   * List all WeChat channels available to your API account
   * @returns WeChatChannelResponses A list of WeChat channel configurations
   * @throws ApiError
   */
  public listAllWeChatChannels(): CancelablePromise<WeChatChannelResponses> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/configurations/channels/wechat',
    });
  }

  /**
   * List all WhatsApp channels
   * List all WhatsApp channels available to your API account
   * @returns WhatsAppChannelResponses A list of Whatsapp channel configurations
   * @throws ApiError
   */
  public listAllWhatsAppChannels(): CancelablePromise<WhatsAppChannelResponses> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/configurations/channels/whatsapp',
    });
  }

}
