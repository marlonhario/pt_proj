export const WeightedMovingAverage = (period, priceArray) => {
    let result = [];

    priceArray.forEach((price, index) => {
        let sum = 0;
        let periodSum = 0;
        let prices = priceArray.slice(index, Math.round(period) + index);
        let wma = 0;
        prices.forEach((p, i) => {
            sum += (i + 1) * p;
            periodSum += i + 1;
        });

        if (prices.length === period) {
            wma = sum / periodSum;
            result.push(wma);
        }
    });

    return result;
};
