let summation = (arr) => {
    return arr.reduce((acc, cur) => {
        return cur + acc;
    }, 0);
};

let multipliedSummation = (arr, type = "close") => {
    let typicalPrice = (item) => {
        return item["high"] + item["low"] + item["close"] / 3;
    };
    return arr.reduce((acc, cur) => {
        if (type === "typical") {
            return cur["volume"] * typicalPrice(cur) + acc;
        }
        return cur["volume"] * cur[type] + acc;
    }, 0);
};

export const vwma = (enterOrExit: string, options: any, stockData: any) => {
    let period = options["period"];
    let appliedTo = options["applyTo"];
    let price = [];
    let volume = [];

    let typicalPrice = stockData["trades"].map((item, index) => {
        return item["high"] + item["low"] + item["close"] / 3;
    });

    stockData["trades"].forEach((trade, index) => {
        price.push(trade);
        volume.push(trade.volume);
    });
    stockData["trades"].forEach((trade, index) => {
        if (index >= period - 1) {
            let vwmaBar =
                multipliedSummation(price.slice(index - period, index)) /
                summation(volume.slice(index - period, index));
            stockData["trades"][index]["signalValue"][enterOrExit][
                "vwma"
            ] = vwmaBar;
        }

        stockData["trades"][index]["signalValue"][enterOrExit]["vwma"] = null;
    });
    return stockData["trades"];
};
