import { ObjectType, Field, InterfaceType, Float, Int } from "type-graphql";
import { MarketData } from "./../../entity/MarketData";
import { FieldError } from "../error/error";

@InterfaceType()
abstract class AlphavantageMarketData {
  @Field((type) => String)
  symbol: string = "USD";
  @Field((type) => String)
  interval: string;
  @Field((type) => Int)
  marketId: number = 2;
  @Field((type) => Float)
  open: number = 1.23;
  @Field((type) => Float)
  high: number = 1.23;
  @Field((type) => Float)
  low: number = 1.23;
  @Field((type) => Float)
  close: number = 1.23;
  @Field((type) => Float)
  volume: number = 1.23;
  @Field((type) => Date)
  last_update: Date = new Date("2018-02-07T21:04:39.573Z");
}

@ObjectType()
export class AlphavantageApiResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => MarketData, { nullable: true })
  alphavantage_market_data?: AlphavantageMarketData[];
}
