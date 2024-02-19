import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { getConnection, getRepository, IsNull, Not } from "typeorm";
import { WalletTransactionsSummary } from "./../entity/WalletTransactionsSummary";
import { WalletTransactions } from "./../entity/WalletTransactions";
import { run } from "../utils/signalSystem";
import { SignalLogs } from "../entity/SignalLogs";
let response = {
  data: null,
  error: null,
  status_code: 400,
};

@Resolver()
export class SignalLogResolver {
  @Query(() => SignalLogs)
  async getLogs() {
    let logs = await run();

    return logs;
  }

  @Query(() => [SignalLogs])
  async allLogs() {
    let logs = await SignalLogs.find({
      take: 20,
      order: {
        id: "DESC",
      },
    });
    return logs;
  }
}
