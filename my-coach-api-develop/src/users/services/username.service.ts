import { Injectable } from '@nestjs/common';
import { generateFromEmail } from 'unique-username-generator';

import { UsersRepository } from '../repositories/users.repository';

@Injectable()
export class UsernameService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async generateUniqueUsernameFromEmail(
    email: string,
    digits = 0,
  ): Promise<string> {
    const username = generateFromEmail(email, digits);

    const existingUser = await this.usersRepository.findOne({ username });

    if (!existingUser) {
      return username;
    }

    return this.generateUniqueUsernameFromEmail(email, digits + 1);
  }
}
