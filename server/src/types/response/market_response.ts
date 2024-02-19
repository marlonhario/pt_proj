import { ObjectType, Field } from "type-graphql";
import { Markets } from "../../entity/Markets";
import { FieldError } from "../error/error";

@ObjectType()
export class MarketResponse {
    @Field(() => [FieldError], { nullable: true })
    errors?: FieldError[];

    @Field(() => Markets, { nullable: true })
    market?: Markets[];
}

@ObjectType()
export class MarketOneResponse {
    @Field(() => [FieldError], { nullable: true })
    errors?: FieldError;

    @Field(() => Markets, { nullable: true })
    market?: Markets;
}
