import { Controller, Inject } from '@nestjs/common';
import { WebhooksService } from './webhooks.service';

@Controller()
export class WebhooksController {
  constructor(
    @Inject(WebhooksService) private webhooksService: WebhooksService,
  ) {}
}
