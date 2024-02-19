export const DEMA = (period, priceArray) => {
    const EMA = require("technicalindicators").EMA;

    let result = [],
        EMA1 = [],
        EMA2 = [];

    EMA1 = EMA.calculate({
        period: period,
        values: priceArray,
    });

    EMA2 = EMA.calculate({
        period: period,
        values: EMA1,
    });

    EMA1.forEach((item, index) => {
        result[index] = 2 * EMA1[index] - EMA2[index];
    });

    return result;
};
