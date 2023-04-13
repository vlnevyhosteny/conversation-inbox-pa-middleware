import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ForwardController, ForwardToTyntecService } from './forward';
import { TyntecApiService } from './tyntec';
import { WebhooksController } from './webhooks/webhooks.controller';
import { WebhooksService } from './webhooks/webhooks.service';
import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env', '.env.development.local'],
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        redact: {
          paths: ['req.headers.apikey'],
        },
        // TODO: Log request body is just for debug purpose. Should be deleted later.
        serializers: {
          req(req) {
            req.body = req.raw.body;
            return req;
          },
        },
      },
    }),
  ],
  controllers: [ForwardController, WebhooksController],
  providers: [TyntecApiService, ForwardToTyntecService, WebhooksService],
})
export class AppModule {}
