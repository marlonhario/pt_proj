import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
};

export type AlpacaTrades = {
  __typename?: 'AlpacaTrades';
  id: Scalars['Int'];
  user_id: Scalars['String'];
  symbol: Scalars['String'];
  qty: Scalars['Float'];
  side: Scalars['String'];
  time_in_force: Scalars['String'];
  date_added: Scalars['DateTime'];
};

export type AlphavantageApiResponse = {
  __typename?: 'AlphavantageApiResponse';
  errors?: Maybe<Array<FieldError>>;
  alphavantage_market_data?: Maybe<Array<MarketData>>;
};

export type AlphavantageMarketData = {
  symbol: Scalars['String'];
  interval: Scalars['String'];
  marketId: Scalars['Int'];
  open: Scalars['Float'];
  high: Scalars['Float'];
  low: Scalars['Float'];
  close: Scalars['Float'];
  volume: Scalars['Float'];
  last_update: Scalars['DateTime'];
};

export type AutoDepositInput = {
  token: Scalars['String'];
};

export type AutoDeposits = {
  __typename?: 'AutoDeposits';
  id: Scalars['Int'];
  user_id: Scalars['Float'];
  minimum_wallet_balance: Scalars['Float'];
  amount_deposit: Scalars['Float'];
  bank_account: Scalars['String'];
  is_auto: Scalars['Boolean'];
  is_min_automatic: Scalars['Boolean'];
  is_amt_automatic: Scalars['Boolean'];
  created_date: Scalars['DateTime'];
};

export type BankAccountInput = {
  token: Scalars['String'];
};

export type BankAccountResponse = {
  __typename?: 'BankAccountResponse';
  errors?: Maybe<Array<FieldError>>;
  bank?: Maybe<Array<BankAccounts>>;
};

export type BankAccounts = {
  __typename?: 'BankAccounts';
  id: Scalars['Int'];
  user_id: Scalars['Float'];
  name: Scalars['String'];
};

export type Baskets = {
  __typename?: 'Baskets';
  basket_id: Scalars['String'];
  user_id: Scalars['Float'];
  strategies: Array<Strategies>;
  added_date: Scalars['DateTime'];
  read_only: Scalars['Boolean'];
  live: Scalars['Boolean'];
};

export type Broker = {
  __typename?: 'Broker';
  id: Scalars['Int'];
  exchange: Scalars['String'];
  price: Scalars['String'];
  size: Scalars['String'];
  auth_id: Scalars['String'];
  auth_client_id: Scalars['String'];
  auth_owner_id: Scalars['String'];
  timestamp: Scalars['String'];
};


export type DepositResponse = {
  __typename?: 'DepositResponse';
  errors?: Maybe<Array<FieldError>>;
  deposit?: Maybe<AutoDeposits>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type GetStrategyProfileArgs = {
  id?: Maybe<Scalars['String']>;
  created_by_user_id?: Maybe<Scalars['Float']>;
  trade_list_json?: Maybe<Scalars['String']>;
  editor_json?: Maybe<Scalars['JSON']>;
  average_hpr?: Maybe<Scalars['Float']>;
  average_position_length?: Maybe<Scalars['Float']>;
  backtest_quality_percent?: Maybe<Scalars['Float']>;
  balance_line_stability?: Maybe<Scalars['Float']>;
  bars_in_trade_number?: Maybe<Scalars['Float']>;
  bars_in_trade_percent?: Maybe<Scalars['Float']>;
  count_of_trades?: Maybe<Scalars['Float']>;
  max_consecutive_losses?: Maybe<Scalars['Float']>;
  max_drawdown_number?: Maybe<Scalars['Float']>;
  max_drawdown_percent?: Maybe<Scalars['Float']>;
  months_of_profit?: Maybe<Scalars['Float']>;
  net_balance?: Maybe<Scalars['Float']>;
  net_profit?: Maybe<Scalars['Float']>;
  profit_factor?: Maybe<Scalars['Float']>;
  profit_per_day?: Maybe<Scalars['Float']>;
  r_squared?: Maybe<Scalars['Float']>;
  return_drawdown?: Maybe<Scalars['Float']>;
  sharpe_ratio?: Maybe<Scalars['Float']>;
  max_stagnation_number?: Maybe<Scalars['Float']>;
  max_stagnation_percent?: Maybe<Scalars['Float']>;
  system_quality_number?: Maybe<Scalars['Float']>;
  win_loss?: Maybe<Scalars['Float']>;
};

export type Indicators = {
  __typename?: 'Indicators';
  id: Scalars['Int'];
  name: Scalars['String'];
  filename: Scalars['String'];
};


export type LoginResponse = {
  __typename?: 'LoginResponse';
  accessToken?: Maybe<Scalars['String']>;
  rememberMeToken?: Maybe<Scalars['String']>;
  user?: Maybe<Users>;
  errors?: Maybe<FieldError>;
};

export type MarketAdd = {
  __typename?: 'MarketAdd';
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  symbol?: Maybe<Scalars['String']>;
  equity?: Maybe<Scalars['String']>;
  timezone?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  region?: Maybe<Scalars['String']>;
  exchange?: Maybe<Scalars['String']>;
  marketOpen?: Maybe<Scalars['String']>;
  marketClose?: Maybe<Scalars['String']>;
  matchScore?: Maybe<Scalars['String']>;
  currency?: Maybe<Scalars['String']>;
  period?: Maybe<Scalars['String']>;
  first_data?: Maybe<Scalars['DateTime']>;
  last_data?: Maybe<Scalars['DateTime']>;
  number_data_records?: Maybe<Scalars['Float']>;
  data_last_downloaded?: Maybe<Scalars['DateTime']>;
  have_data?: Maybe<Scalars['Boolean']>;
  newAdded: Scalars['Boolean'];
};

export type MarketAlphavantageObject = {
  __typename?: 'MarketAlphavantageObject';
  symbol: Scalars['String'];
  name: Scalars['String'];
  type: Scalars['String'];
  region: Scalars['String'];
  marketOpen: Scalars['String'];
  marketClose: Scalars['String'];
  timezone: Scalars['String'];
  currency: Scalars['String'];
  matchScore: Scalars['String'];
};

export type MarketData = {
  __typename?: 'MarketData';
  id: Scalars['Int'];
  interval: Scalars['String'];
  marketId: Scalars['Float'];
  symbol: Scalars['String'];
  date_created: Scalars['DateTime'];
  last_update: Scalars['DateTime'];
  open: Scalars['Float'];
  high: Scalars['Float'];
  low: Scalars['Float'];
  close: Scalars['Float'];
  volume: Scalars['Float'];
};

export type MarketDataInterval = {
  __typename?: 'MarketDataInterval';
  id: Scalars['Int'];
  interval: Scalars['String'];
  marketId: Scalars['Float'];
  symbol: Scalars['String'];
  date_created: Scalars['DateTime'];
  first_data?: Maybe<Scalars['DateTime']>;
  last_update: Scalars['DateTime'];
  number_data_records?: Maybe<Scalars['Float']>;
};

export type MarketDataResponse = {
  __typename?: 'MarketDataResponse';
  errors?: Maybe<Array<FieldError>>;
  market_data?: Maybe<Array<MarketData>>;
  market?: Maybe<Markets>;
};

export type MarketInterval = {
  __typename?: 'MarketInterval';
  id: Scalars['Int'];
  date_time: Scalars['DateTime'];
  interval: Scalars['String'];
};

export type MarketOneResponse = {
  __typename?: 'MarketOneResponse';
  errors?: Maybe<Array<FieldError>>;
  market?: Maybe<Markets>;
};

export type MarketResponse = {
  __typename?: 'MarketResponse';
  errors?: Maybe<Array<FieldError>>;
  market?: Maybe<Array<Markets>>;
};

export type Markets = {
  __typename?: 'Markets';
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  symbol?: Maybe<Scalars['String']>;
  equity?: Maybe<Scalars['String']>;
  timezone?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  region?: Maybe<Scalars['String']>;
  exchange?: Maybe<Scalars['String']>;
  marketOpen?: Maybe<Scalars['String']>;
  marketClose?: Maybe<Scalars['String']>;
  matchScore?: Maybe<Scalars['String']>;
  currency?: Maybe<Scalars['String']>;
  period?: Maybe<Scalars['String']>;
  first_data?: Maybe<Scalars['DateTime']>;
  last_data?: Maybe<Scalars['DateTime']>;
  number_data_records?: Maybe<Scalars['Float']>;
  data_last_downloaded?: Maybe<Scalars['DateTime']>;
  have_data?: Maybe<Scalars['Boolean']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addMarket?: Maybe<Array<MarketAdd>>;
  marketsSearch: Array<Markets>;
  updateStrategy: Scalars['Boolean'];
  saveStrategy: Strategies;
  saveStrategies: Strategies;
  transferStrategies: Scalars['Boolean'];
  deleteStrategies: StrategyResponse;
  retrieveStrategies: StrategyResponse;
  deleteAllStrategies: StrategyBoolen;
  saveBaskets: Baskets;
  getAlphavantageMarketData?: Maybe<AlphavantageApiResponse>;
  getMarketData?: Maybe<Array<MarketData>>;
  plaidAccounts: Scalars['String'];
  plaidCreateAccount: Scalars['String'];
  plaidAccess: Scalars['String'];
  plaidMail: Scalars['String'];
  getBankAccountList: BankAccountResponse;
  plaiInstitutionIcon: Scalars['String'];
  plaidAccountRemove: Scalars['String'];
  plaidNicknameUpdate: Scalars['String'];
  getDepositsById: DepositResponse;
  saveDeposit: DepositResponse;
  savePaperTrding: PaperTrading;
  alpacaAuthorize: Scalars['String'];
  moveStrategy: Scalars['Boolean'];
  moveStrategies: Scalars['Boolean'];
  alpacaAccount: Scalars['String'];
  alpacaOrders: Scalars['String'];
  alpacaPositions: Scalars['String'];
  alpacaPortfolio: Scalars['String'];
  alpacaCreateTrade: Scalars['String'];
  removeTransactions: Scalars['String'];
  addTransactions: Scalars['String'];
  addSummary: Scalars['String'];
  login: LoginResponse;
  register: Scalars['Float'];
  logout: Scalars['Boolean'];
  revokeRefreshTokensForUser: Scalars['Boolean'];
  verification: Scalars['Float'];
  resetPassword: Scalars['Boolean'];
  updateUserDetails: UpdateResponse;
  getRememberMe: LoginResponse;
};


export type MutationAddMarketArgs = {
  symbol?: Maybe<Scalars['String']>;
};


export type MutationMarketsSearchArgs = {
  options?: Maybe<SearchType>;
  haveData?: Maybe<Scalars['Boolean']>;
  symbol?: Maybe<Scalars['String']>;
};


export type MutationUpdateStrategyArgs = {
  token: Scalars['String'];
  options: GetStrategyProfileArgs;
};


export type MutationSaveStrategyArgs = {
  token: Scalars['String'];
  options: GetStrategyProfileArgs;
};


export type MutationSaveStrategiesArgs = {
  value: Scalars['Float'];
  user_id: Scalars['Float'];
};


export type MutationTransferStrategiesArgs = {
  id: Scalars['String'];
};


export type MutationDeleteStrategiesArgs = {
  id: Scalars['String'];
};


export type MutationRetrieveStrategiesArgs = {
  id: Scalars['String'];
};


export type MutationDeleteAllStrategiesArgs = {
  token: Scalars['String'];
};


export type MutationSaveBasketsArgs = {
  user_id: Scalars['Float'];
};


export type MutationGetAlphavantageMarketDataArgs = {
  interval?: Maybe<Scalars['String']>;
  symbol?: Maybe<Scalars['String']>;
};


export type MutationGetMarketDataArgs = {
  isGroup?: Maybe<Scalars['Boolean']>;
  refresh?: Maybe<Scalars['Boolean']>;
  marketId: Scalars['Int'];
  interval?: Maybe<Scalars['String']>;
  symbol?: Maybe<Scalars['String']>;
};


export type MutationPlaidAccountsArgs = {
  token: Scalars['String'];
};


export type MutationPlaidCreateAccountArgs = {
  InstitutionLogo: Scalars['String'];
  institutionId: Scalars['String'];
  accountNumber: Scalars['String'];
  institution: Scalars['String'];
  accountName: Scalars['String'];
  accountId: Scalars['String'];
  token: Scalars['String'];
};


export type MutationPlaidAccessArgs = {
  plaidToken: Scalars['String'];
};


export type MutationPlaidMailArgs = {
  token: Scalars['String'];
  mailContent: Scalars['String'];
};


export type MutationGetBankAccountListArgs = {
  data: BankAccountInput;
};


export type MutationPlaiInstitutionIconArgs = {
  insId: Scalars['String'];
};


export type MutationPlaidAccountRemoveArgs = {
  id: Scalars['Float'];
};


export type MutationPlaidNicknameUpdateArgs = {
  value: Scalars['String'];
  id: Scalars['Float'];
};


export type MutationGetDepositsByIdArgs = {
  data: AutoDepositInput;
};


export type MutationSaveDepositArgs = {
  data: SaveDepositInput;
};


export type MutationSavePaperTrdingArgs = {
  user_id: Scalars['Float'];
};


export type MutationAlpacaAuthorizeArgs = {
  code: Scalars['String'];
};


export type MutationMoveStrategyArgs = {
  data: Scalars['String'];
  token: Scalars['String'];
};


export type MutationMoveStrategiesArgs = {
  data: Scalars['String'];
  token: Scalars['String'];
};


export type MutationAlpacaAccountArgs = {
  token: Scalars['String'];
};


export type MutationAlpacaOrdersArgs = {
  token: Scalars['String'];
};


export type MutationAlpacaPositionsArgs = {
  token: Scalars['String'];
};


export type MutationAlpacaPortfolioArgs = {
  token: Scalars['String'];
};


export type MutationAlpacaCreateTradeArgs = {
  userToken: Scalars['String'];
  timeInForce: Scalars['String'];
  type: Scalars['String'];
  side: Scalars['String'];
  qty: Scalars['Float'];
  symbol: Scalars['String'];
  token: Scalars['String'];
};


export type MutationAddTransactionsArgs = {
  name: Scalars['String'];
  date: Scalars['String'];
  amount: Scalars['String'];
  balance: Scalars['String'];
  currency_code: Scalars['String'];
  transaction_type: Scalars['String'];
};


export type MutationAddSummaryArgs = {
  balance: Scalars['String'];
  date: Scalars['String'];
  credit: Scalars['String'];
  debit: Scalars['String'];
  currency_code: Scalars['String'];
};


export type MutationLoginArgs = {
  isRememberActive: Scalars['Boolean'];
  password: Scalars['String'];
  email: Scalars['String'];
};


export type MutationRegisterArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};


