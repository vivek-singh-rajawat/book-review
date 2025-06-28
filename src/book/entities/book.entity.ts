import { Entity, PrimaryGeneratedColumn, Column , OneToMany} from 'typeorm';
import { Review } from '../../reviews/entities/review.entity';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  author: string;

   @OneToMany(() => Review, (review) => review.book)
  reviews: Review[];
}
