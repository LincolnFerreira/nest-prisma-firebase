import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

describe('UserService', () => {
  let service: UserService;
  let prisma: PrismaService;

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

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', async () => {
    const createUserDto: CreateUserDto = {
      email: 'test@example.com',
      name: 'Test User',
      profile: { bio: 'Test bio' },
    };

    const result = await service.create(createUserDto);
    expect(prisma.user.create).toHaveBeenCalled();
    expect(result).toMatchObject({
      email: createUserDto.email,
      name: createUserDto.name,
    });
  });

  it('should find all users', async () => {
    const result = await service.findAll();
    expect(prisma.user.findMany).toHaveBeenCalled();
    expect(result).toHaveLength(1);
  });

  it('should find a user by id', async () => {
    const result = await service.findOne(1);
    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
      include: { profile: true },
    });
    expect(result).toMatchObject({ id: 1 });
  });

  it('should throw NotFoundException when user not found', async () => {
    // Simula que não foi encontrado o usuário
    jest.spyOn(prisma.user, 'findUnique').mockResolvedValueOnce(null);
    await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
  });

  it('should update a user', async () => {
    const updateUserDto = { name: 'Updated Name' };
    const result = await service.update(1, updateUserDto);
    expect(prisma.user.update).toHaveBeenCalled();
    expect(result).toMatchObject({ name: 'Updated Name' });
  });

  it('should delete a user', async () => {
    await service.remove(1);
    expect(prisma.user.delete).toHaveBeenCalledWith({ where: { id: 1 } });
  });
});