export type MutationRevokeRefreshTokensForUserArgs = {
  userId: Scalars['Int'];
};


export type MutationVerificationArgs = {
  token: Scalars['String'];
};


export type MutationResetPasswordArgs = {
  newpass: Scalars['String'];
  oldpass: Scalars['String'];
  token: Scalars['String'];
};


export type MutationUpdateUserDetailsArgs = {
  data: UpdateUserInput;
  token: Scalars['String'];
};


export type MutationGetRememberMeArgs = {
  token: Scalars['String'];
};

export type PaperTrade = {
  __typename?: 'PaperTrade';
  id?: Maybe<Scalars['Int']>;
  strategy_id: Scalars['Int'];
  market_id: Scalars['Int'];
  symbol: Scalars['String'];
  price: Scalars['Float'];
  trade_amount: Scalars['Float'];
  stop_loss: Scalars['Float'];
  take_profit: Scalars['Float'];
  profit: Scalars['Float'];
  balance: Scalars['Float'];
  date_time: Scalars['DateTime'];
  open: Scalars['Float'];
  high: Scalars['Float'];
  low: Scalars['Float'];
  close: Scalars['Float'];
  volume: Scalars['Float'];
  trade_type: Scalars['String'];
};

export type PaperTrading = {
  __typename?: 'PaperTrading';
  id: Scalars['String'];
  user_id: Scalars['Float'];
  cumul_return?: Maybe<Scalars['Float']>;
  strategies: Array<Strategies>;
  created_at: Scalars['String'];
  read_only: Scalars['Boolean'];
  live: Scalars['Boolean'];
};

export type PaperTradingInput = {
  token: Scalars['String'];
};

export type PaperTradingResponse = {
  __typename?: 'PaperTradingResponse';
  errors?: Maybe<Array<FieldError>>;
  paper_trading?: Maybe<Array<PaperTrading>>;
};

export type Query = {
  __typename?: 'Query';
  indicatorTest: Scalars['String'];
  marketTest: Scalars['String'];
  markets: Array<Markets>;
  initializeMarket: MarketOneResponse;
  alphavantageSearch: Array<Markets>;
  getMarketSymbol: MarketResponse;
  getMarketList: MarketResponse;
  strategiesTest: Scalars['String'];
  strategies: Array<Strategies>;
  getStrategyProfile: Strategies;
  getStrategies: StrategiesBasket;
  getTrash: StrategiesResponse;
  basketTest: Scalars['String'];
  baskets: Array<Baskets>;
  marketData: Array<MarketData>;
  getMarketDataSymbol: MarketDataResponse;
  plaidLink: Scalars['String'];
  getTransactions: Scalars['String'];
  autoDepositTest: Scalars['String'];
  autoDeposits: Array<AutoDeposits>;
  PaperTradingTest: Scalars['String'];
  alpacaOauth: Scalars['String'];
  paperTrading: Array<PaperTrading>;
  getPaperTradingById: PaperTradingResponse;
  getSummary: Scalars['String'];
  getLogs: SignalLogs;
  allLogs: Array<SignalLogs>;
  UserTest: Scalars['String'];
  hello: Scalars['String'];
  me?: Maybe<Users>;
  bye: Scalars['String'];
  users: Array<Users>;
  getPaperTrades: Array<PaperTrade>;
};


export type QueryAlphavantageSearchArgs = {
  haveData?: Maybe<Scalars['Boolean']>;
  symbol?: Maybe<Scalars['String']>;
};


export type QueryGetStrategyProfileArgs = {
  token: Scalars['String'];
  id: Scalars['String'];
};


export type QueryGetStrategiesArgs = {
  data: StrategiesCriteria;
  type: Scalars['String'];
  sort_id: Scalars['String'];
  token: Scalars['String'];
};


export type QueryGetTrashArgs = {
  token: Scalars['String'];
};


export type QueryGetMarketDataSymbolArgs = {
  interval?: Maybe<Scalars['String']>;
  symbol?: Maybe<Scalars['String']>;
};


export type QueryGetPaperTradingByIdArgs = {
  data: PaperTradingInput;
};

export type SaveDepositInput = {
  token: Scalars['String'];
  minimum_wallet_balance?: Maybe<Scalars['Float']>;
  amount_deposit?: Maybe<Scalars['Float']>;
  bank_account?: Maybe<Scalars['String']>;
  created_date?: Maybe<Scalars['DateTime']>;
  is_auto?: Maybe<Scalars['Boolean']>;
  is_min_automatic?: Maybe<Scalars['Boolean']>;
  is_amt_automatic?: Maybe<Scalars['Boolean']>;
};

export type SearchType = {
  page: Scalars['Float'];
  pageSize: Scalars['Float'];
  filter: Scalars['String'];
  order: Scalars['Float'];
  orderBy: Scalars['String'];
};

export type SignalLogs = {
  __typename?: 'SignalLogs';
  id?: Maybe<Scalars['Int']>;
  signal_logs: Array<Array<Scalars['String']>>;
};

export type Strategies = {
  __typename?: 'Strategies';
  id: Scalars['String'];
  baskets: Baskets;
  created_by_user_id: Scalars['Float'];
  original_created_date?: Maybe<Scalars['DateTime']>;
  trade_list_json?: Maybe<Scalars['String']>;
  editor_json?: Maybe<Scalars['JSON']>;
  average_hpr?: Maybe<Scalars['Float']>;
  average_position_length?: Maybe<Scalars['Float']>;
  backtest_quality_percent?: Maybe<Scalars['Float']>;
  balance_line_stability?: Maybe<Scalars['Float']>;
  bars_in_trade_number?: Maybe<Scalars['Float']>;
  bars_in_trade_percent?: Maybe<Scalars['Float']>;
  count_of_trades?: Maybe<Scalars['Float']>;
  max_consecutive_losses?: Maybe<Scalars['Float']>;
  max_drawdown_number?: Maybe<Scalars['Float']>;
  max_drawdown_percent?: Maybe<Scalars['Float']>;
  months_of_profit?: Maybe<Scalars['Float']>;
  net_balance?: Maybe<Scalars['Float']>;
  net_profit?: Maybe<Scalars['Float']>;
  profit_factor?: Maybe<Scalars['Float']>;
  profit_per_day?: Maybe<Scalars['Float']>;
  r_squared?: Maybe<Scalars['Float']>;
  return_drawdown?: Maybe<Scalars['Float']>;
  sharpe_ratio?: Maybe<Scalars['Float']>;
  max_stagnation_number?: Maybe<Scalars['Float']>;
  max_stagnation_percent?: Maybe<Scalars['Float']>;
  system_quality_number?: Maybe<Scalars['Float']>;
  win_loss?: Maybe<Scalars['Float']>;
  paper_trading: PaperTrading;
  is_deleted: Scalars['Boolean'];
  deleted_at?: Maybe<Scalars['DateTime']>;
  source?: Maybe<Scalars['Float']>;
  source_parent?: Maybe<Scalars['Float']>;
  order?: Maybe<Scalars['Float']>;
  group?: Maybe<Scalars['Float']>;
  group_order?: Maybe<Scalars['Float']>;
  group_name?: Maybe<Scalars['String']>;
};

export type StrategiesBasket = {
  __typename?: 'StrategiesBasket';
  strategy?: Maybe<Array<Strategies>>;
  hasData?: Maybe<Scalars['Boolean']>;
  start?: Maybe<Scalars['Float']>;
  end?: Maybe<Scalars['Float']>;
};

export type StrategiesCriteria = {
  maximum_average_position_length?: Maybe<Scalars['String']>;
  maximum_average_position_length_value?: Maybe<Scalars['Float']>;
  maximum_bars_in_trade?: Maybe<Scalars['String']>;
  maximum_bars_in_trade_value?: Maybe<Scalars['Float']>;
  maximum_consecutive_losses?: Maybe<Scalars['String']>;
  maximum_consecutive_losses_value?: Maybe<Scalars['Float']>;
  maximum_count_of_trades?: Maybe<Scalars['String']>;
  maximum_count_of_trades_value?: Maybe<Scalars['Float']>;
  maximum_equity_drawdown?: Maybe<Scalars['String']>;
  maximum_equity_drawdown_value?: Maybe<Scalars['Float']>;
  maximum_equity_drawdown_percent?: Maybe<Scalars['String']>;
  maximum_equity_drawdown_percent_value?: Maybe<Scalars['Float']>;
  maximum_stagnation?: Maybe<Scalars['String']>;
  maximum_stagnation_value?: Maybe<Scalars['Float']>;
  maximum_stagnation_days?: Maybe<Scalars['String']>;
  maximum_stagnation_days_value?: Maybe<Scalars['Float']>;
  minimum_average_hpr?: Maybe<Scalars['String']>;
  minimum_average_hpr_value?: Maybe<Scalars['Float']>;
  minimum_average_position_length?: Maybe<Scalars['String']>;
  minimum_average_position_length_value?: Maybe<Scalars['Float']>;
  minimum_backtest_quality?: Maybe<Scalars['String']>;
  minimum_backtest_quality_value?: Maybe<Scalars['Float']>;
  minimum_balance_stability?: Maybe<Scalars['String']>;
  minimum_balance_stability_value?: Maybe<Scalars['Float']>;
  minimum_bars_in_trade?: Maybe<Scalars['String']>;
  minimum_bars_in_trade_value?: Maybe<Scalars['Float']>;
  minimum_count_of_trades?: Maybe<Scalars['String']>;
  minimum_count_of_trades_value?: Maybe<Scalars['Float']>;
  minimum_months_on_profit?: Maybe<Scalars['String']>;
  minimum_months_on_profit_value?: Maybe<Scalars['Float']>;
  minimum_net_profit?: Maybe<Scalars['String']>;
  minimum_net_profit_value?: Maybe<Scalars['Float']>;
  minimum_profit_factor?: Maybe<Scalars['String']>;
  minimum_profit_factor_value?: Maybe<Scalars['Float']>;
  minimum_profit_per_day?: Maybe<Scalars['String']>;
  minimum_profit_per_day_value?: Maybe<Scalars['Float']>;
  minimum_r_squared?: Maybe<Scalars['String']>;
  minimum_r_squared_value?: Maybe<Scalars['Float']>;
  minimum_return_drawdown?: Maybe<Scalars['String']>;
  minimum_return_drawdown_value?: Maybe<Scalars['Float']>;
  minimum_sharpe_ratio?: Maybe<Scalars['String']>;
  minimum_sharpe_ratio_value?: Maybe<Scalars['Float']>;
  minimum_system_quality_number?: Maybe<Scalars['String']>;
  minimum_system_quality_number_value?: Maybe<Scalars['Float']>;
  minimum_win_loss_ratio?: Maybe<Scalars['String']>;
  minimum_win_loss_ratio_value?: Maybe<Scalars['Float']>;
};

export type StrategiesResponse = {
  __typename?: 'StrategiesResponse';
  errors?: Maybe<Array<FieldError>>;
  strategies?: Maybe<Array<Strategies>>;
};

export type StrategyBoolen = {
  __typename?: 'StrategyBoolen';
  errors?: Maybe<Array<FieldError>>;
  strategies: Scalars['Boolean'];
};

export type StrategyResponse = {
  __typename?: 'StrategyResponse';
  errors?: Maybe<Array<FieldError>>;
  strategies?: Maybe<Strategies>;
};

export type UpdateResponse = {
  __typename?: 'UpdateResponse';
  user: Users;
};

export type UpdateUserInput = {
  profile_image?: Maybe<Scalars['String']>;
  first_name?: Maybe<Scalars['String']>;
  last_name?: Maybe<Scalars['String']>;
  time_zone?: Maybe<Scalars['String']>;
  email: Scalars['String'];
};

export type Users = {
  __typename?: 'Users';
  id: Scalars['Int'];
  email: Scalars['String'];
  admin: Scalars['Boolean'];
  first_name?: Maybe<Scalars['String']>;
  last_name?: Maybe<Scalars['String']>;
  profile_image?: Maybe<Scalars['String']>;
  time_zone?: Maybe<Scalars['String']>;
};

export type WalletTransactions = {
  __typename?: 'WalletTransactions';
  id: Scalars['Int'];
  account_id: Scalars['String'];
  date: Scalars['DateTime'];
  name: Scalars['String'];
  amount: Scalars['String'];
  transaction_type: Scalars['String'];
  balance: Scalars['String'];
  currency_code: Scalars['String'];
};

export type WalletTransactionsSummary = {
  __typename?: 'WalletTransactionsSummary';
  id: Scalars['Int'];
  date: Scalars['DateTime'];
  debit: Scalars['String'];
  credit: Scalars['String'];
  balance: Scalars['String'];
  currency_code: Scalars['String'];
};

export type AddMarketMutationVariables = Exact<{
  symbol?: Maybe<Scalars['String']>;
}>;


export type AddMarketMutation = (
  { __typename?: 'Mutation' }
  & { addMarket?: Maybe<Array<(
    { __typename?: 'MarketAdd' }
    & Pick<MarketAdd, 'id' | 'name' | 'symbol' | 'equity' | 'timezone' | 'type' | 'region' | 'exchange' | 'marketOpen' | 'marketClose' | 'matchScore' | 'currency' | 'period' | 'first_data' | 'last_data' | 'number_data_records' | 'data_last_downloaded' | 'newAdded'>
  )>> }
);

export type AlpacaAccountMutationVariables = Exact<{
  token: Scalars['String'];
}>;


export type AlpacaAccountMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'alpacaAccount'>
);

export type AlpacaAuthorizeMutationVariables = Exact<{
  code: Scalars['String'];
}>;


export type AlpacaAuthorizeMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'alpacaAuthorize'>
);

export type AlpacaCreateTradeMutationVariables = Exact<{
  token: Scalars['String'];
  symbol: Scalars['String'];
  qty: Scalars['Float'];
  side: Scalars['String'];
  type: Scalars['String'];
  timeInForce: Scalars['String'];
  userToken: Scalars['String'];
}>;


export type AlpacaCreateTradeMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'alpacaCreateTrade'>
);

export type AlpacaOauthQueryVariables = Exact<{ [key: string]: never; }>;


export type AlpacaOauthQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'alpacaOauth'>
);

export type AlpacaOrdersMutationVariables = Exact<{
  token: Scalars['String'];
}>;


export type AlpacaOrdersMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'alpacaOrders'>
);

export type AlpacaPortfolioMutationVariables = Exact<{
  token: Scalars['String'];
}>;


export type AlpacaPortfolioMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'alpacaPortfolio'>
);

export type AlpacaPositionsMutationVariables = Exact<{
  token: Scalars['String'];
}>;


export type AlpacaPositionsMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'alpacaPositions'>
);

export type ByeQueryVariables = Exact<{ [key: string]: never; }>;


export type ByeQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'bye'>
);

