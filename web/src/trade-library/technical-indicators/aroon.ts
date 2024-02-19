/**
 * @param enterOrExit
 * @param options
 * @param stockData
 */
export const aroon = (enterOrExit: string, options: any, stockData: any) => {
    let high = [];
    let low = [];
    let period = options["period"];
    let aroonUp = [];
    let aroonDown = [];
    let aroonType = options["aroonType"];
    stockData["trades"].forEach((trade, index) => {
        high.push(trade["high"]);
        low.push(trade["low"]);
    });

    stockData["trades"].forEach((trade, index) => {
        if (index >= period - 1) {
            let periodTimeHigh = Math.max(
                ...high.slice(index - period - 1, index + 1)
            );
            let periodTimeLow = Math.max(
                ...low.slice(index - period - 1, index + 1)
            );
            let aroonUpBar = ((period - periodTimeHigh) / period) * 100;
            let aroonDownBar = ((period - periodTimeLow) / period) * 100;
            aroonUp.push(aroonUpBar);
            aroonDown.push(aroonDownBar);
        }
    });

    stockData["trades"].forEach((trade, index) => {
        if (aroonType === "up" && index >= period - 1) {
            stockData["trades"][index]["signalValue"][enterOrExit]["aroon"] =
                aroonUp[index];
        } else {
            stockData["trades"][index]["signalValue"][enterOrExit]["aroon"] =
                aroonDown[index];
        }
        stockData["trades"][index]["signalValue"][enterOrExit]["aroon"] = null;
    });

    return stockData["trades"];
};
