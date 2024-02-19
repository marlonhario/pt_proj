export const alma = (enterOrExit: string, options: any, stockData: any) => {
    stockData["trades"].map((trade, index) => {
        if (index >= options["period"]) {
            stockData["trades"][index]["signalValue"][enterOrExit]["alma"] = calculateALMA(
                stockData["trades"].slice(index - options["periods"] - 1, options["period"]),
                options["period"],
                options["offset"],
                options["sigma"],
                options["applyTo"]
            );
        } else {
            stockData["trades"][index]["signalValue"][enterOrExit]["alma"] = null;
        }
    });

    return stockData["trades"];
};

const calculateALMA = (series: any, windowsize: number, offset: number, sigma: number, applyTo: string = "close") => {
    let m = Math.floor(offset * (windowsize - 1));
    let s = windowsize / sigma;
    let weight = 0.0;
    let norm = 0.0;
    let sum = 0.0;
    for (let i = 0; i < windowsize; i++) {
        console.log(i);
        weight = Math.exp((-1 * Math.pow(i - m, 2)) / (2 * Math.pow(s, 2)));
        norm = norm + weight;
        sum = sum + series[windowsize - i - 1][applyTo] * weight;
    }
    return sum / norm;
};
