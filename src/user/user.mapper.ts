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
  static toEntity(createUserDto: CreateUserDto): User {
    return new User({
      email: createUserDto.email,
      name: createUserDto.name,
      profile: createUserDto.profile
        ? { bio: createUserDto.profile.bio }
        : undefined,
    });
  }
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
