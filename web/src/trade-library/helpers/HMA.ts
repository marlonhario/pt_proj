// import { WeightedMovingAverage } from "./WeightedMovingAverage";

export const HMA = (period, priceArray) => {
    let WMA1 = [],
        WMA2 = [],
        rawHMA = [],
        result = [];

    const WMA = require("technicalindicators").WMA;
    // WMA1 = WeightedMovingAverage(17 / 2, priceArray);
    // WMA2 = WeightedMovingAverage(17, priceArray);
    WMA1 = WMA.calculate({
        period: period / 2,
        values: priceArray,
    });

    WMA2 = WMA.calculate({
        period: period,
        values: priceArray,
    });

    WMA2.map((item, index) => {
        rawHMA[index] = 2 * WMA1[index] - WMA2[index];
    });

    result = WMA.calculate({
        period: Math.sqrt(period),
        values: rawHMA,
    });

    return result;
};
