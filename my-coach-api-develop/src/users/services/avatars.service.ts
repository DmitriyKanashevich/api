import { Injectable } from '@nestjs/common';
import { PutObjectCommandInput } from '@aws-sdk/client-s3';

import { Avatar } from '../entities/avatar.entity';
import { FileName } from '../../medias/constants/file-name.constants';
import { MediasService } from '../../medias/services/medias.service';
import { StorageService } from '../../storage/services/storage.service';
import { PrismaService } from '../../db/services/prisma.service';
import { AvatarsRepository } from '../repositories/avatars.repository';

@Injectable()
export class AvatarsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mediasService: MediasService,
    private readonly storageService: StorageService,
    private readonly avatarsRepository: AvatarsRepository,
  ) {}

  async create(
    uploadedAvatar: PutObjectCommandInput,
    userId: number,
  ): Promise<Avatar> {
    // TODO Rewrite for one call in a complex object
    return this.prisma.$transaction(async (prismaClient) => {
      const media = await this.mediasService.create({
        key: uploadedAvatar.Key,
        name: `${FileName.Avatar}.png`,
        mimeType: uploadedAvatar.ContentType,
      });

      const usersAvatar = await prismaClient.userAvatar.create({
        data: {
          userId: userId,
          mediaId: media.id,
        },
      });

      await prismaClient.user.update({
        where: { id: userId },
        data: {
          selectedAvatarId: media.id,
        },
      });

      return usersAvatar;
    });
  }

  async findOne(id: number): Promise<Avatar> {
    return this.avatarsRepository.findById(id);
  }

  async findUserAvatars(userId: number): Promise<Array<Avatar>> {
    const userAvatars = await this.avatarsRepository.findByUserId(userId);

    return Promise.all(
      userAvatars.map(async ({ media, ...avatar }) => {
        const { key } = media;

        const url = await this.storageService.getFileUrl(key);

        return { url, ...avatar };
      }),
    );
  }

  async createFromUri(uri: string, userId: number): Promise<Avatar> {
    const avatar = this.mediasService.formatToBuffer(uri);

    const uploadedAvatar = await this.storageService.uploadFile(avatar);

    return this.create(uploadedAvatar, userId);
  }
}