export type DeleteAllStrategiesMutationVariables = Exact<{
  token: Scalars['String'];
}>;


export type DeleteAllStrategiesMutation = (
  { __typename?: 'Mutation' }
  & { deleteAllStrategies: (
    { __typename?: 'StrategyBoolen' }
    & Pick<StrategyBoolen, 'strategies'>
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>> }
  ) }
);

export type DeleteStrategiesMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteStrategiesMutation = (
  { __typename?: 'Mutation' }
  & { deleteStrategies: (
    { __typename?: 'StrategyResponse' }
    & { strategies?: Maybe<(
      { __typename?: 'Strategies' }
      & Pick<Strategies, 'id'>
    )>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>> }
  ) }
);

export type GetAllLogsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllLogsQuery = (
  { __typename?: 'Query' }
  & { allLogs: Array<(
    { __typename?: 'SignalLogs' }
    & Pick<SignalLogs, 'id' | 'signal_logs'>
  )> }
);

export type AlphavantageSearchQueryVariables = Exact<{
  symbol?: Maybe<Scalars['String']>;
  haveData?: Maybe<Scalars['Boolean']>;
}>;


export type AlphavantageSearchQuery = (
  { __typename?: 'Query' }
  & { alphavantageSearch: Array<(
    { __typename?: 'Markets' }
    & Pick<Markets, 'name' | 'symbol' | 'timezone' | 'type' | 'marketOpen' | 'marketClose' | 'currency' | 'matchScore' | 'exchange' | 'period' | 'number_data_records' | 'first_data' | 'last_data'>
  )> }
);

export type GetAlphavantageMarketDataMutationVariables = Exact<{
  symbol: Scalars['String'];
  interval: Scalars['String'];
}>;


export type GetAlphavantageMarketDataMutation = (
  { __typename?: 'Mutation' }
  & { getAlphavantageMarketData?: Maybe<(
    { __typename?: 'AlphavantageApiResponse' }
    & { alphavantage_market_data?: Maybe<Array<(
      { __typename?: 'MarketData' }
      & Pick<MarketData, 'interval' | 'symbol' | 'last_update' | 'open' | 'high' | 'low' | 'close' | 'volume'>
    )>> }
  )> }
);

export type GetBankAccountListMutationVariables = Exact<{
  data: BankAccountInput;
}>;


export type GetBankAccountListMutation = (
  { __typename?: 'Mutation' }
  & { getBankAccountList: (
    { __typename?: 'BankAccountResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, bank?: Maybe<Array<(
      { __typename?: 'BankAccounts' }
      & Pick<BankAccounts, 'name'>
    )>> }
  ) }
);

export type GetDepositsByIdMutationVariables = Exact<{
  data: AutoDepositInput;
}>;


export type GetDepositsByIdMutation = (
  { __typename?: 'Mutation' }
  & { getDepositsById: (
    { __typename?: 'DepositResponse' }
    & { deposit?: Maybe<(
      { __typename?: 'AutoDeposits' }
      & Pick<AutoDeposits, 'id' | 'user_id' | 'minimum_wallet_balance' | 'amount_deposit' | 'bank_account' | 'created_date' | 'is_auto' | 'is_min_automatic' | 'is_amt_automatic'>
    )>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>> }
  ) }
);

export type GetLogsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetLogsQuery = (
  { __typename?: 'Query' }
  & { getLogs: (
    { __typename?: 'SignalLogs' }
    & Pick<SignalLogs, 'signal_logs' | 'id'>
  ) }
);

export type InitializeMarketQueryVariables = Exact<{ [key: string]: never; }>;


export type InitializeMarketQuery = (
  { __typename?: 'Query' }
  & { initializeMarket: (
    { __typename?: 'MarketOneResponse' }
    & { market?: Maybe<(
      { __typename?: 'Markets' }
      & Pick<Markets, 'id' | 'name' | 'symbol' | 'equity' | 'timezone' | 'type' | 'region' | 'exchange' | 'marketOpen' | 'marketClose' | 'matchScore' | 'currency' | 'period' | 'first_data' | 'last_data' | 'number_data_records' | 'data_last_downloaded'>
    )> }
  ) }
);

export type GetMarketDataMutationVariables = Exact<{
  marketId: Scalars['Int'];
  symbol: Scalars['String'];
  interval: Scalars['String'];
}>;


export type GetMarketDataMutation = (
  { __typename?: 'Mutation' }
  & { getMarketData?: Maybe<Array<(
    { __typename?: 'MarketData' }
    & Pick<MarketData, 'id' | 'interval' | 'marketId' | 'symbol' | 'last_update' | 'open' | 'high' | 'low' | 'close' | 'volume'>
  )>> }
);

export type GetMarketDataSymbolQueryVariables = Exact<{
  symbol?: Maybe<Scalars['String']>;
  interval?: Maybe<Scalars['String']>;
}>;


export type GetMarketDataSymbolQuery = (
  { __typename?: 'Query' }
  & { getMarketDataSymbol: (
    { __typename?: 'MarketDataResponse' }
    & { market?: Maybe<(
      { __typename?: 'Markets' }
      & Pick<Markets, 'currency' | 'name'>
    )>, market_data?: Maybe<Array<(
      { __typename?: 'MarketData' }
      & Pick<MarketData, 'id' | 'interval' | 'symbol' | 'open' | 'close' | 'high' | 'low' | 'volume' | 'last_update'>
    )>>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>> }
  ) }
);

export type GetMarketListQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMarketListQuery = (
  { __typename?: 'Query' }
  & { getMarketList: (
    { __typename?: 'MarketResponse' }
    & { market?: Maybe<Array<(
      { __typename?: 'Markets' }
      & Pick<Markets, 'id' | 'name' | 'symbol' | 'exchange' | 'currency'>
    )>>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'message' | 'field'>
    )>> }
  ) }
);

export type MarketsSearchMutationVariables = Exact<{
  symbol?: Maybe<Scalars['String']>;
  haveData?: Maybe<Scalars['Boolean']>;
  options?: Maybe<SearchType>;
}>;


export type MarketsSearchMutation = (
  { __typename?: 'Mutation' }
  & { marketsSearch: Array<(
    { __typename?: 'Markets' }
    & Pick<Markets, 'id' | 'name' | 'symbol' | 'timezone' | 'type' | 'marketOpen' | 'marketClose' | 'currency' | 'matchScore' | 'exchange' | 'period' | 'number_data_records' | 'first_data' | 'last_data'>
  )> }
);

export type GetMarketSymbolQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMarketSymbolQuery = (
  { __typename?: 'Query' }
  & { getMarketSymbol: (
    { __typename?: 'MarketResponse' }
    & { market?: Maybe<Array<(
      { __typename?: 'Markets' }
      & Pick<Markets, 'id' | 'symbol' | 'name'>
    )>>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'message' | 'field'>
    )>> }
  ) }
);

export type GetPaperTradesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPaperTradesQuery = (
  { __typename?: 'Query' }
  & { getPaperTrades: Array<(
    { __typename?: 'PaperTrade' }
    & Pick<PaperTrade, 'id' | 'strategy_id' | 'market_id' | 'symbol' | 'price' | 'trade_amount' | 'stop_loss' | 'take_profit' | 'profit' | 'balance' | 'date_time' | 'open' | 'high' | 'low' | 'close' | 'volume' | 'trade_type'>
  )> }
);

export type GetPaperTradingByIdQueryVariables = Exact<{
  data: PaperTradingInput;
}>;


export type GetPaperTradingByIdQuery = (
  { __typename?: 'Query' }
  & { getPaperTradingById: (
    { __typename?: 'PaperTradingResponse' }
    & { paper_trading?: Maybe<Array<(
      { __typename?: 'PaperTrading' }
      & Pick<PaperTrading, 'id' | 'user_id' | 'cumul_return'>
      & { strategies: Array<(
        { __typename?: 'Strategies' }
        & Pick<Strategies, 'id' | 'net_profit' | 'max_drawdown_number' | 'count_of_trades' | 'profit_factor' | 'months_of_profit' | 'source' | 'source_parent' | 'order' | 'group' | 'group_order' | 'editor_json' | 'group_name'>
      )> }
    )>> }
  ) }
);

export type GetRememberMeMutationVariables = Exact<{
  token: Scalars['String'];
}>;


export type GetRememberMeMutation = (
  { __typename?: 'Mutation' }
  & { getRememberMe: (
    { __typename?: 'LoginResponse' }
    & { user?: Maybe<(
      { __typename?: 'Users' }
      & Pick<Users, 'id' | 'email' | 'admin' | 'first_name' | 'last_name' | 'profile_image' | 'time_zone'>
    )> }
  ) }
);

export type GetStrategiesQueryVariables = Exact<{
  token: Scalars['String'];
  sort_id: Scalars['String'];
  type: Scalars['String'];
  data: StrategiesCriteria;
}>;


export type GetStrategiesQuery = (
  { __typename?: 'Query' }
  & { getStrategies: (
    { __typename?: 'StrategiesBasket' }
    & Pick<StrategiesBasket, 'hasData' | 'start' | 'end'>
    & { strategy?: Maybe<Array<(
      { __typename?: 'Strategies' }
      & Pick<Strategies, 'id' | 'net_profit' | 'profit_per_day' | 'max_drawdown_number' | 'return_drawdown' | 'count_of_trades' | 'original_created_date' | 'editor_json'>
    )>> }
  ) }
);

export type GetStrategyProfileQueryVariables = Exact<{
  id: Scalars['String'];
  token?: Scalars['String'];
}>;


export type GetStrategyProfileQuery = (
  { __typename?: 'Query' }
  & { getStrategyProfile: (
    { __typename?: 'Strategies' }
    & Pick<Strategies, 'id' | 'created_by_user_id' | 'trade_list_json' | 'editor_json' | 'average_hpr' | 'average_position_length' | 'backtest_quality_percent' | 'balance_line_stability' | 'bars_in_trade_number' | 'bars_in_trade_percent' | 'count_of_trades' | 'max_consecutive_losses' | 'max_drawdown_number' | 'max_drawdown_percent' | 'months_of_profit' | 'net_balance' | 'net_profit' | 'profit_factor' | 'profit_per_day' | 'r_squared' | 'return_drawdown' | 'sharpe_ratio' | 'max_stagnation_number' | 'system_quality_number' | 'win_loss'>
  ) }
);

export type GetTrashQueryVariables = Exact<{
  token: Scalars['String'];
}>;


export type GetTrashQuery = (
  { __typename?: 'Query' }
  & { getTrash: (
    { __typename?: 'StrategiesResponse' }
    & { strategies?: Maybe<Array<(
      { __typename?: 'Strategies' }
      & Pick<Strategies, 'id' | 'deleted_at'>
    )>>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>> }
  ) }
);

export type HelloQueryVariables = Exact<{ [key: string]: never; }>;


export type HelloQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'hello'>
);

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
  isRememberActive: Scalars['Boolean'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'LoginResponse' }
    & Pick<LoginResponse, 'accessToken' | 'rememberMeToken'>
    & { user?: Maybe<(
      { __typename?: 'Users' }
      & Pick<Users, 'id' | 'email' | 'admin' | 'first_name' | 'last_name' | 'profile_image' | 'time_zone'>
    )>, errors?: Maybe<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )> }
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type MarketsQueryVariables = Exact<{ [key: string]: never; }>;


export type MarketsQuery = (
  { __typename?: 'Query' }
  & { markets: Array<(
    { __typename?: 'Markets' }
    & Pick<Markets, 'id' | 'name' | 'exchange'>
  )> }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'Users' }
    & Pick<Users, 'id' | 'email' | 'admin' | 'first_name' | 'last_name' | 'profile_image' | 'time_zone'>
  )> }
);

export type MoveStrategiesMutationVariables = Exact<{
  token: Scalars['String'];
  data: Scalars['String'];
}>;


export type MoveStrategiesMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'moveStrategies'>
);

export type MoveStrategyMutationVariables = Exact<{
  token: Scalars['String'];
  data: Scalars['String'];
}>;


export type MoveStrategyMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'moveStrategy'>
);

export type PlaidAccessMutationVariables = Exact<{
  plaidToken: Scalars['String'];
}>;


export type PlaidAccessMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'plaidAccess'>
);

export type PlaidAccountRemoveMutationVariables = Exact<{
  id: Scalars['Float'];
}>;


export type PlaidAccountRemoveMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'plaidAccountRemove'>
);

export type PlaidAccountsMutationVariables = Exact<{
  token: Scalars['String'];
}>;


export type PlaidAccountsMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'plaidAccounts'>
);

export type PlaidCreateAccountMutationVariables = Exact<{
  token: Scalars['String'];
  accountId: Scalars['String'];
  accountName: Scalars['String'];
  institution: Scalars['String'];
  accountNumber: Scalars['String'];
  institutionId: Scalars['String'];
  InstitutionLogo: Scalars['String'];
}>;


export type PlaidCreateAccountMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'plaidCreateAccount'>
);

export type PlaiInstitutionIconMutationVariables = Exact<{
  insId: Scalars['String'];
}>;


export type PlaiInstitutionIconMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'plaiInstitutionIcon'>
);

export type PlaidLinkQueryVariables = Exact<{ [key: string]: never; }>;


export type PlaidLinkQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'plaidLink'>
);

export type PlaidMailMutationVariables = Exact<{
  mailContent: Scalars['String'];
  token: Scalars['String'];
}>;


export type PlaidMailMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'plaidMail'>
);

export type PlaidNicknameUpdateMutationVariables = Exact<{
  id: Scalars['Float'];
  value: Scalars['String'];
}>;


export type PlaidNicknameUpdateMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'plaidNicknameUpdate'>
);

export type RegisterMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'register'>
);

export type ResetMutationVariables = Exact<{
  token: Scalars['String'];
  old_password: Scalars['String'];
  new_password: Scalars['String'];
}>;


export type ResetMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'resetPassword'>
);

export type RetrieveStrategiesMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type RetrieveStrategiesMutation = (
  { __typename?: 'Mutation' }
  & { retrieveStrategies: (
    { __typename?: 'StrategyResponse' }
    & { strategies?: Maybe<(
      { __typename?: 'Strategies' }
      & Pick<Strategies, 'id'>
    )>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>> }
  ) }
);

export type SaveDepositMutationVariables = Exact<{
  data: SaveDepositInput;
}>;


export type SaveDepositMutation = (
  { __typename?: 'Mutation' }
  & { saveDeposit: (
    { __typename?: 'DepositResponse' }
    & { deposit?: Maybe<(
      { __typename?: 'AutoDeposits' }
      & Pick<AutoDeposits, 'id' | 'minimum_wallet_balance' | 'amount_deposit' | 'bank_account' | 'is_auto' | 'is_min_automatic' | 'is_amt_automatic'>
    )> }
  ) }
);

