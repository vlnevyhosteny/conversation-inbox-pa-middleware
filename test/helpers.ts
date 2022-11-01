import { ModuleMetadata } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { ForwardToTyntecService } from '../src/forward';
import { TyntecApiService } from '../src/tyntec';

export const compileTestingModule = async (
  {
    providers,
    controllers,
  }: Pick<ModuleMetadata, 'providers' | 'controllers'> = {
    providers: [TyntecApiService, ForwardToTyntecService],
    controllers: [],
  },
) =>
  Test.createTestingModule({
    imports: [
      ConfigModule.forRoot({
        envFilePath: ['.env.test'],
      }),
    ],
    providers,
    controllers,
  }).compile();
