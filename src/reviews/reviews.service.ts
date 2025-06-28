import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { Book } from '../book/entities/book.entity';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private reviewRepo: Repository<Review>,
    @InjectRepository(Book)
    private bookRepo: Repository<Book>,
  ) {}

  async create(bookId: number, dto: CreateReviewDto) {
    const book = await this.bookRepo.findOneBy({ id: bookId });
    const review = this.reviewRepo.create({ ...dto, book });
    return this.reviewRepo.save(review);
  }
}
