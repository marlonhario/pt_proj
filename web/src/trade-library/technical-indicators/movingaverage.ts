import { DEMA } from "../helpers/DEMA";
import { HMA } from "../helpers/HMA";
import { SimpleMovingAverage } from "../helpers/SimpleMovingAverage";

export const movingaverage = (
    enterOrExit: string,
    options: any,
    stockData: any
) => {
    const EMA = require("technicalindicators").EMA;
    const WMA = require("technicalindicators").WMA;
    let method = [];
    let priceArray = [];

    stockData["trades"].map(
        (trade, index) =>
            (priceArray[index] = stockData["trades"][index][options["applyTo"]])
    );

    switch (options["maMethod"]) {
        case "simple":
            method = SimpleMovingAverage(options["period"], priceArray);
            break;
        case "weighted":
            method = WMA.calculate({
                period: options["period"],
                values: priceArray,
            });
            break;
        case "exponential":
            method = EMA.calculate({
                period: options["period"],
                values: priceArray,
            });
            break;
        case "doubleExponential":
            method = DEMA(options["period"], priceArray);
            break;
        case "hull":
            method = HMA(options["period"], priceArray);
            break;
        default:
            method = SimpleMovingAverage(options["period"], priceArray);
            break;
    }

    stockData["trades"].map((trade, index) => {
        if (index >= options["period"]) {
            stockData["trades"][index]["signalValue"][enterOrExit][
                "moving_average"
            ] = method[index];
        } else {
            stockData["trades"][index]["signalValue"][enterOrExit][
                "moving_average"
            ] = null;
        }
    });

    return stockData["trades"];
};
