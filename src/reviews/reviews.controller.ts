import { Controller, Post, Body, Param } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';

@Controller('books/:bookId/reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  create(@Param('bookId') bookId: string, @Body() dto: CreateReviewDto) {
    return this.reviewsService.create(+bookId, dto);
  }
}
