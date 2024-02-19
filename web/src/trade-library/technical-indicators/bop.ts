/**
 * @param enterOrExit
 * @param options
 * @param stockData
 */

export const bop = (enterOrExit: string, options: any, stockData: any) => {
    stockData["trades"].forEach((trade, index) => {
        let high = trade["high"];
        let low = trade["low"];
        let close = trade["close"];
        let open = trade["open"];

        let bopBar = (close - open) / (high - low);

        stockData["trades"][index]["signalValue"][enterOrExit]["bop"] = bopBar;
    });

    return stockData["trades"];
};
