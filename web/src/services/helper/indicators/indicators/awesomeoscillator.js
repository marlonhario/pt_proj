import {
  Indicator,
  IndicatorInput,
} from "../../../../../../node_modules/technicalindicators/lib/indicator/indicator";
import { SMA } from "../../../../../../node_modules/technicalindicators/lib/moving_averages/SMA";
export class AwesomeOscillatorInput extends IndicatorInput {}
export class AwesomeOscillator extends Indicator {
  constructor(input) {
    super(input);
    var highs = input.high;
    var lows = input.low;
    var fastPeriod = input.fastPeriod;
    var slowPeriod = input.slowPeriod;
    var slowSMA = new SMA({ values: [], period: slowPeriod });
    var fastSMA = new SMA({ values: [], period: fastPeriod });
    this.result = [];

    this.generator = (function* () {
      var result;
      var tick;
      var medianPrice;
      var slowSmaValue;
      var fastSmaValue;
      tick = yield;
      while (true) {
        medianPrice = (tick.high + tick.low) / 2;
        slowSmaValue = slowSMA.nextValue(medianPrice);
        fastSmaValue = fastSMA.nextValue(medianPrice);
        if (slowSmaValue !== undefined && fastSmaValue !== undefined) {
          result = fastSmaValue - slowSmaValue;
        }
        tick = yield result;
      }
    })();
    this.generator.next();
    highs.forEach((tickHigh, index) => {
      var tickInput = {
        high: tickHigh.value,
        low: lows[index].value,
      };
      var result = this.generator.next(tickInput);
      if (result.value != undefined) {
        //Customized data - Prosper Together
        this.result.push({
          date: tickHigh.date,
          value: this.format(result.value),
        });
      }
    });
  }
  nextValue(price) {
    var result = this.generator.next(price);
    if (result.value != undefined) {
      return this.format(result.value);
    }
  }
}
AwesomeOscillator.calculate = awesomeoscillator;
export function awesomeoscillator(input) {
  Indicator.reverseInputs(input);
  var result = new AwesomeOscillator(input).result;
  if (input.reversedInput) {
    result.reverse();
  }
  Indicator.reverseInputs(input);
  return result;
}
