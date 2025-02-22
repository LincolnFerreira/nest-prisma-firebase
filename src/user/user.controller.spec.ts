import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { UserModule } from './user.module';
import { PrismaService } from '../prisma/prisma.service';
const fakeUser = {
  id: 1,
  email: 'test@example.com',
  name: 'Test User',
  profile: { id: 1, bio: 'Test bio' },
};

const prismaMock = {
  user: {
    create: jest.fn().mockResolvedValue(fakeUser),
    findMany: jest.fn().mockResolvedValue([fakeUser]),
    findUnique: jest.fn().mockResolvedValue(fakeUser),
    update: jest.fn().mockImplementation(({ data }) => ({
      ...fakeUser,
      ...data, // Aplica as mudanças do DTO
    })),
    delete: jest.fn().mockResolvedValue(fakeUser),
  },
};
describe('UserController (Integration)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UserModule],
      providers: [
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    // Habilitar validação global
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, transform: true }),
    );
    await app.init();

    prisma = moduleFixture.get<PrismaService>(PrismaService);
    // Opcional: limpar dados antes dos testes
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
    await app.close();
  });

  it('/POST users - should create a user with profile', async () => {
    const payload = {
      email: 'integration@test.com',
      name: 'Integration Test',
      profile: { bio: 'Integration bio' },
    };

    const response = await request(app.getHttpServer())
      .post('/users')
      .send(payload)
      .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body).toMatchObject({
      email: payload.email,
      name: payload.name,
      profile: { bio: payload.profile.bio },
    });
  });

  it('/GET users - should retrieve all users', async () => {
    const response = await request(app.getHttpServer())
      .get('/users')
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('/GET users/:id - should retrieve one user', async () => {
    // Primeiro, cria um usuário
    const payload = {
      email: 'oneuser@test.com',
      name: 'One User',
      profile: { bio: 'One bio' },
    };

    const createResponse = await request(app.getHttpServer())
      .post('/users')
      .send(payload)
      .expect(201);

    const userId = createResponse.body.id;

    const getResponse = await request(app.getHttpServer())
      .get(`/users/${userId}`)
      .expect(200);

    expect(getResponse.body).toHaveProperty('id', userId);
  });

  it('/PATCH users/:id - should update a user', async () => {
    // Cria um usuário
    const payload = {
      email: 'patch@test.com',
      name: 'Patch Test',
      profile: { bio: 'Before Patch' },
    };

    const createResponse = await request(app.getHttpServer())
      .post('/users')
      .send(payload)
      .expect(201);

    const userId = createResponse.body.id;

    // Atualiza o usuário
    const updatePayload = {
      name: 'Patched Name',
      profile: { bio: 'After Patch' },
    };

    const patchResponse = await request(app.getHttpServer())
      .patch(`/users/${userId}`)
      .send(updatePayload)
      .expect(200);

    expect(patchResponse.body).toMatchObject({
      name: updatePayload.name,
      profile: { bio: updatePayload.profile.bio },
    });
  });

  it('/DELETE users/:id - should remove a user', async () => {
    // Cria um usuário
    const payload = {
      email: 'delete@test.com',
      name: 'Delete Test',
      profile: { bio: 'To be deleted' },
    };

    const createResponse = await request(app.getHttpServer())
      .post('/users')
      .send(payload)
      .expect(201);

    const userId = createResponse.body.id;

    await request(app.getHttpServer()).delete(`/users/${userId}`).expect(200);

    // Verifica se o usuário foi removido
    await request(app.getHttpServer()).get(`/users/${userId}`).expect(404);
  });
});
