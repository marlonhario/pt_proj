/**
 * @param enterOrExit
 * @param options
 * @param stockData
 */

const movingAverageComputation = ({ period, data }) => {
    const SMA = require("technicalindicators").SMA;
    let value = SMA.calculate({
        values: data,
        period: period,
    });
    return value;
};

export const percentBandwidth = (
    enterOrExit: string,
    options: any,
    stockData: any
) => {
    let period = options["period"];

    let typicalPrice = stockData["trades"].map((item, index) => {
        return item["high"] + item["low"] + item["close"] / 3;
    });

    const appliedTo = (appliedTo = "close") => {
        let value;

        let stockBars = stockData["trades"].map((trade, index) => {
            if (appliedTo === "typical") {
                return typicalPrice[index];
            } else {
                return stockData["trades"][index][appliedTo];
            }
        });
        value = movingAverageComputation({
            data: stockBars,
            period: options["period"],
        });

        let upperBand = value.map(
            (val) => val + val * (options["deviation"] / 100)
        );
        let lowerBand = value.map(
            (val) => val - val * (options["deviation"] / 100)
        );
        let middle = value.map((val) => val);
        let percentBand = stockBars.map((bar, index) => {
            if (index >= options["period"] - 1) {
                return (
                    (bar - lowerBand[index - period - 1]) /
                    (upperBand[index - period - 1] -
                        lowerBand[index - period - 1])
                );
            }
            return null;
        });
        return {
            upper: upperBand,
            lower: lowerBand,
            middle: middle,
            percentBand: percentBand,
        };

        /*
        
        %B Above 1 = Price is Above the Upper Band
        %B Equal to 1 = Price is at the Upper Band
        %B Above .50 = Price is Above the Middle Line
        %B Below .50 = Price is Below the Middle Line
        %B Equal to 0 = Price is at the Lower Band
        %B Below 0 = Price is Below the Lower Band

        */
    };

    let percentBandwidth = appliedTo(options["appliedTo"]);
    console.log({ percentBandwidth });
    stockData["trades"].map((trade, index) => {
        if (index >= period - 1) {
            stockData["trades"][index]["signalValue"][enterOrExit][
                "percentageBandwith"
            ] = percentBandwidth["percentBand"][index];
        } else {
            stockData["trades"][index]["signalValue"][enterOrExit][
                "percentageBandwith"
            ] = null;
        }
    });

    return stockData["trades"];
};