export type SaveStrategyMutationVariables = Exact<{
  options: GetStrategyProfileArgs;
  token: Scalars['String'];
}>;


export type SaveStrategyMutation = (
  { __typename?: 'Mutation' }
  & { saveStrategy: (
    { __typename?: 'Strategies' }
    & Pick<Strategies, 'created_by_user_id' | 'id' | 'editor_json' | 'average_hpr' | 'average_position_length' | 'backtest_quality_percent' | 'balance_line_stability' | 'bars_in_trade_number' | 'bars_in_trade_percent' | 'count_of_trades' | 'net_balance' | 'net_profit' | 'profit_factor' | 'profit_per_day' | 'r_squared' | 'return_drawdown' | 'sharpe_ratio' | 'max_stagnation_number' | 'max_stagnation_percent' | 'system_quality_number' | 'win_loss'>
  ) }
);

export type TransferStrategiesMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type TransferStrategiesMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'transferStrategies'>
);

export type UpdateStrategyMutationVariables = Exact<{
  options: GetStrategyProfileArgs;
  token: Scalars['String'];
}>;


export type UpdateStrategyMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'updateStrategy'>
);

export type UpdateUserDetailsMutationVariables = Exact<{
  token: Scalars['String'];
  data: UpdateUserInput;
}>;


export type UpdateUserDetailsMutation = (
  { __typename?: 'Mutation' }
  & { updateUserDetails: (
    { __typename?: 'UpdateResponse' }
    & { user: (
      { __typename?: 'Users' }
      & Pick<Users, 'id' | 'email' | 'admin' | 'first_name' | 'last_name' | 'profile_image' | 'time_zone'>
    ) }
  ) }
);

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = (
  { __typename?: 'Query' }
  & { users: Array<(
    { __typename?: 'Users' }
    & Pick<Users, 'id' | 'email' | 'admin'>
  )> }
);

export type VerificationMutationVariables = Exact<{
  token: Scalars['String'];
}>;


export type VerificationMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'verification'>
);

export type AddSummaryMutationVariables = Exact<{
  currency_code: Scalars['String'];
  balance: Scalars['String'];
  debit: Scalars['String'];
  credit: Scalars['String'];
  date: Scalars['String'];
}>;


export type AddSummaryMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'addSummary'>
);

export type AddTransactionsMutationVariables = Exact<{
  transaction_type: Scalars['String'];
  currency_code: Scalars['String'];
  balance: Scalars['String'];
  amount: Scalars['String'];
  date: Scalars['String'];
  name: Scalars['String'];
}>;


export type AddTransactionsMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'addTransactions'>
);

export type RemoveTransactionsMutationVariables = Exact<{ [key: string]: never; }>;


export type RemoveTransactionsMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'removeTransactions'>
);

export type GetSummaryQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSummaryQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'getSummary'>
);


export const AddMarketDocument = gql`
    mutation addMarket($symbol: String) {
  addMarket(symbol: $symbol) {
    id
    name
    symbol
    equity
    timezone
    type
    region
    exchange
    marketOpen
    marketClose
    matchScore
    currency
    period
    first_data
    last_data
    number_data_records
    data_last_downloaded
    newAdded
  }
}
    `;
export type AddMarketMutationFn = ApolloReactCommon.MutationFunction<AddMarketMutation, AddMarketMutationVariables>;

/**
 * __useAddMarketMutation__
 *
 * To run a mutation, you first call `useAddMarketMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddMarketMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addMarketMutation, { data, loading, error }] = useAddMarketMutation({
 *   variables: {
 *      symbol: // value for 'symbol'
 *   },
 * });
 */
export function useAddMarketMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AddMarketMutation, AddMarketMutationVariables>) {
        return ApolloReactHooks.useMutation<AddMarketMutation, AddMarketMutationVariables>(AddMarketDocument, baseOptions);
      }
export type AddMarketMutationHookResult = ReturnType<typeof useAddMarketMutation>;
export type AddMarketMutationResult = ApolloReactCommon.MutationResult<AddMarketMutation>;
export type AddMarketMutationOptions = ApolloReactCommon.BaseMutationOptions<AddMarketMutation, AddMarketMutationVariables>;
export const AlpacaAccountDocument = gql`
    mutation AlpacaAccount($token: String!) {
  alpacaAccount(token: $token)
}
    `;
export type AlpacaAccountMutationFn = ApolloReactCommon.MutationFunction<AlpacaAccountMutation, AlpacaAccountMutationVariables>;

/**
 * __useAlpacaAccountMutation__
 *
 * To run a mutation, you first call `useAlpacaAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAlpacaAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [alpacaAccountMutation, { data, loading, error }] = useAlpacaAccountMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useAlpacaAccountMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AlpacaAccountMutation, AlpacaAccountMutationVariables>) {
        return ApolloReactHooks.useMutation<AlpacaAccountMutation, AlpacaAccountMutationVariables>(AlpacaAccountDocument, baseOptions);
      }
export type AlpacaAccountMutationHookResult = ReturnType<typeof useAlpacaAccountMutation>;
export type AlpacaAccountMutationResult = ApolloReactCommon.MutationResult<AlpacaAccountMutation>;
export type AlpacaAccountMutationOptions = ApolloReactCommon.BaseMutationOptions<AlpacaAccountMutation, AlpacaAccountMutationVariables>;
export const AlpacaAuthorizeDocument = gql`
    mutation AlpacaAuthorize($code: String!) {
  alpacaAuthorize(code: $code)
}
    `;
export type AlpacaAuthorizeMutationFn = ApolloReactCommon.MutationFunction<AlpacaAuthorizeMutation, AlpacaAuthorizeMutationVariables>;

/**
 * __useAlpacaAuthorizeMutation__
 *
 * To run a mutation, you first call `useAlpacaAuthorizeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAlpacaAuthorizeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [alpacaAuthorizeMutation, { data, loading, error }] = useAlpacaAuthorizeMutation({
 *   variables: {
 *      code: // value for 'code'
 *   },
 * });
 */
export function useAlpacaAuthorizeMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AlpacaAuthorizeMutation, AlpacaAuthorizeMutationVariables>) {
        return ApolloReactHooks.useMutation<AlpacaAuthorizeMutation, AlpacaAuthorizeMutationVariables>(AlpacaAuthorizeDocument, baseOptions);
      }
export type AlpacaAuthorizeMutationHookResult = ReturnType<typeof useAlpacaAuthorizeMutation>;
export type AlpacaAuthorizeMutationResult = ApolloReactCommon.MutationResult<AlpacaAuthorizeMutation>;
export type AlpacaAuthorizeMutationOptions = ApolloReactCommon.BaseMutationOptions<AlpacaAuthorizeMutation, AlpacaAuthorizeMutationVariables>;
export const AlpacaCreateTradeDocument = gql`
    mutation AlpacaCreateTrade($token: String!, $symbol: String!, $qty: Float!, $side: String!, $type: String!, $timeInForce: String!, $userToken: String!) {
  alpacaCreateTrade(token: $token, symbol: $symbol, qty: $qty, side: $side, type: $type, timeInForce: $timeInForce, userToken: $userToken)
}
    `;
export type AlpacaCreateTradeMutationFn = ApolloReactCommon.MutationFunction<AlpacaCreateTradeMutation, AlpacaCreateTradeMutationVariables>;

/**
 * __useAlpacaCreateTradeMutation__
 *
 * To run a mutation, you first call `useAlpacaCreateTradeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAlpacaCreateTradeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [alpacaCreateTradeMutation, { data, loading, error }] = useAlpacaCreateTradeMutation({
 *   variables: {
 *      token: // value for 'token'
 *      symbol: // value for 'symbol'
 *      qty: // value for 'qty'
 *      side: // value for 'side'
 *      type: // value for 'type'
 *      timeInForce: // value for 'timeInForce'
 *      userToken: // value for 'userToken'
 *   },
 * });
 */
export function useAlpacaCreateTradeMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AlpacaCreateTradeMutation, AlpacaCreateTradeMutationVariables>) {
        return ApolloReactHooks.useMutation<AlpacaCreateTradeMutation, AlpacaCreateTradeMutationVariables>(AlpacaCreateTradeDocument, baseOptions);
      }
export type AlpacaCreateTradeMutationHookResult = ReturnType<typeof useAlpacaCreateTradeMutation>;
export type AlpacaCreateTradeMutationResult = ApolloReactCommon.MutationResult<AlpacaCreateTradeMutation>;
export type AlpacaCreateTradeMutationOptions = ApolloReactCommon.BaseMutationOptions<AlpacaCreateTradeMutation, AlpacaCreateTradeMutationVariables>;
export const AlpacaOauthDocument = gql`
    query AlpacaOauth {
  alpacaOauth
}
    `;

/**
 * __useAlpacaOauthQuery__
 *
 * To run a query within a React component, call `useAlpacaOauthQuery` and pass it any options that fit your needs.
 * When your component renders, `useAlpacaOauthQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAlpacaOauthQuery({
 *   variables: {
 *   },
 * });
 */
export function useAlpacaOauthQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<AlpacaOauthQuery, AlpacaOauthQueryVariables>) {
        return ApolloReactHooks.useQuery<AlpacaOauthQuery, AlpacaOauthQueryVariables>(AlpacaOauthDocument, baseOptions);
      }
export function useAlpacaOauthLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<AlpacaOauthQuery, AlpacaOauthQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<AlpacaOauthQuery, AlpacaOauthQueryVariables>(AlpacaOauthDocument, baseOptions);
        }
export type AlpacaOauthQueryHookResult = ReturnType<typeof useAlpacaOauthQuery>;
export type AlpacaOauthLazyQueryHookResult = ReturnType<typeof useAlpacaOauthLazyQuery>;
export type AlpacaOauthQueryResult = ApolloReactCommon.QueryResult<AlpacaOauthQuery, AlpacaOauthQueryVariables>;
export const AlpacaOrdersDocument = gql`
    mutation AlpacaOrders($token: String!) {
  alpacaOrders(token: $token)
}
    `;
export type AlpacaOrdersMutationFn = ApolloReactCommon.MutationFunction<AlpacaOrdersMutation, AlpacaOrdersMutationVariables>;

/**
 * __useAlpacaOrdersMutation__
 *
 * To run a mutation, you first call `useAlpacaOrdersMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAlpacaOrdersMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [alpacaOrdersMutation, { data, loading, error }] = useAlpacaOrdersMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useAlpacaOrdersMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AlpacaOrdersMutation, AlpacaOrdersMutationVariables>) {
        return ApolloReactHooks.useMutation<AlpacaOrdersMutation, AlpacaOrdersMutationVariables>(AlpacaOrdersDocument, baseOptions);
      }
export type AlpacaOrdersMutationHookResult = ReturnType<typeof useAlpacaOrdersMutation>;
export type AlpacaOrdersMutationResult = ApolloReactCommon.MutationResult<AlpacaOrdersMutation>;
export type AlpacaOrdersMutationOptions = ApolloReactCommon.BaseMutationOptions<AlpacaOrdersMutation, AlpacaOrdersMutationVariables>;
export const AlpacaPortfolioDocument = gql`
    mutation AlpacaPortfolio($token: String!) {
  alpacaPortfolio(token: $token)
}
    `;
export type AlpacaPortfolioMutationFn = ApolloReactCommon.MutationFunction<AlpacaPortfolioMutation, AlpacaPortfolioMutationVariables>;

/**
 * __useAlpacaPortfolioMutation__
 *
 * To run a mutation, you first call `useAlpacaPortfolioMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAlpacaPortfolioMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [alpacaPortfolioMutation, { data, loading, error }] = useAlpacaPortfolioMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useAlpacaPortfolioMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AlpacaPortfolioMutation, AlpacaPortfolioMutationVariables>) {
        return ApolloReactHooks.useMutation<AlpacaPortfolioMutation, AlpacaPortfolioMutationVariables>(AlpacaPortfolioDocument, baseOptions);
      }
export type AlpacaPortfolioMutationHookResult = ReturnType<typeof useAlpacaPortfolioMutation>;
export type AlpacaPortfolioMutationResult = ApolloReactCommon.MutationResult<AlpacaPortfolioMutation>;
export type AlpacaPortfolioMutationOptions = ApolloReactCommon.BaseMutationOptions<AlpacaPortfolioMutation, AlpacaPortfolioMutationVariables>;
export const AlpacaPositionsDocument = gql`
    mutation AlpacaPositions($token: String!) {
  alpacaPositions(token: $token)
}
    `;
export type AlpacaPositionsMutationFn = ApolloReactCommon.MutationFunction<AlpacaPositionsMutation, AlpacaPositionsMutationVariables>;

/**
 * __useAlpacaPositionsMutation__
 *
 * To run a mutation, you first call `useAlpacaPositionsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAlpacaPositionsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [alpacaPositionsMutation, { data, loading, error }] = useAlpacaPositionsMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useAlpacaPositionsMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AlpacaPositionsMutation, AlpacaPositionsMutationVariables>) {
        return ApolloReactHooks.useMutation<AlpacaPositionsMutation, AlpacaPositionsMutationVariables>(AlpacaPositionsDocument, baseOptions);
      }
export type AlpacaPositionsMutationHookResult = ReturnType<typeof useAlpacaPositionsMutation>;
export type AlpacaPositionsMutationResult = ApolloReactCommon.MutationResult<AlpacaPositionsMutation>;
export type AlpacaPositionsMutationOptions = ApolloReactCommon.BaseMutationOptions<AlpacaPositionsMutation, AlpacaPositionsMutationVariables>;
export const ByeDocument = gql`
    query Bye {
  bye
}
    `;

/**
 * __useByeQuery__
 *
 * To run a query within a React component, call `useByeQuery` and pass it any options that fit your needs.
 * When your component renders, `useByeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useByeQuery({
 *   variables: {
 *   },
 * });
 */
export function useByeQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ByeQuery, ByeQueryVariables>) {
        return ApolloReactHooks.useQuery<ByeQuery, ByeQueryVariables>(ByeDocument, baseOptions);
      }
export function useByeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ByeQuery, ByeQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<ByeQuery, ByeQueryVariables>(ByeDocument, baseOptions);
        }
export type ByeQueryHookResult = ReturnType<typeof useByeQuery>;
export type ByeLazyQueryHookResult = ReturnType<typeof useByeLazyQuery>;
export type ByeQueryResult = ApolloReactCommon.QueryResult<ByeQuery, ByeQueryVariables>;
export const DeleteAllStrategiesDocument = gql`
    mutation DeleteAllStrategies($token: String!) {
  deleteAllStrategies(token: $token) {
    errors {
      field
      message
    }
    strategies
  }
}
    `;
export type DeleteAllStrategiesMutationFn = ApolloReactCommon.MutationFunction<DeleteAllStrategiesMutation, DeleteAllStrategiesMutationVariables>;

