export const cmf = (enterOrExit: string, options: any, stockData: any) => {
    let mfm = [], // Money Flow Multiplier
        mfv = [], // Money Flow Volume
        cmf = []; // Chaikin Money Flow

    let close = [],
        low = [],
        high = [],
        volume = [];

    const reducer = (accumulator, currentValue) => accumulator + currentValue;

    stockData["trades"].map((trade, index) => {
        close[index] = stockData["trades"][index]["close"];
        high[index] = stockData["trades"][index]["high"];
        low[index] = stockData["trades"][index]["low"];
        volume[index] = stockData["trades"][index]["volume"];

        let m1 = close[index] - low[index];
        let m2 = high[index] - close[index];
        let m3 = high[index] - low[index];
        mfm[index] = (m1 - m2) / m3;
        mfv[index] = mfm[index] * volume[index];
    });

    stockData["trades"].map((trade, index) => {
        let avg = 0;
        let moneyFlowVolume = mfv.slice(index, options["period"] + index);
        let volumes = volume.slice(index, options["period"] + index);
        if (moneyFlowVolume.length === options["period"]) {
            avg = moneyFlowVolume.reduce(reducer) / volumes.reduce(reducer);
            cmf.push(avg);
        }

        if (index >= options["period"]) {
            stockData["trades"][index]["signalValue"][enterOrExit]["cmf"] = cmf[index];
        } else {
            stockData["trades"][index]["signalValue"][enterOrExit]["cmf"] = null;
        }
    });

    return stockData["trades"];
};
