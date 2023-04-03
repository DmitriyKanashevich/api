import { Field, InputType } from '@nestjs/graphql';
import { IsIn, IsNotEmpty } from 'class-validator';
import { Gender, Role } from '@prisma/client';

@InputType()
export class AddUserInfo {
  @IsNotEmpty()
  @Field()
  gender: Gender;

  @Field({ nullable: true })
  height?: string;

  @Field({ nullable: true })
  weight?: string;

  @IsNotEmpty()
  @IsIn([Role.trainee, Role.coach], {
    message: 'Role must be either trainee or coach',
  })
  @Field()
  role: Role;

  @IsNotEmpty()
  @Field()
  username: string;

  @IsNotEmpty()
  @Field()
  avatarUri: string;
}