/**
 * __useDeleteAllStrategiesMutation__
 *
 * To run a mutation, you first call `useDeleteAllStrategiesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAllStrategiesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAllStrategiesMutation, { data, loading, error }] = useDeleteAllStrategiesMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useDeleteAllStrategiesMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteAllStrategiesMutation, DeleteAllStrategiesMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteAllStrategiesMutation, DeleteAllStrategiesMutationVariables>(DeleteAllStrategiesDocument, baseOptions);
      }
export type DeleteAllStrategiesMutationHookResult = ReturnType<typeof useDeleteAllStrategiesMutation>;
export type DeleteAllStrategiesMutationResult = ApolloReactCommon.MutationResult<DeleteAllStrategiesMutation>;
export type DeleteAllStrategiesMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteAllStrategiesMutation, DeleteAllStrategiesMutationVariables>;
export const DeleteStrategiesDocument = gql`
    mutation DeleteStrategies($id: String!) {
  deleteStrategies(id: $id) {
    strategies {
      id
    }
    errors {
      field
      message
    }
  }
}
    `;
export type DeleteStrategiesMutationFn = ApolloReactCommon.MutationFunction<DeleteStrategiesMutation, DeleteStrategiesMutationVariables>;

/**
 * __useDeleteStrategiesMutation__
 *
 * To run a mutation, you first call `useDeleteStrategiesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteStrategiesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteStrategiesMutation, { data, loading, error }] = useDeleteStrategiesMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteStrategiesMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteStrategiesMutation, DeleteStrategiesMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteStrategiesMutation, DeleteStrategiesMutationVariables>(DeleteStrategiesDocument, baseOptions);
      }
export type DeleteStrategiesMutationHookResult = ReturnType<typeof useDeleteStrategiesMutation>;
export type DeleteStrategiesMutationResult = ApolloReactCommon.MutationResult<DeleteStrategiesMutation>;
export type DeleteStrategiesMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteStrategiesMutation, DeleteStrategiesMutationVariables>;
export const GetAllLogsDocument = gql`
    query getAllLogs {
  allLogs {
    id
    signal_logs
  }
}
    `;

/**
 * __useGetAllLogsQuery__
 *
 * To run a query within a React component, call `useGetAllLogsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllLogsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllLogsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllLogsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetAllLogsQuery, GetAllLogsQueryVariables>) {
        return ApolloReactHooks.useQuery<GetAllLogsQuery, GetAllLogsQueryVariables>(GetAllLogsDocument, baseOptions);
      }
export function useGetAllLogsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetAllLogsQuery, GetAllLogsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetAllLogsQuery, GetAllLogsQueryVariables>(GetAllLogsDocument, baseOptions);
        }
export type GetAllLogsQueryHookResult = ReturnType<typeof useGetAllLogsQuery>;
export type GetAllLogsLazyQueryHookResult = ReturnType<typeof useGetAllLogsLazyQuery>;
export type GetAllLogsQueryResult = ApolloReactCommon.QueryResult<GetAllLogsQuery, GetAllLogsQueryVariables>;
export const AlphavantageSearchDocument = gql`
    query alphavantageSearch($symbol: String, $haveData: Boolean) {
  alphavantageSearch(symbol: $symbol, haveData: $haveData) {
    name
    symbol
    timezone
    type
    marketOpen
    marketClose
    timezone
    currency
    matchScore
    exchange
    period
    number_data_records
    first_data
    last_data
  }
}
    `;

/**
 * __useAlphavantageSearchQuery__
 *
 * To run a query within a React component, call `useAlphavantageSearchQuery` and pass it any options that fit your needs.
 * When your component renders, `useAlphavantageSearchQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAlphavantageSearchQuery({
 *   variables: {
 *      symbol: // value for 'symbol'
 *      haveData: // value for 'haveData'
 *   },
 * });
 */
export function useAlphavantageSearchQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<AlphavantageSearchQuery, AlphavantageSearchQueryVariables>) {
        return ApolloReactHooks.useQuery<AlphavantageSearchQuery, AlphavantageSearchQueryVariables>(AlphavantageSearchDocument, baseOptions);
      }
export function useAlphavantageSearchLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<AlphavantageSearchQuery, AlphavantageSearchQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<AlphavantageSearchQuery, AlphavantageSearchQueryVariables>(AlphavantageSearchDocument, baseOptions);
        }
export type AlphavantageSearchQueryHookResult = ReturnType<typeof useAlphavantageSearchQuery>;
export type AlphavantageSearchLazyQueryHookResult = ReturnType<typeof useAlphavantageSearchLazyQuery>;
export type AlphavantageSearchQueryResult = ApolloReactCommon.QueryResult<AlphavantageSearchQuery, AlphavantageSearchQueryVariables>;
export const GetAlphavantageMarketDataDocument = gql`
    mutation getAlphavantageMarketData($symbol: String!, $interval: String!) {
  getAlphavantageMarketData(symbol: $symbol, interval: $interval) {
    alphavantage_market_data {
      interval
      symbol
      last_update
      open
      high
      low
      close
      volume
    }
  }
}
    `;
export type GetAlphavantageMarketDataMutationFn = ApolloReactCommon.MutationFunction<GetAlphavantageMarketDataMutation, GetAlphavantageMarketDataMutationVariables>;

/**
 * __useGetAlphavantageMarketDataMutation__
 *
 * To run a mutation, you first call `useGetAlphavantageMarketDataMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGetAlphavantageMarketDataMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [getAlphavantageMarketDataMutation, { data, loading, error }] = useGetAlphavantageMarketDataMutation({
 *   variables: {
 *      symbol: // value for 'symbol'
 *      interval: // value for 'interval'
 *   },
 * });
 */
export function useGetAlphavantageMarketDataMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<GetAlphavantageMarketDataMutation, GetAlphavantageMarketDataMutationVariables>) {
        return ApolloReactHooks.useMutation<GetAlphavantageMarketDataMutation, GetAlphavantageMarketDataMutationVariables>(GetAlphavantageMarketDataDocument, baseOptions);
      }
export type GetAlphavantageMarketDataMutationHookResult = ReturnType<typeof useGetAlphavantageMarketDataMutation>;
export type GetAlphavantageMarketDataMutationResult = ApolloReactCommon.MutationResult<GetAlphavantageMarketDataMutation>;
export type GetAlphavantageMarketDataMutationOptions = ApolloReactCommon.BaseMutationOptions<GetAlphavantageMarketDataMutation, GetAlphavantageMarketDataMutationVariables>;
export const GetBankAccountListDocument = gql`
    mutation GetBankAccountList($data: BankAccountInput!) {
  getBankAccountList(data: $data) {
    errors {
      field
      message
    }
    bank {
      name
    }
  }
}
    `;
export type GetBankAccountListMutationFn = ApolloReactCommon.MutationFunction<GetBankAccountListMutation, GetBankAccountListMutationVariables>;

/**
 * __useGetBankAccountListMutation__
 *
 * To run a mutation, you first call `useGetBankAccountListMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGetBankAccountListMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [getBankAccountListMutation, { data, loading, error }] = useGetBankAccountListMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useGetBankAccountListMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<GetBankAccountListMutation, GetBankAccountListMutationVariables>) {
        return ApolloReactHooks.useMutation<GetBankAccountListMutation, GetBankAccountListMutationVariables>(GetBankAccountListDocument, baseOptions);
      }
export type GetBankAccountListMutationHookResult = ReturnType<typeof useGetBankAccountListMutation>;
export type GetBankAccountListMutationResult = ApolloReactCommon.MutationResult<GetBankAccountListMutation>;
export type GetBankAccountListMutationOptions = ApolloReactCommon.BaseMutationOptions<GetBankAccountListMutation, GetBankAccountListMutationVariables>;
export const GetDepositsByIdDocument = gql`
    mutation GetDepositsById($data: AutoDepositInput!) {
  getDepositsById(data: $data) {
    deposit {
      id
      user_id
      minimum_wallet_balance
      amount_deposit
      bank_account
      created_date
      is_auto
      is_min_automatic
      is_amt_automatic
    }
    errors {
      field
      message
    }
  }
}
    `;
export type GetDepositsByIdMutationFn = ApolloReactCommon.MutationFunction<GetDepositsByIdMutation, GetDepositsByIdMutationVariables>;

/**
 * __useGetDepositsByIdMutation__
 *
 * To run a mutation, you first call `useGetDepositsByIdMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGetDepositsByIdMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [getDepositsByIdMutation, { data, loading, error }] = useGetDepositsByIdMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useGetDepositsByIdMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<GetDepositsByIdMutation, GetDepositsByIdMutationVariables>) {
        return ApolloReactHooks.useMutation<GetDepositsByIdMutation, GetDepositsByIdMutationVariables>(GetDepositsByIdDocument, baseOptions);
      }
export type GetDepositsByIdMutationHookResult = ReturnType<typeof useGetDepositsByIdMutation>;
export type GetDepositsByIdMutationResult = ApolloReactCommon.MutationResult<GetDepositsByIdMutation>;
export type GetDepositsByIdMutationOptions = ApolloReactCommon.BaseMutationOptions<GetDepositsByIdMutation, GetDepositsByIdMutationVariables>;
export const GetLogsDocument = gql`
    query getLogs {
  getLogs {
    signal_logs
    id
  }
}
    `;

/**
 * __useGetLogsQuery__
 *
 * To run a query within a React component, call `useGetLogsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLogsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLogsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetLogsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetLogsQuery, GetLogsQueryVariables>) {
        return ApolloReactHooks.useQuery<GetLogsQuery, GetLogsQueryVariables>(GetLogsDocument, baseOptions);
      }
export function useGetLogsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetLogsQuery, GetLogsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetLogsQuery, GetLogsQueryVariables>(GetLogsDocument, baseOptions);
        }
export type GetLogsQueryHookResult = ReturnType<typeof useGetLogsQuery>;
export type GetLogsLazyQueryHookResult = ReturnType<typeof useGetLogsLazyQuery>;
export type GetLogsQueryResult = ApolloReactCommon.QueryResult<GetLogsQuery, GetLogsQueryVariables>;
export const InitializeMarketDocument = gql`
    query initializeMarket {
  initializeMarket {
    market {
      id
      name
      symbol
      equity
      timezone
      type
      region
      exchange
      marketOpen
      marketClose
      matchScore
      currency
      period
      first_data
      last_data
      number_data_records
      data_last_downloaded
    }
  }
}
    `;

/**
 * __useInitializeMarketQuery__
 *
 * To run a query within a React component, call `useInitializeMarketQuery` and pass it any options that fit your needs.
 * When your component renders, `useInitializeMarketQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInitializeMarketQuery({
 *   variables: {
 *   },
 * });
 */
export function useInitializeMarketQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<InitializeMarketQuery, InitializeMarketQueryVariables>) {
        return ApolloReactHooks.useQuery<InitializeMarketQuery, InitializeMarketQueryVariables>(InitializeMarketDocument, baseOptions);
      }
export function useInitializeMarketLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<InitializeMarketQuery, InitializeMarketQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<InitializeMarketQuery, InitializeMarketQueryVariables>(InitializeMarketDocument, baseOptions);
        }
export type InitializeMarketQueryHookResult = ReturnType<typeof useInitializeMarketQuery>;
export type InitializeMarketLazyQueryHookResult = ReturnType<typeof useInitializeMarketLazyQuery>;
export type InitializeMarketQueryResult = ApolloReactCommon.QueryResult<InitializeMarketQuery, InitializeMarketQueryVariables>;
export const GetMarketDataDocument = gql`
    mutation getMarketData($marketId: Int!, $symbol: String!, $interval: String!) {
  getMarketData(marketId: $marketId, symbol: $symbol, interval: $interval) {
    id
    interval
    marketId
    symbol
    last_update
    open
    high
    low
    close
    volume
  }
}
    `;
export type GetMarketDataMutationFn = ApolloReactCommon.MutationFunction<GetMarketDataMutation, GetMarketDataMutationVariables>;

/**
 * __useGetMarketDataMutation__
 *
 * To run a mutation, you first call `useGetMarketDataMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGetMarketDataMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [getMarketDataMutation, { data, loading, error }] = useGetMarketDataMutation({
 *   variables: {
 *      marketId: // value for 'marketId'
 *      symbol: // value for 'symbol'
 *      interval: // value for 'interval'
 *   },
 * });
 */
export function useGetMarketDataMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<GetMarketDataMutation, GetMarketDataMutationVariables>) {
        return ApolloReactHooks.useMutation<GetMarketDataMutation, GetMarketDataMutationVariables>(GetMarketDataDocument, baseOptions);
      }
export type GetMarketDataMutationHookResult = ReturnType<typeof useGetMarketDataMutation>;
export type GetMarketDataMutationResult = ApolloReactCommon.MutationResult<GetMarketDataMutation>;
export type GetMarketDataMutationOptions = ApolloReactCommon.BaseMutationOptions<GetMarketDataMutation, GetMarketDataMutationVariables>;
export const GetMarketDataSymbolDocument = gql`
    query getMarketDataSymbol($symbol: String, $interval: String) {
  getMarketDataSymbol(symbol: $symbol, interval: $interval) {
    market {
      currency
      name
    }
    market_data {
      id
      interval
      symbol
      open
      close
      high
      low
      volume
      last_update
    }
    errors {
      field
      message
    }
  }
}
    `;

/**
 * __useGetMarketDataSymbolQuery__
 *
 * To run a query within a React component, call `useGetMarketDataSymbolQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMarketDataSymbolQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMarketDataSymbolQuery({
 *   variables: {
 *      symbol: // value for 'symbol'
 *      interval: // value for 'interval'
 *   },
 * });
 */
export function useGetMarketDataSymbolQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetMarketDataSymbolQuery, GetMarketDataSymbolQueryVariables>) {
        return ApolloReactHooks.useQuery<GetMarketDataSymbolQuery, GetMarketDataSymbolQueryVariables>(GetMarketDataSymbolDocument, baseOptions);
      }
export function useGetMarketDataSymbolLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetMarketDataSymbolQuery, GetMarketDataSymbolQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetMarketDataSymbolQuery, GetMarketDataSymbolQueryVariables>(GetMarketDataSymbolDocument, baseOptions);
        }
export type GetMarketDataSymbolQueryHookResult = ReturnType<typeof useGetMarketDataSymbolQuery>;
export type GetMarketDataSymbolLazyQueryHookResult = ReturnType<typeof useGetMarketDataSymbolLazyQuery>;
export type GetMarketDataSymbolQueryResult = ApolloReactCommon.QueryResult<GetMarketDataSymbolQuery, GetMarketDataSymbolQueryVariables>;
export const GetMarketListDocument = gql`
    query GetMarketList {
  getMarketList {
    market {
      id
      name
      symbol
      exchange
      currency
    }
    errors {
      message
      field
    }
  }
}
    `;

