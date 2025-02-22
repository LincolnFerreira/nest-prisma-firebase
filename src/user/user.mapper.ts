import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

// Interface para os métodos estáticos do mapper
export interface IMapperStatic<T, C, U> {
  toEntity(createDto: C): T;
  toEntityUpdate(entity: T, updateDto: U): T;
  toPrismaCreate(entity: T): any;
  toPrismaUpdate(updateDto: U): any;
  toResponse(prismaEntity: any): Partial<T>;
}
function staticImplements<T>() {
  return <U extends T>(constructor: U) => {
    constructor;
  };
}

@staticImplements<IMapperStatic<User, CreateUserDto, UpdateUserDto>>()
export class UserMapper {
  static toEntityUpdate(user: User, updateUserDto: UpdateUserDto): User {
    return new User({
      ...user,
      ...updateUserDto,
      profile: updateUserDto.profile
        ? { ...user.profile, ...updateUserDto.profile }
        : user.profile,
    });
  }

  static toPrismaCreate(entity: User) {
    const prismaData: any = { email: entity.email, name: entity.name };
    if (entity.profile) {
      prismaData.profile = { create: { bio: entity.profile.bio } };
    }
    return prismaData;
  }

  static toPrismaUpdate(updateUserDto: UpdateUserDto) {
    const prismaData: any = {};
    if (updateUserDto.email) prismaData.email = updateUserDto.email;
    if (updateUserDto.name) prismaData.name = updateUserDto.name;
    if (updateUserDto.profile) {
      prismaData.profile = {
        upsert: {
          update: { bio: updateUserDto.profile.bio },
          create: { bio: updateUserDto.profile.bio },
        },
      };
    }
    return prismaData;
  }

  static toResponse(prismaUser: any): Partial<User> {
    const { id, email, name, profile } = prismaUser;
    return { id, email, name, profile };
  }
}

// Testando os métodos estáticos diretamente
const createUserDto: CreateUserDto = {
  email: 'test@example.com',
  name: 'Test User',
  profile: { bio: 'Bio info' },
};
const updateUserDto: UpdateUserDto = {
  email: 'updated@example.com',
  name: 'Updated User',
  profile: { bio: 'Updated Bio' },
};
const user = new User({
  email: 'test@example.com',
  name: 'Test User',
  profile: { bio: 'Bio info' },
});

console.log('Entity from CreateUserDto:', UserMapper.toEntity(createUserDto));
console.log('Entity updated:', UserMapper.toEntityUpdate(user, updateUserDto));
console.log('Prisma create data:', UserMapper.toPrismaCreate(user));
console.log('Prisma update data:', UserMapper.toPrismaUpdate(updateUserDto));
console.log('Response data:', UserMapper.toResponse(user));
