import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { User } from '../entities/user.entity';
import { CanvasService } from '../../medias/services/canvas.service';
import { StorageService } from '../../storage/services/storage.service';
import { AvatarsService } from './avatars.service';
import { UsernameService } from './username.service';
import { MediasService } from '../../medias/services/medias.service';
import { PasswordService } from './password.service';
import { UsersRepository } from '../repositories/users.repository';
import { SignUpUser } from '../../auth/inputs/sign-up-user.input';

@Injectable()
export class UsersService {
  constructor(
    private readonly canvasService: CanvasService,
    private readonly storageService: StorageService,
    private readonly avatarsService: AvatarsService,
    private readonly mediasService: MediasService,
    private readonly passwordService: PasswordService,
    private readonly usernameService: UsernameService,
    private readonly usersRepository: UsersRepository,
  ) {}

  async create(userData: SignUpUser): Promise<User> {
    const { email } = userData;

    const password = await this.passwordService.hashPassword(userData.password);

    const generatedAvatar = await this.canvasService.createAvatar(
      userData.fullName,
    );

    const username = await this.usernameService.generateUniqueUsernameFromEmail(
      email,
    );

    const uploadedAvatar = await this.storageService.uploadFile(
      generatedAvatar,
    );

    const user = await this.usersRepository.create({
      ...userData,
      password,
      username,
    });

    await this.avatarsService.create(uploadedAvatar, user.id);

    return this.findOne({ id: user.id });
  }

  async findOne(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    const user = await this.usersRepository.findOne(userWhereUniqueInput);

    const avatars = await this.avatarsService.findUserAvatars(user.id);

    const avatar = await this.mediasService.findOne(user.selectedAvatarId);

    return { ...user, avatar, avatars };
  }

  async checkUserExists(email: string): Promise<boolean> {
    const existingUser = await this.usersRepository.findOne({ email });

    return !!existingUser;
  }

  async update(id: number, data: Prisma.UserUpdateInput): Promise<User> {
    const user = await this.usersRepository.update(id, data);

    return this.findOne({ id: user.id });
  }

  async changePassword(
    id: number,
    oldPassword: string,
    newPassword: string,
  ): Promise<User | boolean> {
    const user = await this.findOne({ id: id });

    if (
      !(await this.passwordService.comparePassword(oldPassword, user.password))
    ) {
      return false;
    }

    const hashedPassword = await this.passwordService.hashPassword(newPassword);

    return await this.update(id, { password: hashedPassword });
  }
}