/**
 * __useGetMarketListQuery__
 *
 * To run a query within a React component, call `useGetMarketListQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMarketListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMarketListQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMarketListQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetMarketListQuery, GetMarketListQueryVariables>) {
        return ApolloReactHooks.useQuery<GetMarketListQuery, GetMarketListQueryVariables>(GetMarketListDocument, baseOptions);
      }
export function useGetMarketListLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetMarketListQuery, GetMarketListQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetMarketListQuery, GetMarketListQueryVariables>(GetMarketListDocument, baseOptions);
        }
export type GetMarketListQueryHookResult = ReturnType<typeof useGetMarketListQuery>;
export type GetMarketListLazyQueryHookResult = ReturnType<typeof useGetMarketListLazyQuery>;
export type GetMarketListQueryResult = ApolloReactCommon.QueryResult<GetMarketListQuery, GetMarketListQueryVariables>;
export const MarketsSearchDocument = gql`
    mutation marketsSearch($symbol: String, $haveData: Boolean, $options: SearchType) {
  marketsSearch(symbol: $symbol, haveData: $haveData, options: $options) {
    id
    name
    symbol
    timezone
    type
    marketOpen
    marketClose
    timezone
    currency
    matchScore
    exchange
    period
    number_data_records
    first_data
    last_data
  }
}
    `;
export type MarketsSearchMutationFn = ApolloReactCommon.MutationFunction<MarketsSearchMutation, MarketsSearchMutationVariables>;

/**
 * __useMarketsSearchMutation__
 *
 * To run a mutation, you first call `useMarketsSearchMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMarketsSearchMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [marketsSearchMutation, { data, loading, error }] = useMarketsSearchMutation({
 *   variables: {
 *      symbol: // value for 'symbol'
 *      haveData: // value for 'haveData'
 *      options: // value for 'options'
 *   },
 * });
 */
export function useMarketsSearchMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<MarketsSearchMutation, MarketsSearchMutationVariables>) {
        return ApolloReactHooks.useMutation<MarketsSearchMutation, MarketsSearchMutationVariables>(MarketsSearchDocument, baseOptions);
      }
export type MarketsSearchMutationHookResult = ReturnType<typeof useMarketsSearchMutation>;
export type MarketsSearchMutationResult = ApolloReactCommon.MutationResult<MarketsSearchMutation>;
export type MarketsSearchMutationOptions = ApolloReactCommon.BaseMutationOptions<MarketsSearchMutation, MarketsSearchMutationVariables>;
export const GetMarketSymbolDocument = gql`
    query GetMarketSymbol {
  getMarketSymbol {
    market {
      id
      symbol
      name
    }
    errors {
      message
      field
    }
  }
}
    `;

/**
 * __useGetMarketSymbolQuery__
 *
 * To run a query within a React component, call `useGetMarketSymbolQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMarketSymbolQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMarketSymbolQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMarketSymbolQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetMarketSymbolQuery, GetMarketSymbolQueryVariables>) {
        return ApolloReactHooks.useQuery<GetMarketSymbolQuery, GetMarketSymbolQueryVariables>(GetMarketSymbolDocument, baseOptions);
      }
export function useGetMarketSymbolLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetMarketSymbolQuery, GetMarketSymbolQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetMarketSymbolQuery, GetMarketSymbolQueryVariables>(GetMarketSymbolDocument, baseOptions);
        }
export type GetMarketSymbolQueryHookResult = ReturnType<typeof useGetMarketSymbolQuery>;
export type GetMarketSymbolLazyQueryHookResult = ReturnType<typeof useGetMarketSymbolLazyQuery>;
export type GetMarketSymbolQueryResult = ApolloReactCommon.QueryResult<GetMarketSymbolQuery, GetMarketSymbolQueryVariables>;
export const GetPaperTradesDocument = gql`
    query getPaperTrades {
  getPaperTrades {
    id
    strategy_id
    market_id
    symbol
    price
    trade_amount
    stop_loss
    take_profit
    profit
    balance
    date_time
    open
    high
    low
    close
    volume
    trade_type
  }
}
    `;

/**
 * __useGetPaperTradesQuery__
 *
 * To run a query within a React component, call `useGetPaperTradesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPaperTradesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPaperTradesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPaperTradesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetPaperTradesQuery, GetPaperTradesQueryVariables>) {
        return ApolloReactHooks.useQuery<GetPaperTradesQuery, GetPaperTradesQueryVariables>(GetPaperTradesDocument, baseOptions);
      }
export function useGetPaperTradesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetPaperTradesQuery, GetPaperTradesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetPaperTradesQuery, GetPaperTradesQueryVariables>(GetPaperTradesDocument, baseOptions);
        }
export type GetPaperTradesQueryHookResult = ReturnType<typeof useGetPaperTradesQuery>;
export type GetPaperTradesLazyQueryHookResult = ReturnType<typeof useGetPaperTradesLazyQuery>;
export type GetPaperTradesQueryResult = ApolloReactCommon.QueryResult<GetPaperTradesQuery, GetPaperTradesQueryVariables>;
export const GetPaperTradingByIdDocument = gql`
    query GetPaperTradingById($data: PaperTradingInput!) {
  getPaperTradingById(data: $data) {
    paper_trading {
      id
      user_id
      cumul_return
      strategies {
        id
        net_profit
        max_drawdown_number
        count_of_trades
        profit_factor
        months_of_profit
        source
        source_parent
        order
        group
        group_order
        editor_json
        group_name
      }
    }
  }
}
    `;

/**
 * __useGetPaperTradingByIdQuery__
 *
 * To run a query within a React component, call `useGetPaperTradingByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPaperTradingByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPaperTradingByIdQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useGetPaperTradingByIdQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetPaperTradingByIdQuery, GetPaperTradingByIdQueryVariables>) {
        return ApolloReactHooks.useQuery<GetPaperTradingByIdQuery, GetPaperTradingByIdQueryVariables>(GetPaperTradingByIdDocument, baseOptions);
      }
export function useGetPaperTradingByIdLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetPaperTradingByIdQuery, GetPaperTradingByIdQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetPaperTradingByIdQuery, GetPaperTradingByIdQueryVariables>(GetPaperTradingByIdDocument, baseOptions);
        }
export type GetPaperTradingByIdQueryHookResult = ReturnType<typeof useGetPaperTradingByIdQuery>;
export type GetPaperTradingByIdLazyQueryHookResult = ReturnType<typeof useGetPaperTradingByIdLazyQuery>;
export type GetPaperTradingByIdQueryResult = ApolloReactCommon.QueryResult<GetPaperTradingByIdQuery, GetPaperTradingByIdQueryVariables>;
export const GetRememberMeDocument = gql`
    mutation GetRememberMe($token: String!) {
  getRememberMe(token: $token) {
    user {
      id
      email
      admin
      first_name
      last_name
      profile_image
      time_zone
    }
  }
}
    `;
export type GetRememberMeMutationFn = ApolloReactCommon.MutationFunction<GetRememberMeMutation, GetRememberMeMutationVariables>;

/**
 * __useGetRememberMeMutation__
 *
 * To run a mutation, you first call `useGetRememberMeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGetRememberMeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [getRememberMeMutation, { data, loading, error }] = useGetRememberMeMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useGetRememberMeMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<GetRememberMeMutation, GetRememberMeMutationVariables>) {
        return ApolloReactHooks.useMutation<GetRememberMeMutation, GetRememberMeMutationVariables>(GetRememberMeDocument, baseOptions);
      }
export type GetRememberMeMutationHookResult = ReturnType<typeof useGetRememberMeMutation>;
export type GetRememberMeMutationResult = ApolloReactCommon.MutationResult<GetRememberMeMutation>;
export type GetRememberMeMutationOptions = ApolloReactCommon.BaseMutationOptions<GetRememberMeMutation, GetRememberMeMutationVariables>;
export const GetStrategiesDocument = gql`
    query getStrategies($token: String!, $sort_id: String!, $type: String!, $data: StrategiesCriteria!) {
  getStrategies(token: $token, sort_id: $sort_id, type: $type, data: $data) {
    strategy {
      id
      net_profit
      profit_per_day
      max_drawdown_number
      return_drawdown
      count_of_trades
      original_created_date
      editor_json
    }
    hasData
    start
    end
  }
}
    `;

/**
 * __useGetStrategiesQuery__
 *
 * To run a query within a React component, call `useGetStrategiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetStrategiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetStrategiesQuery({
 *   variables: {
 *      token: // value for 'token'
 *      sort_id: // value for 'sort_id'
 *      type: // value for 'type'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useGetStrategiesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetStrategiesQuery, GetStrategiesQueryVariables>) {
        return ApolloReactHooks.useQuery<GetStrategiesQuery, GetStrategiesQueryVariables>(GetStrategiesDocument, baseOptions);
      }
export function useGetStrategiesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetStrategiesQuery, GetStrategiesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetStrategiesQuery, GetStrategiesQueryVariables>(GetStrategiesDocument, baseOptions);
        }
export type GetStrategiesQueryHookResult = ReturnType<typeof useGetStrategiesQuery>;
export type GetStrategiesLazyQueryHookResult = ReturnType<typeof useGetStrategiesLazyQuery>;
export type GetStrategiesQueryResult = ApolloReactCommon.QueryResult<GetStrategiesQuery, GetStrategiesQueryVariables>;
export const GetStrategyProfileDocument = gql`
    query getStrategyProfile($id: String!, $token: String! = "Test") {
  getStrategyProfile(id: $id, token: $token) {
    id
    created_by_user_id
    trade_list_json
    editor_json
    average_hpr
    average_position_length
    backtest_quality_percent
    balance_line_stability
    bars_in_trade_number
    bars_in_trade_percent
    count_of_trades
    max_consecutive_losses
    max_drawdown_number
    max_drawdown_percent
    months_of_profit
    net_balance
    net_profit
    profit_factor
    profit_per_day
    r_squared
    return_drawdown
    sharpe_ratio
    max_stagnation_number
    max_stagnation_number
    system_quality_number
    win_loss
  }
}
    `;

/**
 * __useGetStrategyProfileQuery__
 *
 * To run a query within a React component, call `useGetStrategyProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetStrategyProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetStrategyProfileQuery({
 *   variables: {
 *      id: // value for 'id'
 *      token: // value for 'token'
 *   },
 * });
 */
export function useGetStrategyProfileQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetStrategyProfileQuery, GetStrategyProfileQueryVariables>) {
        return ApolloReactHooks.useQuery<GetStrategyProfileQuery, GetStrategyProfileQueryVariables>(GetStrategyProfileDocument, baseOptions);
      }
export function useGetStrategyProfileLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetStrategyProfileQuery, GetStrategyProfileQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetStrategyProfileQuery, GetStrategyProfileQueryVariables>(GetStrategyProfileDocument, baseOptions);
        }
export type GetStrategyProfileQueryHookResult = ReturnType<typeof useGetStrategyProfileQuery>;
export type GetStrategyProfileLazyQueryHookResult = ReturnType<typeof useGetStrategyProfileLazyQuery>;
export type GetStrategyProfileQueryResult = ApolloReactCommon.QueryResult<GetStrategyProfileQuery, GetStrategyProfileQueryVariables>;
export const GetTrashDocument = gql`
    query GetTrash($token: String!) {
  getTrash(token: $token) {
    strategies {
      id
      deleted_at
    }
    errors {
      field
      message
    }
  }
}
    `;

/**
 * __useGetTrashQuery__
 *
 * To run a query within a React component, call `useGetTrashQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTrashQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTrashQuery({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useGetTrashQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetTrashQuery, GetTrashQueryVariables>) {
        return ApolloReactHooks.useQuery<GetTrashQuery, GetTrashQueryVariables>(GetTrashDocument, baseOptions);
      }
export function useGetTrashLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetTrashQuery, GetTrashQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetTrashQuery, GetTrashQueryVariables>(GetTrashDocument, baseOptions);
        }
export type GetTrashQueryHookResult = ReturnType<typeof useGetTrashQuery>;
export type GetTrashLazyQueryHookResult = ReturnType<typeof useGetTrashLazyQuery>;
export type GetTrashQueryResult = ApolloReactCommon.QueryResult<GetTrashQuery, GetTrashQueryVariables>;
export const HelloDocument = gql`
    query Hello {
  hello
}
    `;

/**
 * __useHelloQuery__
 *
 * To run a query within a React component, call `useHelloQuery` and pass it any options that fit your needs.
 * When your component renders, `useHelloQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHelloQuery({
 *   variables: {
 *   },
 * });
 */
export function useHelloQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<HelloQuery, HelloQueryVariables>) {
        return ApolloReactHooks.useQuery<HelloQuery, HelloQueryVariables>(HelloDocument, baseOptions);
      }
export function useHelloLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<HelloQuery, HelloQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<HelloQuery, HelloQueryVariables>(HelloDocument, baseOptions);
        }
export type HelloQueryHookResult = ReturnType<typeof useHelloQuery>;
export type HelloLazyQueryHookResult = ReturnType<typeof useHelloLazyQuery>;
export type HelloQueryResult = ApolloReactCommon.QueryResult<HelloQuery, HelloQueryVariables>;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!, $isRememberActive: Boolean!) {
  login(email: $email, password: $password, isRememberActive: $isRememberActive) {
    accessToken
    rememberMeToken
    user {
      id
      email
      admin
      first_name
      last_name
      profile_image
      time_zone
    }
    errors {
      field
      message
    }
  }
}
    `;
export type LoginMutationFn = ApolloReactCommon.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      isRememberActive: // value for 'isRememberActive'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return ApolloReactHooks.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = ApolloReactCommon.MutationResult<LoginMutation>;
export type LoginMutationOptions = ApolloReactCommon.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = ApolloReactCommon.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        return ApolloReactHooks.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, baseOptions);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = ApolloReactCommon.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = ApolloReactCommon.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const MarketsDocument = gql`
    query Markets {
  markets {
    id
    name
    exchange
  }
}
    `;

/**
 * __useMarketsQuery__
 *
 * To run a query within a React component, call `useMarketsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMarketsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMarketsQuery({
 *   variables: {
 *   },
 * });
 */
export function useMarketsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MarketsQuery, MarketsQueryVariables>) {
        return ApolloReactHooks.useQuery<MarketsQuery, MarketsQueryVariables>(MarketsDocument, baseOptions);
      }
export function useMarketsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MarketsQuery, MarketsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<MarketsQuery, MarketsQueryVariables>(MarketsDocument, baseOptions);
        }
