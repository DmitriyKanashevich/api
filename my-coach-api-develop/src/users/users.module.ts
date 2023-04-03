import { Module } from '@nestjs/common';

import { UsersService } from './services/users.service';
import { AvatarsService } from './services/avatars.service';
import { UsernameService } from './services/username.service';
import { PasswordService } from './services/password.service';
import { MediasModule } from '../medias/medias.module';
import { StorageModule } from '../storage/storage.module';
import { PrismaModule } from '../db/prisma.module';
import { UsersResolver } from './resolvers/users.resolver';
import { AvatarsRepository } from './repositories/avatars.repository';
import { UsersRepository } from './repositories/users.repository';

@Module({
  imports: [PrismaModule, MediasModule, StorageModule],
  providers: [
    UsersService,
    AvatarsService,
    UsernameService,
    PasswordService,
    UsersResolver,
    AvatarsRepository,
    UsersRepository,
  ],
  exports: [UsersService, PasswordService],
})
export class UsersModule {}
