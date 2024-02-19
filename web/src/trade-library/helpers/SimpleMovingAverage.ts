export const SimpleMovingAverage = (period, priceArray) => {
    let result = [];

    const reducer = (accumulator, currentValue) => accumulator + currentValue;

    priceArray.forEach((price, index) => {
        let avg = 0;
        let prices = priceArray.slice(index, period + index);
        if (prices.length === period) {
            avg = prices.reduce(reducer) / period;
            result.push(avg);
        }
    });

    return result;
};