export type MarketsQueryHookResult = ReturnType<typeof useMarketsQuery>;
export type MarketsLazyQueryHookResult = ReturnType<typeof useMarketsLazyQuery>;
export type MarketsQueryResult = ApolloReactCommon.QueryResult<MarketsQuery, MarketsQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    id
    email
    admin
    first_name
    last_name
    profile_image
    time_zone
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MeQuery, MeQueryVariables>) {
        return ApolloReactHooks.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = ApolloReactCommon.QueryResult<MeQuery, MeQueryVariables>;
export const MoveStrategiesDocument = gql`
    mutation MoveStrategies($token: String!, $data: String!) {
  moveStrategies(token: $token, data: $data)
}
    `;
export type MoveStrategiesMutationFn = ApolloReactCommon.MutationFunction<MoveStrategiesMutation, MoveStrategiesMutationVariables>;

/**
 * __useMoveStrategiesMutation__
 *
 * To run a mutation, you first call `useMoveStrategiesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMoveStrategiesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [moveStrategiesMutation, { data, loading, error }] = useMoveStrategiesMutation({
 *   variables: {
 *      token: // value for 'token'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useMoveStrategiesMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<MoveStrategiesMutation, MoveStrategiesMutationVariables>) {
        return ApolloReactHooks.useMutation<MoveStrategiesMutation, MoveStrategiesMutationVariables>(MoveStrategiesDocument, baseOptions);
      }
export type MoveStrategiesMutationHookResult = ReturnType<typeof useMoveStrategiesMutation>;
export type MoveStrategiesMutationResult = ApolloReactCommon.MutationResult<MoveStrategiesMutation>;
export type MoveStrategiesMutationOptions = ApolloReactCommon.BaseMutationOptions<MoveStrategiesMutation, MoveStrategiesMutationVariables>;
export const MoveStrategyDocument = gql`
    mutation moveStrategy($token: String!, $data: String!) {
  moveStrategy(token: $token, data: $data)
}
    `;
export type MoveStrategyMutationFn = ApolloReactCommon.MutationFunction<MoveStrategyMutation, MoveStrategyMutationVariables>;

/**
 * __useMoveStrategyMutation__
 *
 * To run a mutation, you first call `useMoveStrategyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMoveStrategyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [moveStrategyMutation, { data, loading, error }] = useMoveStrategyMutation({
 *   variables: {
 *      token: // value for 'token'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useMoveStrategyMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<MoveStrategyMutation, MoveStrategyMutationVariables>) {
        return ApolloReactHooks.useMutation<MoveStrategyMutation, MoveStrategyMutationVariables>(MoveStrategyDocument, baseOptions);
      }
export type MoveStrategyMutationHookResult = ReturnType<typeof useMoveStrategyMutation>;
export type MoveStrategyMutationResult = ApolloReactCommon.MutationResult<MoveStrategyMutation>;
export type MoveStrategyMutationOptions = ApolloReactCommon.BaseMutationOptions<MoveStrategyMutation, MoveStrategyMutationVariables>;
export const PlaidAccessDocument = gql`
    mutation PlaidAccess($plaidToken: String!) {
  plaidAccess(plaidToken: $plaidToken)
}
    `;
export type PlaidAccessMutationFn = ApolloReactCommon.MutationFunction<PlaidAccessMutation, PlaidAccessMutationVariables>;

/**
 * __usePlaidAccessMutation__
 *
 * To run a mutation, you first call `usePlaidAccessMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePlaidAccessMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [plaidAccessMutation, { data, loading, error }] = usePlaidAccessMutation({
 *   variables: {
 *      plaidToken: // value for 'plaidToken'
 *   },
 * });
 */
export function usePlaidAccessMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<PlaidAccessMutation, PlaidAccessMutationVariables>) {
        return ApolloReactHooks.useMutation<PlaidAccessMutation, PlaidAccessMutationVariables>(PlaidAccessDocument, baseOptions);
      }
export type PlaidAccessMutationHookResult = ReturnType<typeof usePlaidAccessMutation>;
export type PlaidAccessMutationResult = ApolloReactCommon.MutationResult<PlaidAccessMutation>;
export type PlaidAccessMutationOptions = ApolloReactCommon.BaseMutationOptions<PlaidAccessMutation, PlaidAccessMutationVariables>;
export const PlaidAccountRemoveDocument = gql`
    mutation PlaidAccountRemove($id: Float!) {
  plaidAccountRemove(id: $id)
}
    `;
export type PlaidAccountRemoveMutationFn = ApolloReactCommon.MutationFunction<PlaidAccountRemoveMutation, PlaidAccountRemoveMutationVariables>;

/**
 * __usePlaidAccountRemoveMutation__
 *
 * To run a mutation, you first call `usePlaidAccountRemoveMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePlaidAccountRemoveMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [plaidAccountRemoveMutation, { data, loading, error }] = usePlaidAccountRemoveMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePlaidAccountRemoveMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<PlaidAccountRemoveMutation, PlaidAccountRemoveMutationVariables>) {
        return ApolloReactHooks.useMutation<PlaidAccountRemoveMutation, PlaidAccountRemoveMutationVariables>(PlaidAccountRemoveDocument, baseOptions);
      }
export type PlaidAccountRemoveMutationHookResult = ReturnType<typeof usePlaidAccountRemoveMutation>;
export type PlaidAccountRemoveMutationResult = ApolloReactCommon.MutationResult<PlaidAccountRemoveMutation>;
export type PlaidAccountRemoveMutationOptions = ApolloReactCommon.BaseMutationOptions<PlaidAccountRemoveMutation, PlaidAccountRemoveMutationVariables>;
export const PlaidAccountsDocument = gql`
    mutation PlaidAccounts($token: String!) {
  plaidAccounts(token: $token)
}
    `;
export type PlaidAccountsMutationFn = ApolloReactCommon.MutationFunction<PlaidAccountsMutation, PlaidAccountsMutationVariables>;

/**
 * __usePlaidAccountsMutation__
 *
 * To run a mutation, you first call `usePlaidAccountsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePlaidAccountsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [plaidAccountsMutation, { data, loading, error }] = usePlaidAccountsMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function usePlaidAccountsMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<PlaidAccountsMutation, PlaidAccountsMutationVariables>) {
        return ApolloReactHooks.useMutation<PlaidAccountsMutation, PlaidAccountsMutationVariables>(PlaidAccountsDocument, baseOptions);
      }
export type PlaidAccountsMutationHookResult = ReturnType<typeof usePlaidAccountsMutation>;
export type PlaidAccountsMutationResult = ApolloReactCommon.MutationResult<PlaidAccountsMutation>;
export type PlaidAccountsMutationOptions = ApolloReactCommon.BaseMutationOptions<PlaidAccountsMutation, PlaidAccountsMutationVariables>;
export const PlaidCreateAccountDocument = gql`
    mutation PlaidCreateAccount($token: String!, $accountId: String!, $accountName: String!, $institution: String!, $accountNumber: String!, $institutionId: String!, $InstitutionLogo: String!) {
  plaidCreateAccount(token: $token, accountId: $accountId, accountName: $accountName, institution: $institution, accountNumber: $accountNumber, institutionId: $institutionId, InstitutionLogo: $InstitutionLogo)
}
    `;
export type PlaidCreateAccountMutationFn = ApolloReactCommon.MutationFunction<PlaidCreateAccountMutation, PlaidCreateAccountMutationVariables>;

/**
 * __usePlaidCreateAccountMutation__
 *
 * To run a mutation, you first call `usePlaidCreateAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePlaidCreateAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [plaidCreateAccountMutation, { data, loading, error }] = usePlaidCreateAccountMutation({
 *   variables: {
 *      token: // value for 'token'
 *      accountId: // value for 'accountId'
 *      accountName: // value for 'accountName'
 *      institution: // value for 'institution'
 *      accountNumber: // value for 'accountNumber'
 *      institutionId: // value for 'institutionId'
 *      InstitutionLogo: // value for 'InstitutionLogo'
 *   },
 * });
 */
export function usePlaidCreateAccountMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<PlaidCreateAccountMutation, PlaidCreateAccountMutationVariables>) {
        return ApolloReactHooks.useMutation<PlaidCreateAccountMutation, PlaidCreateAccountMutationVariables>(PlaidCreateAccountDocument, baseOptions);
      }
export type PlaidCreateAccountMutationHookResult = ReturnType<typeof usePlaidCreateAccountMutation>;
export type PlaidCreateAccountMutationResult = ApolloReactCommon.MutationResult<PlaidCreateAccountMutation>;
export type PlaidCreateAccountMutationOptions = ApolloReactCommon.BaseMutationOptions<PlaidCreateAccountMutation, PlaidCreateAccountMutationVariables>;
export const PlaiInstitutionIconDocument = gql`
    mutation PlaiInstitutionIcon($insId: String!) {
  plaiInstitutionIcon(insId: $insId)
}
    `;
export type PlaiInstitutionIconMutationFn = ApolloReactCommon.MutationFunction<PlaiInstitutionIconMutation, PlaiInstitutionIconMutationVariables>;

/**
 * __usePlaiInstitutionIconMutation__
 *
 * To run a mutation, you first call `usePlaiInstitutionIconMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePlaiInstitutionIconMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [plaiInstitutionIconMutation, { data, loading, error }] = usePlaiInstitutionIconMutation({
 *   variables: {
 *      insId: // value for 'insId'
 *   },
 * });
 */
export function usePlaiInstitutionIconMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<PlaiInstitutionIconMutation, PlaiInstitutionIconMutationVariables>) {
        return ApolloReactHooks.useMutation<PlaiInstitutionIconMutation, PlaiInstitutionIconMutationVariables>(PlaiInstitutionIconDocument, baseOptions);
      }
export type PlaiInstitutionIconMutationHookResult = ReturnType<typeof usePlaiInstitutionIconMutation>;
export type PlaiInstitutionIconMutationResult = ApolloReactCommon.MutationResult<PlaiInstitutionIconMutation>;
export type PlaiInstitutionIconMutationOptions = ApolloReactCommon.BaseMutationOptions<PlaiInstitutionIconMutation, PlaiInstitutionIconMutationVariables>;
export const PlaidLinkDocument = gql`
    query PlaidLink {
  plaidLink
}
    `;

/**
 * __usePlaidLinkQuery__
 *
 * To run a query within a React component, call `usePlaidLinkQuery` and pass it any options that fit your needs.
 * When your component renders, `usePlaidLinkQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePlaidLinkQuery({
 *   variables: {
 *   },
 * });
 */
export function usePlaidLinkQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<PlaidLinkQuery, PlaidLinkQueryVariables>) {
        return ApolloReactHooks.useQuery<PlaidLinkQuery, PlaidLinkQueryVariables>(PlaidLinkDocument, baseOptions);
      }
export function usePlaidLinkLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<PlaidLinkQuery, PlaidLinkQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<PlaidLinkQuery, PlaidLinkQueryVariables>(PlaidLinkDocument, baseOptions);
        }
export type PlaidLinkQueryHookResult = ReturnType<typeof usePlaidLinkQuery>;
export type PlaidLinkLazyQueryHookResult = ReturnType<typeof usePlaidLinkLazyQuery>;
export type PlaidLinkQueryResult = ApolloReactCommon.QueryResult<PlaidLinkQuery, PlaidLinkQueryVariables>;
export const PlaidMailDocument = gql`
    mutation PlaidMail($mailContent: String!, $token: String!) {
  plaidMail(mailContent: $mailContent, token: $token)
}
    `;
export type PlaidMailMutationFn = ApolloReactCommon.MutationFunction<PlaidMailMutation, PlaidMailMutationVariables>;

/**
 * __usePlaidMailMutation__
 *
 * To run a mutation, you first call `usePlaidMailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePlaidMailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [plaidMailMutation, { data, loading, error }] = usePlaidMailMutation({
 *   variables: {
 *      mailContent: // value for 'mailContent'
 *      token: // value for 'token'
 *   },
 * });
 */
export function usePlaidMailMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<PlaidMailMutation, PlaidMailMutationVariables>) {
        return ApolloReactHooks.useMutation<PlaidMailMutation, PlaidMailMutationVariables>(PlaidMailDocument, baseOptions);
      }
export type PlaidMailMutationHookResult = ReturnType<typeof usePlaidMailMutation>;
export type PlaidMailMutationResult = ApolloReactCommon.MutationResult<PlaidMailMutation>;
export type PlaidMailMutationOptions = ApolloReactCommon.BaseMutationOptions<PlaidMailMutation, PlaidMailMutationVariables>;
export const PlaidNicknameUpdateDocument = gql`
    mutation PlaidNicknameUpdate($id: Float!, $value: String!) {
  plaidNicknameUpdate(id: $id, value: $value)
}
    `;
export type PlaidNicknameUpdateMutationFn = ApolloReactCommon.MutationFunction<PlaidNicknameUpdateMutation, PlaidNicknameUpdateMutationVariables>;

/**
 * __usePlaidNicknameUpdateMutation__
 *
 * To run a mutation, you first call `usePlaidNicknameUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePlaidNicknameUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [plaidNicknameUpdateMutation, { data, loading, error }] = usePlaidNicknameUpdateMutation({
 *   variables: {
 *      id: // value for 'id'
 *      value: // value for 'value'
 *   },
 * });
 */
export function usePlaidNicknameUpdateMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<PlaidNicknameUpdateMutation, PlaidNicknameUpdateMutationVariables>) {
        return ApolloReactHooks.useMutation<PlaidNicknameUpdateMutation, PlaidNicknameUpdateMutationVariables>(PlaidNicknameUpdateDocument, baseOptions);
      }
export type PlaidNicknameUpdateMutationHookResult = ReturnType<typeof usePlaidNicknameUpdateMutation>;
export type PlaidNicknameUpdateMutationResult = ApolloReactCommon.MutationResult<PlaidNicknameUpdateMutation>;
export type PlaidNicknameUpdateMutationOptions = ApolloReactCommon.BaseMutationOptions<PlaidNicknameUpdateMutation, PlaidNicknameUpdateMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($email: String!, $password: String!) {
  register(email: $email, password: $password)
}
    `;
export type RegisterMutationFn = ApolloReactCommon.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        return ApolloReactHooks.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, baseOptions);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = ApolloReactCommon.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = ApolloReactCommon.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const ResetDocument = gql`
    mutation Reset($token: String!, $old_password: String!, $new_password: String!) {
  resetPassword(token: $token, oldpass: $old_password, newpass: $new_password)
}
    `;
export type ResetMutationFn = ApolloReactCommon.MutationFunction<ResetMutation, ResetMutationVariables>;

/**
 * __useResetMutation__
 *
 * To run a mutation, you first call `useResetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetMutation, { data, loading, error }] = useResetMutation({
 *   variables: {
 *      token: // value for 'token'
 *      old_password: // value for 'old_password'
 *      new_password: // value for 'new_password'
 *   },
 * });
 */
