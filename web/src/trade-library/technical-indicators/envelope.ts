/**
 * @param enterOrExit
 * @param options
 * @param stockData
 */

const movingAverageComputation = ({ type, period, data }) => {
    const SMA = require("technicalindicators").SMA;
    const EMA = require("technicalindicators").EMA;
    if (type === "simple") {
        let value = SMA.calculate({
            close: data,
            period: period,
        });
        return value;
    } else {
        let value = EMA.calculate({
            close: data,
            period: period,
        });
        return value;
    }
};

export const env = (enterOrExit: string, options: any, stockData: any) => {
    // const SMA = require('technicalindicators').SMA;
    // const EMA = require('technicalindicators').EMA;
    const SMA = require("technicalindicators").SMA;

    const appliedTo = (appliedTo) => {
        let value;
        let stockBars = stockData["trades"].map(
            (trade, index) => stockData["trades"][index][appliedTo]
        );
        value = movingAverageComputation({
            type: options["maMethod"],
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

        return {
            upper: upperBand,
            lower: lowerBand,
            middle: middle,
        };
    };

    let envelopes = appliedTo(options["appliedTo"]);

    stockData["trades"].map((trade, index) => {
        if (index >= options["period"] - 1) {
            stockData["trades"][index]["signalValue"][enterOrExit]["envelope"] =
                envelopes[index];
        } else {
            stockData["trades"][index]["signalValue"][enterOrExit][
                "envelope"
            ] = null;
        }
    });

    return stockData["trades"];
};
