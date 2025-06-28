import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookController } from './book.controller';
import { BooksService } from './book.service';
import { Book } from './entities/book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book])],
  controllers: [BookController],
  providers: [BooksService],
  exports: [BooksService],
})
export class BooksModule {}