export function useResetMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ResetMutation, ResetMutationVariables>) {
        return ApolloReactHooks.useMutation<ResetMutation, ResetMutationVariables>(ResetDocument, baseOptions);
      }
export type ResetMutationHookResult = ReturnType<typeof useResetMutation>;
export type ResetMutationResult = ApolloReactCommon.MutationResult<ResetMutation>;
export type ResetMutationOptions = ApolloReactCommon.BaseMutationOptions<ResetMutation, ResetMutationVariables>;
export const RetrieveStrategiesDocument = gql`
    mutation RetrieveStrategies($id: String!) {
  retrieveStrategies(id: $id) {
    strategies {
      id
    }
    errors {
      field
      message
    }
  }
}
    `;
export type RetrieveStrategiesMutationFn = ApolloReactCommon.MutationFunction<RetrieveStrategiesMutation, RetrieveStrategiesMutationVariables>;

/**
 * __useRetrieveStrategiesMutation__
 *
 * To run a mutation, you first call `useRetrieveStrategiesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRetrieveStrategiesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [retrieveStrategiesMutation, { data, loading, error }] = useRetrieveStrategiesMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRetrieveStrategiesMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RetrieveStrategiesMutation, RetrieveStrategiesMutationVariables>) {
        return ApolloReactHooks.useMutation<RetrieveStrategiesMutation, RetrieveStrategiesMutationVariables>(RetrieveStrategiesDocument, baseOptions);
      }
export type RetrieveStrategiesMutationHookResult = ReturnType<typeof useRetrieveStrategiesMutation>;
export type RetrieveStrategiesMutationResult = ApolloReactCommon.MutationResult<RetrieveStrategiesMutation>;
export type RetrieveStrategiesMutationOptions = ApolloReactCommon.BaseMutationOptions<RetrieveStrategiesMutation, RetrieveStrategiesMutationVariables>;
export const SaveDepositDocument = gql`
    mutation SaveDeposit($data: SaveDepositInput!) {
  saveDeposit(data: $data) {
    deposit {
      id
      minimum_wallet_balance
      amount_deposit
      bank_account
      is_auto
      is_min_automatic
      is_amt_automatic
    }
  }
}
    `;
export type SaveDepositMutationFn = ApolloReactCommon.MutationFunction<SaveDepositMutation, SaveDepositMutationVariables>;

/**
 * __useSaveDepositMutation__
 *
 * To run a mutation, you first call `useSaveDepositMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveDepositMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveDepositMutation, { data, loading, error }] = useSaveDepositMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useSaveDepositMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SaveDepositMutation, SaveDepositMutationVariables>) {
        return ApolloReactHooks.useMutation<SaveDepositMutation, SaveDepositMutationVariables>(SaveDepositDocument, baseOptions);
      }
export type SaveDepositMutationHookResult = ReturnType<typeof useSaveDepositMutation>;
export type SaveDepositMutationResult = ApolloReactCommon.MutationResult<SaveDepositMutation>;
export type SaveDepositMutationOptions = ApolloReactCommon.BaseMutationOptions<SaveDepositMutation, SaveDepositMutationVariables>;
export const SaveStrategyDocument = gql`
    mutation saveStrategy($options: GetStrategyProfileArgs!, $token: String!) {
  saveStrategy(options: $options, token: $token) {
    created_by_user_id
    id
    created_by_user_id
    editor_json
    average_hpr
    average_position_length
    backtest_quality_percent
    balance_line_stability
    bars_in_trade_number
    bars_in_trade_percent
    count_of_trades
    net_balance
    net_profit
    profit_factor
    profit_per_day
    r_squared
    return_drawdown
    sharpe_ratio
    max_stagnation_number
    max_stagnation_percent
    system_quality_number
    win_loss
  }
}
    `;
export type SaveStrategyMutationFn = ApolloReactCommon.MutationFunction<SaveStrategyMutation, SaveStrategyMutationVariables>;

/**
 * __useSaveStrategyMutation__
 *
 * To run a mutation, you first call `useSaveStrategyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveStrategyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveStrategyMutation, { data, loading, error }] = useSaveStrategyMutation({
 *   variables: {
 *      options: // value for 'options'
 *      token: // value for 'token'
 *   },
 * });
 */
export function useSaveStrategyMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SaveStrategyMutation, SaveStrategyMutationVariables>) {
        return ApolloReactHooks.useMutation<SaveStrategyMutation, SaveStrategyMutationVariables>(SaveStrategyDocument, baseOptions);
      }
export type SaveStrategyMutationHookResult = ReturnType<typeof useSaveStrategyMutation>;
export type SaveStrategyMutationResult = ApolloReactCommon.MutationResult<SaveStrategyMutation>;
export type SaveStrategyMutationOptions = ApolloReactCommon.BaseMutationOptions<SaveStrategyMutation, SaveStrategyMutationVariables>;
export const TransferStrategiesDocument = gql`
    mutation TransferStrategies($id: String!) {
  transferStrategies(id: $id)
}
    `;
export type TransferStrategiesMutationFn = ApolloReactCommon.MutationFunction<TransferStrategiesMutation, TransferStrategiesMutationVariables>;

/**
 * __useTransferStrategiesMutation__
 *
 * To run a mutation, you first call `useTransferStrategiesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTransferStrategiesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [transferStrategiesMutation, { data, loading, error }] = useTransferStrategiesMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useTransferStrategiesMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<TransferStrategiesMutation, TransferStrategiesMutationVariables>) {
        return ApolloReactHooks.useMutation<TransferStrategiesMutation, TransferStrategiesMutationVariables>(TransferStrategiesDocument, baseOptions);
      }
export type TransferStrategiesMutationHookResult = ReturnType<typeof useTransferStrategiesMutation>;
export type TransferStrategiesMutationResult = ApolloReactCommon.MutationResult<TransferStrategiesMutation>;
export type TransferStrategiesMutationOptions = ApolloReactCommon.BaseMutationOptions<TransferStrategiesMutation, TransferStrategiesMutationVariables>;
export const UpdateStrategyDocument = gql`
    mutation updateStrategy($options: GetStrategyProfileArgs!, $token: String!) {
  updateStrategy(options: $options, token: $token)
}
    `;
export type UpdateStrategyMutationFn = ApolloReactCommon.MutationFunction<UpdateStrategyMutation, UpdateStrategyMutationVariables>;

/**
 * __useUpdateStrategyMutation__
 *
 * To run a mutation, you first call `useUpdateStrategyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateStrategyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateStrategyMutation, { data, loading, error }] = useUpdateStrategyMutation({
 *   variables: {
 *      options: // value for 'options'
 *      token: // value for 'token'
 *   },
 * });
 */
export function useUpdateStrategyMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateStrategyMutation, UpdateStrategyMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateStrategyMutation, UpdateStrategyMutationVariables>(UpdateStrategyDocument, baseOptions);
      }
export type UpdateStrategyMutationHookResult = ReturnType<typeof useUpdateStrategyMutation>;
export type UpdateStrategyMutationResult = ApolloReactCommon.MutationResult<UpdateStrategyMutation>;
export type UpdateStrategyMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateStrategyMutation, UpdateStrategyMutationVariables>;
export const UpdateUserDetailsDocument = gql`
    mutation updateUserDetails($token: String!, $data: UpdateUserInput!) {
  updateUserDetails(token: $token, data: $data) {
    user {
      id
      email
      admin
      first_name
      last_name
      profile_image
      time_zone
    }
  }
}
    `;
export type UpdateUserDetailsMutationFn = ApolloReactCommon.MutationFunction<UpdateUserDetailsMutation, UpdateUserDetailsMutationVariables>;

/**
 * __useUpdateUserDetailsMutation__
 *
 * To run a mutation, you first call `useUpdateUserDetailsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserDetailsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserDetailsMutation, { data, loading, error }] = useUpdateUserDetailsMutation({
 *   variables: {
 *      token: // value for 'token'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateUserDetailsMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateUserDetailsMutation, UpdateUserDetailsMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateUserDetailsMutation, UpdateUserDetailsMutationVariables>(UpdateUserDetailsDocument, baseOptions);
      }
export type UpdateUserDetailsMutationHookResult = ReturnType<typeof useUpdateUserDetailsMutation>;
export type UpdateUserDetailsMutationResult = ApolloReactCommon.MutationResult<UpdateUserDetailsMutation>;
export type UpdateUserDetailsMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateUserDetailsMutation, UpdateUserDetailsMutationVariables>;
export const UsersDocument = gql`
    query Users {
  users {
    id
    email
    admin
  }
}
    `;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useUsersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<UsersQuery, UsersQueryVariables>) {
        return ApolloReactHooks.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, baseOptions);
      }
export function useUsersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, baseOptions);
        }
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = ApolloReactCommon.QueryResult<UsersQuery, UsersQueryVariables>;
export const VerificationDocument = gql`
    mutation Verification($token: String!) {
  verification(token: $token)
}
    `;
export type VerificationMutationFn = ApolloReactCommon.MutationFunction<VerificationMutation, VerificationMutationVariables>;

/**
 * __useVerificationMutation__
 *
 * To run a mutation, you first call `useVerificationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVerificationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [verificationMutation, { data, loading, error }] = useVerificationMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useVerificationMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<VerificationMutation, VerificationMutationVariables>) {
        return ApolloReactHooks.useMutation<VerificationMutation, VerificationMutationVariables>(VerificationDocument, baseOptions);
      }
export type VerificationMutationHookResult = ReturnType<typeof useVerificationMutation>;
export type VerificationMutationResult = ApolloReactCommon.MutationResult<VerificationMutation>;
export type VerificationMutationOptions = ApolloReactCommon.BaseMutationOptions<VerificationMutation, VerificationMutationVariables>;
export const AddSummaryDocument = gql`
    mutation AddSummary($currency_code: String!, $balance: String!, $debit: String!, $credit: String!, $date: String!) {
  addSummary(currency_code: $currency_code, balance: $balance, debit: $debit, credit: $credit, date: $date)
}
    `;
export type AddSummaryMutationFn = ApolloReactCommon.MutationFunction<AddSummaryMutation, AddSummaryMutationVariables>;

/**
 * __useAddSummaryMutation__
 *
 * To run a mutation, you first call `useAddSummaryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddSummaryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addSummaryMutation, { data, loading, error }] = useAddSummaryMutation({
 *   variables: {
 *      currency_code: // value for 'currency_code'
 *      balance: // value for 'balance'
 *      debit: // value for 'debit'
 *      credit: // value for 'credit'
 *      date: // value for 'date'
 *   },
 * });
 */
export function useAddSummaryMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AddSummaryMutation, AddSummaryMutationVariables>) {
        return ApolloReactHooks.useMutation<AddSummaryMutation, AddSummaryMutationVariables>(AddSummaryDocument, baseOptions);
      }
export type AddSummaryMutationHookResult = ReturnType<typeof useAddSummaryMutation>;
export type AddSummaryMutationResult = ApolloReactCommon.MutationResult<AddSummaryMutation>;
export type AddSummaryMutationOptions = ApolloReactCommon.BaseMutationOptions<AddSummaryMutation, AddSummaryMutationVariables>;
export const AddTransactionsDocument = gql`
    mutation AddTransactions($transaction_type: String!, $currency_code: String!, $balance: String!, $amount: String!, $date: String!, $name: String!) {
  addTransactions(transaction_type: $transaction_type, currency_code: $currency_code, balance: $balance, amount: $amount, date: $date, name: $name)
}
    `;
export type AddTransactionsMutationFn = ApolloReactCommon.MutationFunction<AddTransactionsMutation, AddTransactionsMutationVariables>;

/**
 * __useAddTransactionsMutation__
 *
 * To run a mutation, you first call `useAddTransactionsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddTransactionsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addTransactionsMutation, { data, loading, error }] = useAddTransactionsMutation({
 *   variables: {
 *      transaction_type: // value for 'transaction_type'
 *      currency_code: // value for 'currency_code'
 *      balance: // value for 'balance'
 *      amount: // value for 'amount'
 *      date: // value for 'date'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useAddTransactionsMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AddTransactionsMutation, AddTransactionsMutationVariables>) {
        return ApolloReactHooks.useMutation<AddTransactionsMutation, AddTransactionsMutationVariables>(AddTransactionsDocument, baseOptions);
      }
export type AddTransactionsMutationHookResult = ReturnType<typeof useAddTransactionsMutation>;
export type AddTransactionsMutationResult = ApolloReactCommon.MutationResult<AddTransactionsMutation>;
export type AddTransactionsMutationOptions = ApolloReactCommon.BaseMutationOptions<AddTransactionsMutation, AddTransactionsMutationVariables>;
export const RemoveTransactionsDocument = gql`
    mutation RemoveTransactions {
  removeTransactions
}
    `;
export type RemoveTransactionsMutationFn = ApolloReactCommon.MutationFunction<RemoveTransactionsMutation, RemoveTransactionsMutationVariables>;

/**
 * __useRemoveTransactionsMutation__
 *
 * To run a mutation, you first call `useRemoveTransactionsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveTransactionsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeTransactionsMutation, { data, loading, error }] = useRemoveTransactionsMutation({
 *   variables: {
 *   },
 * });
 */
export function useRemoveTransactionsMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RemoveTransactionsMutation, RemoveTransactionsMutationVariables>) {
        return ApolloReactHooks.useMutation<RemoveTransactionsMutation, RemoveTransactionsMutationVariables>(RemoveTransactionsDocument, baseOptions);
      }
export type RemoveTransactionsMutationHookResult = ReturnType<typeof useRemoveTransactionsMutation>;
export type RemoveTransactionsMutationResult = ApolloReactCommon.MutationResult<RemoveTransactionsMutation>;
export type RemoveTransactionsMutationOptions = ApolloReactCommon.BaseMutationOptions<RemoveTransactionsMutation, RemoveTransactionsMutationVariables>;
export const GetSummaryDocument = gql`
    query GetSummary {
  getSummary
}
    `;

/**
 * __useGetSummaryQuery__
 *
 * To run a query within a React component, call `useGetSummaryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSummaryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSummaryQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetSummaryQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetSummaryQuery, GetSummaryQueryVariables>) {
        return ApolloReactHooks.useQuery<GetSummaryQuery, GetSummaryQueryVariables>(GetSummaryDocument, baseOptions);
      }
export function useGetSummaryLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetSummaryQuery, GetSummaryQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetSummaryQuery, GetSummaryQueryVariables>(GetSummaryDocument, baseOptions);
        }
export type GetSummaryQueryHookResult = ReturnType<typeof useGetSummaryQuery>;
export type GetSummaryLazyQueryHookResult = ReturnType<typeof useGetSummaryLazyQuery>;
export type GetSummaryQueryResult = ApolloReactCommon.QueryResult<GetSummaryQuery, GetSummaryQueryVariables>;