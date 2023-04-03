import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { BadRequestException } from '@nestjs/common';

import { User } from '../entities/user.entity';
import { ChangePasswordInput } from '../inputs/change-password.input';
import { AddUserInfo } from '../inputs/add-user-info.input';
import { UsersService } from '../services/users.service';
import { AvatarsService } from '../services/avatars.service';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { ICurrentUser } from '../../auth/interfaces/current-user.interface';

@Resolver('Users')
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly avatarsService: AvatarsService,
  ) {}

  @Mutation(() => User)
  async changePassword(
    @CurrentUser() user: ICurrentUser,
    @Args('changePasswordInput') changePasswordInput: ChangePasswordInput,
  ) {
    const { oldPassword, newPassword } = changePasswordInput;

    const updatedUser = await this.usersService.changePassword(
      user.id,
      oldPassword,
      newPassword,
    );

    if (!updatedUser) {
      throw new BadRequestException('User password is incorrect');
    }

    return updatedUser;
  }

  @Mutation(() => User)
  async addUserInfo(
    @CurrentUser() user: ICurrentUser,
    @Args('userInfo') userInfo: AddUserInfo,
  ) {
    const { avatarUri, ...userData } = userInfo;

    await this.avatarsService.createFromUri(avatarUri, user.id);

    return this.usersService.update(user.id, userData);
  }
}
