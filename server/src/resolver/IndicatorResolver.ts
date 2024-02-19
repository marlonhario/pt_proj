import { Resolver, Query } from "type-graphql";

@Resolver()
export class IndicatorResolver {
  @Query(() => String)
  indicatorTest() {
    return "Indicator resolver!";
  }
}
