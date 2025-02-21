import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  create(createUserDto: CreateUserDto) {
    // const a : Prisma.UserCreateInput
    // return this.prisma.user.create()
  }

  findAll() {
    console.log(this.configService.get<string>('BASE_URL'));
    console.log(this.configService.get<string>('NODE_ENV'));
    // return `This action returns all user ${url}`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
