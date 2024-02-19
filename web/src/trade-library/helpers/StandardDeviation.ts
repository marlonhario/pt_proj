import { SimpleMovingAverage } from "./SimpleMovingAverage";

export const StandardDeviation = (period, priceArray, deviation) => {
    let result = [];
    let sma = SimpleMovingAverage(period, priceArray);

    const standardDeviation = (smaArray) => {
        const mean = smaArray.reduce((acc, val) => acc + val, 0) / smaArray.length;
        return (
            Math.sqrt(smaArray.reduce((acc, val) => acc.concat((val - mean) ** 2), []).reduce((acc, val) => acc + val, 0) / (smaArray.length - 0)) *
            deviation
        );
    };

    sma.forEach((price, index) => {
        let prices = priceArray.slice(index, period + index);

        result.push(standardDeviation(prices));
    });

    return result;
};
