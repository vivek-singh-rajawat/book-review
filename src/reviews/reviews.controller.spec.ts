import { Test, TestingModule } from '@nestjs/testing';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';

describe('ReviewsController', () => {
  let controller: ReviewsController;
  let service: ReviewsService;

  const mockReviewsService = {
    create: jest.fn((bookId: number, dto: CreateReviewDto) => ({
      id: 1,
      content: dto.content,
      book: { id: bookId },
    })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReviewsController],
      providers: [
        {
          provide: ReviewsService,
          useValue: mockReviewsService,
        },
      ],
    }).compile();

    controller = module.get<ReviewsController>(ReviewsController);
    service = module.get<ReviewsService>(ReviewsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a review', async () => {
    const dto: CreateReviewDto = { content: 'Good book' };
    const result = await controller.create('1', dto);

    expect(result).toEqual({
      id: 1,
      content: 'Good book',
      book: { id: 1 },
    });

    expect(service.create).toHaveBeenCalledWith(1, dto);
  });
});
