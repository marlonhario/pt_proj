import { Indicator, IndicatorInput } from "../../../../node_modules/technicalindicators/lib/indicator/indicator";
import { SMA } from "../../../../node_modules/technicalindicators/lib/moving_averages/SMA";
import { EMA } from "../../../../node_modules/technicalindicators/lib/moving_averages/EMA";
var PTmacdData = {};

/************************************************************************
 * MACD from Technical Indicator
 *
 ************************************************************************/

export class MACDInput extends IndicatorInput {
    values: any;
    SimpleMAOscillator: boolean = true;
    SimpleMASignal: boolean = true;

    constructor(values) {
        super();
        this.values = values;
        this.SimpleMAOscillator = true;
        this.SimpleMASignal = true;
    }
}

export class MACDOutput {}

export class MACD extends Indicator {
    result: any = [];
    generator: any;
    calculate: any;
    format: any;

    constructor(input) {
        super(input);
        var oscillatorMAtype = input.SimpleMAOscillator ? SMA : EMA;
        var signalMAtype = input.SimpleMASignal ? SMA : EMA;
        var fastMAProducer = new oscillatorMAtype({
            period: input.fastPeriod,
            values: [],
            format: (v) => {
                return v;
            },
        });
        var slowMAProducer = new oscillatorMAtype({
            period: input.slowPeriod,
            values: [],
            format: (v) => {
                return v;
            },
        });
        var signalMAProducer = new signalMAtype({
            period: input.signalPeriod,
            values: [],
            format: (v) => {
                return v;
            },
        });
        var format =
            typeof input["format"] == "function"
                ? input["format"]
                : function (val) {
                      return val;
                  };
        this.result = [];
        this.generator = (function* () {
            var index = 0;
            var tick;
            var MACD, signal, histogram, fast, slow;
            while (true) {
                if (index < input.slowPeriod) {
                    tick = yield;
                    fast = fastMAProducer.nextValue(tick);
                    slow = slowMAProducer.nextValue(tick);
                    index++;
                    continue;
                }
                if (fast && slow) {
                    //Just for typescript to be happy
                    MACD = fast - slow;
                    signal = signalMAProducer.nextValue(MACD);
                }
                histogram = MACD - signal;
                tick = yield {
                    //fast : fast,
                    //slow : slow,
                    MACD: format(MACD),
                    signal: signal ? format(signal) : undefined,
                    histogram: isNaN(histogram) ? undefined : format(histogram),
                };
                fast = fastMAProducer.nextValue(tick);
                slow = slowMAProducer.nextValue(tick);
            }
        })();
        this.generator.next();
        input.values.forEach((tick) => {
            var result = this.generator.next(tick.value);
            if (result.value != undefined) {
                //Customized data - Prosper Together
                this.result.push({
                    date: tick.date,
                    value: result.value,
                });
                PTmacdData[tick.date] = result.value.MACD;
            }
        });
    }
    nextValue(price) {
        var result = this.generator.next(price).value;
        return result;
    }
}
MACD["calculate"] = macd;
export function macd(input) {
    Indicator.reverseInputs(input);
    var result = new MACD(input).result;
    if (input.reversedInput) {
        result.reverse();
    }
    Indicator.reverseInputs(input);
    return result;
}

/************************************************************************
 * PT custom MACD code
 *
 * @param options any
 ************************************************************************/
export const PTMacd = (enterOrExit: string, options: any, stockData: any) => {

    PTmacdData = {};

    console.log( JSON.stringify( PTmacdData ) );

    let MACDvalues = macd({
        values: stockData["medianPriceWithDate"],
        fastPeriod: options["fastPeriod"],
        slowPeriod: options["slowPeriod"],
        signalPeriod: options["signalPeriod"],
        SimpleMAOscillator: false,
        SimpleMASignal: false,
    });

    stockData["trades"].map((trade, index) => {
        if (index >= options["slowPeriod"]) {
            stockData["trades"][index]["signalValue"][enterOrExit]["macd"] = PTmacdData[trade["date"]];
        } else {
            stockData["trades"][index]["signalValue"][enterOrExit]["macd"] = null;
        }
    });

    return stockData["trades"];
};

export const macd_signal = (tradeData, activity, signal, levelLine) => {
    tradeData.map((trade, index) => {
        if (signal === "above_zero_line") {
            if (trade["signalValue"][activity]["macd"] > levelLine) {
                tradeData[index][activity]["long"].push(true);
                tradeData[index][activity]["short"].push(false);
            } else {
                tradeData[index][activity]["long"].push(false);
                tradeData[index][activity]["short"].push(true);
            }
        }
        if (signal === "below_zero_line") {
            if (trade["signalValue"][activity]["macd"] < levelLine) {
                tradeData[index][activity]["long"].push(true);
                tradeData[index][activity]["short"].push(false);
            } else {
                tradeData[index][activity]["long"].push(false);
                tradeData[index][activity]["short"].push(true);
            }
        }
        if (signal === "rises") {
            if (trade["signalValue"][activity]["macd"] > tradeData[index - 1]["signalValue"][activity]["macd"]) {
                tradeData[index][activity]["long"].push(true);
                tradeData[index][activity]["short"].push(false);
            } else {
                tradeData[index][activity]["long"].push(false);
                tradeData[index][activity]["short"].push(true);
            }
        }
        if (signal === "falls") {
            if (trade["signalValue"][activity]["macd"] < tradeData[index - 1]["signalValue"][activity]["macd"]) {
                tradeData[index][activity]["long"].push(true);
                tradeData[index][activity]["short"].push(false);
            } else {
                tradeData[index][activity]["long"].push(false);
                tradeData[index][activity]["short"].push(true);
            }
        }
        if (signal === "crosses_upward") {
            let condition1 = trade["signalValue"][activity]["macd"] > tradeData[index - 1]["signalValue"][activity]["macd"];
            let condition2 = tradeData[index - 1]["signalValue"][activity]["macd"] < levelLine;
            let condition3 = trade["signalValue"][activity]["macd"] > levelLine;
            if (condition1 && condition2 && condition3) {
                tradeData[index][activity]["long"].push(true);
                tradeData[index][activity]["short"].push(false);
            } else {
                tradeData[index][activity]["long"].push(false);
                tradeData[index][activity]["short"].push(true);
            }
        }
        if (signal === "crosses_downward") {
            let condition1 = trade["signalValue"][activity]["macd"] < tradeData[index - 1]["signalValue"][activity]["macd"];
            let condition2 = tradeData[index - 1]["signalValue"][activity]["macd"] > levelLine;
            let condition3 = trade["signalValue"][activity]["macd"] < levelLine;
            if (condition1 && condition2 && condition3) {
                tradeData[index][activity]["long"].push(true);
                tradeData[index][activity]["short"].push(false);
            } else {
                tradeData[index][activity]["long"].push(false);
                tradeData[index][activity]["short"].push(true);
            }
        }
    });

    return tradeData;
};
