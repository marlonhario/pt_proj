import { ObjectType, Field } from "type-graphql";
import { Strategies } from "./../../entity/Strategies";
import { FieldError } from "../error/error";

@ObjectType()
export class StrategyResponse {
    @Field(() => [FieldError], { nullable: true })
    errors?: FieldError[];

    @Field(() => Strategies, { nullable: true })
    strategies?: Strategies;
}

@ObjectType()
export class StrategiesResponse {
    @Field(() => [FieldError], { nullable: true })
    errors?: FieldError[];

    @Field(() => Strategies, { nullable: true })
    strategies?: Strategies[];
}

@ObjectType()
export class StrategyBoolen {
    @Field(() => [FieldError], { nullable: true })
    errors?: FieldError[];

    @Field(() => Boolean)
    strategies: Boolean;
}
