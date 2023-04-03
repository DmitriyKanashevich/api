import { Field, HideField, ID, ObjectType } from '@nestjs/graphql';
import { Gender, Role } from '@prisma/client';

import { Avatar } from './avatar.entity';

@ObjectType()
export class User {
  @Field(() => ID)
  id: number;

  @Field()
  email: string;

  @Field()
  fullName: string;

  @HideField()
  password: string;

  @Field()
  role: Role;

  @Field()
  gender: Gender;

  @Field({ nullable: true })
  height?: string;

  @Field({ nullable: true })
  weight?: string;

  @Field()
  username: string;

  @HideField()
  selectedAvatarId: number;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => Avatar)
  avatar: Avatar;

  @Field(() => [Avatar])
  avatars: Avatar[];
}
