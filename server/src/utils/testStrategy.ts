export const testStrategy = {
  data: {
    longEntryList: [
      {
        id: "idEntry1-long",
        "fastPeriod-AO": 12,
        "slowPeriod-AO": 26,
        "levelLine-AO": 0,
        signal: "rises",
        name: { label: "Awesome Oscillator", value: "AwesomeOscillator.json" },
        identification: "AO",
      },
    ],
    longExitList: [
      {
        id: "idExit1-long",
        "fastPeriod-MACD": 12,
        "slowPeriod-MACD": 26,
        "signalPeriod-MACD": 9,
        signal: "rises",
        name: { label: "MACD", value: "MACD.json" },
        identification: "MACD",
      },
    ],
  },
  marketData: {
    symbol: "AAPL",
    name: "Apple Inc.",
    exchange: "USD",
    id: 0,
    interval: { label: "M15", value: "15min" },
    number_data_records: 3000,
    first_data: "",
    last_data: "",
    spread: 1,
    timezone: "UTC-05",
    marketOpen: "09:30",
    marketClose: "16:00",
  },
  strategyProperties: {
    entryLots: 10000,
    stopLoss: "Not used",
    lossPips: 100,
    takeProfit: "Not used",
    profitPips: 100,
  },
};
