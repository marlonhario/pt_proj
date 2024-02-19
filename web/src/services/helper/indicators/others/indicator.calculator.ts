import { macd } from "../indicators/macd";
import { awesomeoscillator } from "../indicators/awesomeoscillator";
import { IOscillator } from "../signals/awesomeoscillator";
import { IMacd } from "../signals/macd";
import { validateUserOptions } from "./miscellaneous";
const helperSettings = require("../../../../containers/Editors/indicatorSettings/helper.settings.json");

/**
 * Use to validate indicator parameters and execute signal calculation
 *
 * @param options object
 */
export const indicatorCalculator = (options: any) => {
  const requiredKeys = helperSettings.policy.indicator;
  const indicators = {
    AO: (options) => {
      return awesomeoscillator(options);
    },
    MACD: (options) => {
      return macd(options);
    },
  };

  let result = {
    status: 200,
    message: "",
    data: {},
  };
  let indicatorValue;

  //STEP 1: Validate user params
  validateUserOptions(options, requiredKeys);

  //STEP 2: Compute the indicator values
  try {
    indicatorValue = indicators[options.indicator](options.data);
  } catch (error) {
    result.status = 500;
    result.message = error.message;
  }

  //STEP 3: Check the signals
  if (result.status !== 500) {
    //If indicator is AO only [1,2,3,4]
    if (options.indicator === "AO") {
      result.data = IOscillator(
        options.trade,
        options.data.joinedData,
        indicatorValue,
        options.levelLine,
        options.data.signal
      );
    }
    //If indicator is MACD only [ { MACD : 0.01, Signal : 0 } ]
    if (options.indicator === "MACD") {
      result.data = IMacd(
        options.trade,
        options.data.joinedData,
        indicatorValue,
        options.data.signal
      );
    }
  }

  //STEP 4: Return data
  options.callback(result);
};
