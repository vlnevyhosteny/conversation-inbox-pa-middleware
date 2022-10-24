import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { configKeys } from "../config";
import { TyntecApi } from "./__generated__";

@Injectable()
export class TyntecApiModule {

  public api: TyntecApi;

  constructor(@Inject(ConfigService) config: ConfigService) {
    this.api = new TyntecApi({
      BASE: config.getOrThrow(configKeys.tyntec.baseUrl),
      TOKEN: config.getOrThrow(configKeys.tyntec.apiKey)
    })
  }
}