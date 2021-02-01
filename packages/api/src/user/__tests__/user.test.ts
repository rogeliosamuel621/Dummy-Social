import * as req from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FakeUser } from './user.utils';
import { AppModule } from '../../app.module';

describe('Users', () => {
	let app: INestApplication;

	beforeAll(async () => {
		const moduleRef = await Test.createTestingModule({
			imports: [
				MongooseModule.forRoot('mongodb://localhost/dummy-network', {
					useCreateIndex: true,
				}),
				AppModule,
			],
		}).compile();

		app = moduleRef.createNestApplication();
		await app.init();
	});
	afterAll(async () => {
		await app.close();
	});

	test('/POST register', async () => {
		const mockUser = new FakeUser(
			'adminTest@gmail.com',
			'admin test',
			'123456'
		);

		const res = await req(app.getHttpServer())
			.post('/user/register')
			.send(mockUser);

		expect(res.status).toBe(201);
	});
});
