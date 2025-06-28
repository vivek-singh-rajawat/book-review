import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book) private bookRepo: Repository<Book>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async create(dto: CreateBookDto): Promise<Book> {
    const book = this.bookRepo.create(dto);
    const saved = await this.bookRepo.save(book);
    await this.cacheManager.del('books'); // Clear books cache
    return saved;
  }

  async findAll(): Promise<Book[]> {
    // Try to get from cache first
    const cachedBooks = await this.cacheManager.get<Book[]>('books');
    
    if (cachedBooks) {
      return cachedBooks;
    }

    // If not in cache, fetch from database
    const books = await this.bookRepo.find({
      order: { id: 'DESC' }, // Optional: order by newest first
    });

    // Cache the result for 5 minutes (300 seconds)
    await this.cacheManager.set('books', books, 300);
    
    return books;
  }

   findOne(id: number) {
    return this.bookRepo.findOne({ where: { id }, relations: ['reviews'] });
  }
}
  

