import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserMapper } from './user.mapper';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  // Criação do usuário com dados aninhados para profile
  async create(createUserDto: CreateUserDto): Promise<User> {
    // Converte o DTO para a entidade
    const userEntity = UserMapper.toEntity(createUserDto);
    // Converte a entidade para o formato Prisma
    const prismaData = UserMapper.toPrismaCreate(userEntity);

    const createdUser = await this.prisma.user.create({
      data: prismaData,
      include: { profile: true },
    });

    return new User(createdUser);
  }

  // Retorna todos os usuários com seus profiles
  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany({
      include: { profile: true },
    });
    return users.map((user) => new User(user));
  }

  // Retorna um usuário pelo ID
  async findOne(id: number): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: { profile: true },
    });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return new User(user);
  }

  // Atualiza um usuário e seu profile
  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    // Verifica se o usuário existe
    await this.findOne(id);
    const prismaData = UserMapper.toPrismaUpdate(updateUserDto);

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: prismaData,
      include: { profile: true },
    });
    return new User(updatedUser);
  }

  // Remove um usuário (e seu profile, se existir)
  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.prisma.user.delete({
      where: { id },
    });
  }
}
