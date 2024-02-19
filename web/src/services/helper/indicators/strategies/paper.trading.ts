import walkForwardOptimize from "../others/walk.forward";

export const PaperTrading = (data: any, options: any) => {
  options["inSampleMinProfit"] = 10;
  options["OutSampleMinProfit"] = 10;

  let result = walkForwardOptimize(
    (data) => {
      options.indicators.forEach((indicator) => {
        if (options[indicator].signal === true) return 1;
        if (options[indicator].signal === false) return 0;
      });
    },
    [options],
    () => {
      options.indicators.forEach((indicator) => {
        if (options[indicator].signal.reverse === true) return 1;
        if (options[indicator].signal.reverse === false) return 0;
      });
    },
    data,
    50,
    150,
    {}
  );

  return result;
};
