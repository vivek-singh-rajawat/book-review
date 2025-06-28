import { Test, TestingModule } from '@nestjs/testing';
import { BookController } from './book.controller';
import { BooksService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';

describe('BooksController', () => {
  let controller: BookController;
  let service: BooksService;

  const mockBooksService = {
    create: jest.fn((dto: CreateBookDto) => ({
      id: 1,
      ...dto,
    })),
    findAll: jest.fn(() => [
      { id: 1, title: 'Test Book', author: 'Author 1' },
    ]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookController],
      providers: [
        {
          provide: BooksService,
          useValue: mockBooksService,
        },
      ],
    }).compile();

    controller = module.get<BookController>(BookController);
    service = module.get<BooksService>(BooksService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all books', async () => {
    const result = await controller.findAll();
    expect(result).toEqual([
      { id: 1, title: 'Test Book', author: 'Author 1' },
    ]);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should create a book', async () => {
    const dto: CreateBookDto = {
      title: 'New Book',
      author: 'New Author',
    };
    const result = await controller.create(dto);
    expect(result).toEqual({
      id: 1,
      title: 'New Book',
      author: 'New Author',
    });
    expect(service.create).toHaveBeenCalledWith(dto);
  });
});
