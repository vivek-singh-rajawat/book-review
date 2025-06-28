import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BooksModule } from './book/book.module';
import { CacheModule } from './cache/cache.module';
import { Book } from './book/entities/book.entity';
import { ReviewsModule } from './reviews/reviews.module';
import { Review } from './reviews/entities/review.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres' as const,
        url: configService.get<string>('DATABASE_URL'),
        entities: [Book, Review],
        synchronize: process.env.NODE_ENV !== 'production',
        ssl: configService.get<string>('DATABASE_URL')?.includes('sslmode=require') 
          ? { rejectUnauthorized: false } 
          : false,
        logging: process.env.NODE_ENV === 'development',
      }),
      inject: [ConfigService],
    }),
    CacheModule,
    BooksModule,
    ReviewsModule,
  ],
})
export class AppModule {}