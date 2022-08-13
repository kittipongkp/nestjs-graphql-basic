import { Field, ObjectType } from "@nestjs/graphql";
import { User } from "src/users/models/user.model";

@ObjectType()
export class LoginResponse  {
    @Field()
    readonly token: string;

    @Field(()=> User)
    readonly user: User;
}