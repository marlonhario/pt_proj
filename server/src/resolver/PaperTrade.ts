import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { getConnection, getRepository, IsNull, Not } from "typeorm";
import { PaperTrade } from "./../entity/PaperTrade";

let response = {
  data: null,
  error: null,
  status_code: 400,
};

@Resolver()
export class PaperTradeResolver {
  @Query(() => [PaperTrade])
  async getPaperTrades() {
    try {
      let paper_trade = await PaperTrade.find();

      return paper_trade;
    } catch (e) {
      return {
        message: "Error in fetching paper trades.",
      };
    }
  }
}
