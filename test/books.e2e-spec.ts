import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('BooksController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('POST /books', () => {
    return request(app.getHttpServer())
      .post('/books')
      .send({ title: 'Test Book', author: 'Tester' })
      .expect(201)
      .then((res) => {
        expect(res.body).toHaveProperty('id');
      });
  });

  it('GET /books', () => {
    return request(app.getHttpServer())
      .get('/books')
      .expect(200)
      .then((res) => {
        expect(Array.isArray(res.body)).toBe(true);
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
