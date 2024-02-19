import { FieldError } from "./../error/error";
import { ObjectType, Field } from "type-graphql";
import { Users } from "../../entity/Users";

@ObjectType()
export class LoginResponse {
    @Field({ nullable: true })
    accessToken?: string;

    @Field({ nullable: true })
    rememberMeToken?: string;

    @Field(() => Users, { nullable: true })
    user?: Users;

    @Field(() => FieldError, { nullable: true })
    errors?: FieldError;
}

@ObjectType()
export class UpdateResponse {
    @Field(() => Users)
    user: Users;
}
