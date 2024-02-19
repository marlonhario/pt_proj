export const chop = (enterOrExit: string, options: any, stockData: any) => {
    let trueRange = [],
        sum14 = [], // 14 is the minimum period needs
        high14 = [],
        low14 = [],
        range14 = [],
        trueHigh = [],
        trueLow = [],
        close = [],
        low = [],
        high = [],
        chop = [];

    const reducer = (accumulator, currentValue) => accumulator + currentValue;

    stockData["trades"].forEach((trade, index) => {
        close[index] = trade["close"];
        low[index] = trade["low"];
        high[index] = trade["high"];
        if (index > 0) {
            trueHigh[index - 1] = Math.max(high[index], close[index - 1]);
            trueLow[index - 1] = Math.min(low[index], close[index - 1]);
            trueRange[index - 1] = trueHigh[index - 1] - trueLow[index - 1];
        }
    });

    trueRange.forEach((price, index) => {
        let prices = trueRange.slice(index, options["period"] + index);
        let th = trueHigh.slice(index, options["period"] + index); // get the true high array of the period
        let tl = trueLow.slice(index, options["period"] + index);
        if (prices.length === options["period"]) {
            sum14.push(prices.reduce(reducer));
            high14.push(Math.max(...th));
            low14.push(Math.max(...tl));
        }
    });

    high14.forEach((price, index) => {
        range14[index] = high14[index] - low14[index];
        chop[index] = (100 * Math.log(sum14[index] / range14[index])) / Math.log(options["period"]);
    });

    stockData["trades"].forEach((trade, index) => {
        if (index >= options["period"]) {
            stockData["trades"][index]["signalValue"][enterOrExit]["chop"] = chop[index - options["period"]];
        } else {
            stockData["trades"][index]["signalValue"][enterOrExit]["chop"] = null;
        }
    });

    return stockData["trades"];
};
