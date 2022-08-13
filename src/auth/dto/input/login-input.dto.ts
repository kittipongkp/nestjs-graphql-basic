import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class LoginInput {
  @Field()
  @IsEmail()
  readonly email: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  readonly password: string;
}