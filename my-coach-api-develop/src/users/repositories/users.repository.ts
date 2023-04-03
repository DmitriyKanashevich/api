import { Injectable } from '@nestjs/common';
import { Prisma, User, UserAvatar } from '@prisma/client';

import { PrismaService } from '../../db/services/prisma.service';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User & { avatars: UserAvatar[] }> {
    const user = await this.prisma.user.findUnique({
      where: userWhereUniqueInput,
      include: {
        avatars: true,
      },
    });

    if (!user) {
      return null;
    }

    return user;
  }

  async create(userData: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data: userData,
    });
  }

  async update(id: number, data: Prisma.UserUpdateInput): Promise<User> {
    const user = await this.prisma.user.update({
      where: { id: id },
      data,
    });

    return this.findOne({ id: user.id });
  }
}
