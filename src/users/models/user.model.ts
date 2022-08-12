import { Field, ObjectType } from "@nestjs/graphql";
import { Abstractmodel } from "src/common/abstract.model";

@ObjectType()
export class User extends Abstractmodel {
    @Field()
    readonly email: string;
}