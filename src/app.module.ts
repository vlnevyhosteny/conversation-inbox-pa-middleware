import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ForwardController, ForwardToTyntecService } from './forward';
import { TyntecApiService } from './tyntec';
import { WebhooksController } from './webhooks/webhooks.controller';
import { WebhooksService } from './webhooks/webhooks.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env', '.env.development.local'],
    }),
  ],
  controllers: [ForwardController, WebhooksController],
  providers: [TyntecApiService, ForwardToTyntecService, WebhooksService],
})
export class AppModule {}
