import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Book } from '../../book/entities/book.entity';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @ManyToOne(() => Book, (book) => book.reviews)
  book;
}
