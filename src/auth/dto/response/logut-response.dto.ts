import { Field, ObjectType } from "@nestjs/graphql";
import { User } from "src/users/models/user.model";

@ObjectType()
export class LogoutResponse  {
    @Field()
    readonly message: string;
}