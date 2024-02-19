import { ObjectType, Field } from "type-graphql";
import { MarketData } from "./../../entity/MarketData";
import { FieldError } from "../error/error";
import { Markets } from "./../../entity/Markets";

@ObjectType()
export class MarketDataResponse {
    @Field(() => [FieldError], { nullable: true })
    errors?: FieldError;

    @Field(() => MarketData, { nullable: true })
    market_data?: MarketData[];

    @Field(() => Markets, { nullable: true })
    market?: Markets;
}
