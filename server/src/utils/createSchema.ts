import { buildSchema } from "type-graphql";

import { IndicatorResolver } from "./../resolver/IndicatorResolver";
import { MarketResolver } from "./../resolver/MarketResolver";
import { StrategiesResolver } from "./../resolver/StrategiesResolver";
import { BasketResolver } from "./../resolver/BasketResolver";
import { MarketDataResolver } from "../resolver/MarketDataResolver";
import { BankAccountResolver } from "./../resolver/BankAccountResolver";
import { AutoDepositResolver } from "./../resolver/AutoDeposits";
import { PaperTradingResolver } from "../resolver/PaperTrading";
import { WalletTransactionResolver } from "../resolver/WalletTransactionResolver";
import { SignalLogResolver } from "../resolver/SignalLogResolver";
import { UserResolver } from "../resolver/UserResolver";
import { PaperTradeResolver } from "../resolver/PaperTrade";

export const createSchema = () =>
  buildSchema({
    resolvers: [
      UserResolver,
      IndicatorResolver,
      MarketResolver,
      BasketResolver,
      MarketDataResolver,
      StrategiesResolver,
      BankAccountResolver,
      AutoDepositResolver,
      PaperTradingResolver,
      WalletTransactionResolver,
      SignalLogResolver,
      PaperTradeResolver,
    ],
    dateScalarMode: "isoDate",
  });
