import { Test } from '@nestjs/testing';
import { BooksService } from './book.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

describe('BooksService', () => {
  let service: BooksService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        BooksService,
        {
          provide: getRepositoryToken(Book),
          useValue: {
            create: jest.fn().mockImplementation((dto) => dto),
            save: jest.fn().mockResolvedValue({ id: 1, title: 'Test', author: 'Test' }),
            find: jest.fn().mockResolvedValue([]),
          },
        },
        {
          provide: CACHE_MANAGER,
          useValue: {
            get: jest.fn(),
            set: jest.fn(),
            del: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<BooksService>(BooksService);
  });

  it('should create a book', async () => {
    const book = await service.create({ title: 'A', author: 'B' });
    expect(book).toEqual({ id: 1, title: 'Test', author: 'Test' });
  });

  it('should return books (empty array)', async () => {
    const books = await service.findAll();
    expect(books).toEqual([]);
  });
});
