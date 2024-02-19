import { SimpleMovingAverage } from "../helpers/SimpleMovingAverage";
import { StandardDeviation } from "../helpers/StandardDeviation";

export const bb = (enterOrExit: string, options: any, stockData: any) => {
    let priceArray = [];

    stockData["trades"].map((trade, index) => {
        priceArray[index] = stockData["trades"][index][options["applyTo"]];
    });

    let sma = SimpleMovingAverage(options["period"], priceArray);
    let standardDeviation = StandardDeviation(options["period"], priceArray, options["deviation"]);

    stockData["trades"].map((trade, index) => {
        if (index >= options["period"]) {
            stockData["trades"][index]["signalValue"][enterOrExit]["bollinger_bands"] = {
                middle: sma[index],
                upper: sma[index] + standardDeviation[index],
                lower: sma[index] - standardDeviation[index],
            };
        } else {
            stockData["trades"][index]["signalValue"][enterOrExit]["bollinger_bands"] = {
                middle: 0,
                upper: 0,
                lower: 0,
            };
        }
    });

    console.log(stockData["trades"]);

    return stockData["trades"];
};
