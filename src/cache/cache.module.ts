import { Module, Global } from '@nestjs/common';
import { CacheModule as NestCacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-ioredis';

@Global()
@Module({
  imports: [
    NestCacheModule.register({
      store: redisStore,
      host: process.env.REDIS_HOST,
      port: (process.env.REDIS_PORT),
    }),
  ],
  exports: [NestCacheModule],
})
export class CacheModule {}
