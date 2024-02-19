/**
 * Created by AAravindan on 5/4/16.
 */
import {
  Indicator,
  IndicatorInput,
} from "../../../../../../node_modules/technicalindicators/lib/indicator/indicator";
import { SMA } from "../../../../../../node_modules/technicalindicators/lib/moving_averages/SMA";
import { EMA } from "../../../../../../node_modules/technicalindicators/lib/moving_averages/EMA";
export class MACDInput extends IndicatorInput {
  constructor(values) {
    super();
    this.values = values;
    this.SimpleMAOscillator = true;
    this.SimpleMASignal = true;
  }
}
export class MACDOutput {}
export class MACD extends Indicator {
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
    var format = this.format;
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
          value: result.value.MACD,
        });
      }
    });
  }
  nextValue(price) {
    var result = this.generator.next(price).value;
    return result;
  }
}
MACD.calculate = macd;
export function macd(input) {
  Indicator.reverseInputs(input);
  var result = new MACD(input).result;
  if (input.reversedInput) {
    result.reverse();
  }
  Indicator.reverseInputs(input);
  return result;
}
