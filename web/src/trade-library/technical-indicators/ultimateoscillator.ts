/**
 * @param enterOrExit
 * @param options
 * @param stockData
 */

let summation = (arr) => {
    return arr.reduce((acc, cur) => {
        return acc + cur;
    }, 0);
};
export const uo = (enterOrExit: string, options: any, stockData: any) => {
    const SMA = require("technicalindicators").SMA;
    const EMA = require("technicalindicators").EMA;
    const OBV = require("technicalindicators").OBV;

    //7
    let period1 = options["period1"];
    //14
    let period2 = options["period2"];
    //28
    let period3 = options["period3"];
    let appliedTo = options["applyTo"];
    let bp = [];
    let tr = [];

    stockData["trades"].forEach((trade, index) => {
        if (index >= 1) {
            //For bp
            let min = Math.min(
                stockData["trades"][index]["low"],
                stockData["trades"][index - 1][appliedTo]
            );
            bp.push(stockData["trades"][index][appliedTo] - min);

            //For TR
            let max =
                Math.max(
                    stockData["trades"][index]["high"],
                    stockData["trades"][index - 1][appliedTo]
                ) - min;
            tr.push(max);
        }
        bp.push(null);
        tr.push(null);
    });
    let average1 = [];
    let average2 = [];
    let average3 = [];

    stockData["trades"].forEach((trade, index) => {
        //period1 dont minus 1 due to the tr and bp starting at null to get average properly
        if (index >= period1) {
            let ave = summation(bp.slice(index - 6, index + 1));
            average1.push(ave);
        } else {
            average1.push(null);
        }
        if (index >= period2) {
            let ave = summation(bp.slice(index - 6, index + 1));
            average2.push(ave);
        } else {
            average2.push(null);
        }
        if (index >= period3) {
            let ave = summation(bp.slice(index - 6, index + 1));
            average3.push(ave);
        } else {
            average3.push(null);
        }
    });

    let computeUo = (ave7, ave14, ave28) => {
        let uo = 100 * ((4 * ave7 + 2 * ave14 + ave28) / (4 + 2 + 1));

        return uo;
    };

    stockData["trades"].map((trade, index) => {
        if (index >= period3) {
            stockData["trades"][index]["signalValue"][enterOrExit][
                "uo"
            ] = computeUo(average1[index], average2[index], average3[index]);
        } else {
            stockData["trades"][index]["signalValue"][enterOrExit]["uo"] = null;
        }
    });
    return stockData["trades"];
};
