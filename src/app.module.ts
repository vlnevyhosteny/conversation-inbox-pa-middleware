import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ForwardController, ForwardToTyntecService } from './forward';
import { TyntecApiService } from './tyntec';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: ['.env', '.env.development.local'],
  })],
  controllers: [ForwardController],
  providers: [TyntecApiService, ForwardToTyntecService],
})
export class AppModule {}
