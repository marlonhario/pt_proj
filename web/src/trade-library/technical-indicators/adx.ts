// import { MinusDM } from "../helpers/MinusDM";
// import { PlusDM } from "../helpers/PlusDM";
// import { TrueRange } from "../helpers/TrueRange";

export const adx = (enterOrExit: string, options: any, stockData: any) => {
    const ADX = require("technicalindicators").ADX;
    let low = [],
        high = [],
        close = [];

    stockData["trades"].map((trade, index) => {
        low[index] = stockData["trades"][index]["low"];
        high[index] = stockData["trades"][index]["high"];
        close[index] = stockData["trades"][index]["close"];
    });

    let method = ADX.calculate({
        low: low,
        high: high,
        close: close,
        period: options["period"],
    });

    stockData["trades"].map((trade, index) => {
        if ((index) => options["period"]) {
            stockData["trades"][index]["signalValue"][enterOrExit]["adx"] = method[index];
        } else {
            stockData["trades"][index]["signalValue"][enterOrExit]["adx"] = null;
        }
    });

    // let trueRange = TrueRange(stockData);
    // let plusDm = PlusDM(stockData);
    // let minusDm = MinusDM(stockData);
    // let trueRange14;
    // let pDM1;
    // let mDM1;
    // let sum = 0;
    // let pd1 = 0;
    // let md1 = 0;
    // let pd14 = 0;
    // let md14 = 0;
    // let period = options["period"];

    // trueRange.map((item, index) => {
    //     sum += item;
    //     if (index == period - 1) {
    //         period += index;
    //         trueRange14.push(sum);
    //         sum = 0;
    //     }qweqweq
    // });

    // // +DI14 = (100 * (+DM14 / TR14))
    // // -DI14 = (100 * (-DM14 / TR14))

    // plusDm.map((item, index) => {
    //     pd1 += item;
    //     if (index == period - 1) {
    //         period += index;
    //         pDM1.push(pd1);
    //         pd1 = 0;
    //     }
    // });

    // minusDm.map((item, index) => {
    //     md1 += item;
    //     if (index == period - 1) {
    //         period += index;
    //         mDM1.push(md1);
    //         md1 = 0;
    //     }
    // });

    // console.log(trueRange14);
    // console.log(plusDm);
    // console.log(minusDm);

    // stockData["trades"].map((trade, index) => {
    //     if (index >= options["period"]) {
    //         stockData["trades"][index]["signalValue"][enterOrExit]["adx"] = 0;
    //     } else {
    //         stockData["trades"][index]["signalValue"][enterOrExit]["adx"] = null;
    //     }
    // });

    // console.log(stockData["trades"]);

    return stockData["trades"];
};
