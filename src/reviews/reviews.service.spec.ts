import { Test, TestingModule } from '@nestjs/testing';
import { ReviewsService } from './reviews.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { Book } from '../book/entities/book.entity';
import { Repository } from 'typeorm';

describe('ReviewsService', () => {
  let service: ReviewsService;
  let mockReviewRepo: Partial<Repository<Review>>;
  let mockBookRepo: Partial<Repository<Book>>;

  beforeEach(async () => {
    mockReviewRepo = {
      create: jest.fn(),
      save: jest.fn(),
    };
    mockBookRepo = {
      findOneBy: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReviewsService,
        {
          provide: getRepositoryToken(Review),
          useValue: mockReviewRepo,
        },
        {
          provide: getRepositoryToken(Book),
          useValue: mockBookRepo,
        },
      ],
    }).compile();

    service = module.get<ReviewsService>(ReviewsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a review for a book', async () => {
    const book = { id: 1, title: 'Book' };
    const dto = { content: 'Awesome read', rating: 5 };
    const review = { id: 1, ...dto, book };

    (mockBookRepo.findOneBy as jest.Mock).mockResolvedValue(book);
    (mockReviewRepo.create as jest.Mock).mockReturnValue(review);
    (mockReviewRepo.save as jest.Mock).mockResolvedValue(review);

    const result = await service.create(1, dto);

    expect(mockBookRepo.findOneBy).toHaveBeenCalledWith({ id: 1 });
    expect(mockReviewRepo.create).toHaveBeenCalledWith({ ...dto, book });
    expect(mockReviewRepo.save).toHaveBeenCalledWith(review);
    expect(result).toEqual(review);
  });
});
