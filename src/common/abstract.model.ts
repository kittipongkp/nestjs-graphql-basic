import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Abstractmodel {
    @Field()
    readonly _id: string;
}