import { Controller, Post, Body, Get,Param } from '@nestjs/common';
import { BooksService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { Book } from './entities/book.entity';

@Controller('books')
export class BookController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  create(@Body() dto: CreateBookDto) {
    return this.booksService.create(dto);
  }

  @Get()
  findAll(): Promise<Book[]> {
    return this.booksService.findAll();
  }

  @Get(':id/reviews')
  getBookWithReviews(@Param('id') id: string) {
    return this.booksService.findOne(+id);
  }
}

  
