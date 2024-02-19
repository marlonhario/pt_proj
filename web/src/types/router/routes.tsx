export enum privateRoute {
  page = '/pages',
  pageOne = '/pages/one',
  pageTwo = '/pages/two',
  timesheets = '/pages/timesheets',
  editors = '/pages/editors',
  users = '/pages/users',
  accounts = '/accounts',
  profile = '/accounts/profle',
  reset_password = '/reset_password',
  backTesting = '/pages/back-testing',
  strategy = '/strategies',
  basket = '/basket',
  paperTrading = '/paper-trading',
  liveTrading = '/live-trading',
  shareStrategy = '/share-strategies',
  indicatorModule = '/pages/indicator-module',
}

export enum publicRoute {
  login = '/',
  register = '/register',
  activation = '/verification/:token',
  verified = '/account/verified',
}
