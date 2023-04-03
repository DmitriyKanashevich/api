import { Resolver } from '@nestjs/graphql';
import { Role } from '@prisma/client';

import { Roles } from '../../auth/decorators/roles.decorator';

@Resolver()
export class ExercisesResolver {
  @Roles(Role.admin)
  getAll() {
    // TODO
  }

  getAllBy() {
    // TODO
  }

  getBy() {
    // TODO
  }

  @Roles(Role.admin)
  create() {
    // TODO
  }

  @Roles(Role.admin)
  update() {
    // TODO
  }

  @Roles(Role.admin)
  delete() {
    // TODO
  }
}
