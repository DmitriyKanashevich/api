import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../db/services/prisma.service';
import { Avatar } from '../entities/avatar.entity';

@Injectable()
export class AvatarsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.userAvatar.findMany();
  }

  async findById(id: number): Promise<Avatar> {
    return this.prisma.userAvatar.findUnique({
      where: { id },
    });
  }

  async findByUserId(userId: number) {
    return this.prisma.userAvatar.findMany({
      where: {
        userId,
      },
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        media: {
          select: {
            key: true,
          },
        },
      },
    });
  }
}
