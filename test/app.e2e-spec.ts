import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import supertest from 'supertest';
import { AppModule } from './../src/app.module';

describe('TrainController (e2e)', () => {
  let app: INestApplication;
  let request: supertest.SuperTest<supertest.Test>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    request = supertest(app.getHttpServer());
  });

  afterEach(async () => {
    await app.close();
  });

  it('/train/model (GET)', () => {
    return request
      .get('/train/model')
      .expect(200)
      .expect(/\[Engine\]/);
  });

  it('/train/action/:carType (POST)', () => {
    return request
      .post('/train/action/CC-1')
      .expect(200)
      .expect(/Action performed on CC-1/);
  });

  it('/train/add-pantry (POST)', () => {
    return request
      .post('/train/add-pantry')
      .send({type: 'full'})
      .expect(201)
      .expect('Added full pantry car to the train.');
  });
});
