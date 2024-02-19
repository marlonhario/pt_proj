export const IMacd = (
  trade,
  joinedData,
  values,
  signal = "isAboveZeroLine"
) => {
  let stock = {};
  let signalValue = false;
  let levelLine = 0;

  if (values.length === 0) return stock;

  values.forEach((value, index) => {
    let member = value.value;

    if (signal === "isAboveZeroLine") {
      signalValue = member > levelLine;
    }

    if (signal === "isBelowZeroLine") {
      signalValue = member < levelLine;
    }

    if (signal === "isCrossingZeroUpward") {
      signalValue = (function () {
        if (index === 0) return false;

        return member > values[index - 1] && member > levelLine;
      })();
    }

    if (signal === "isCrossingZeroDownward") {
      signalValue = (function () {
        if (index === 0) return false;

        return member < values[index - 1] && member < levelLine;
      })();
    }

    if (signal === "isChangingUpward") {
      signalValue = (function () {
        if (index === 0) return false;

        return member > values[index - 1];
      })();
    }

    //i - 2 < i - 1 && i -1 > i
    if (signal === "isChangingDownward") {
      signalValue = (function () {
        if (index === 0) return false;

        return member < values[index - 1];
      })();
    }

    if (signal === "isSignalRising") {
      signalValue = (function () {
        if (index === 0) return false;

        for (let inner = index - 1; inner >= 0; inner--) {
          if (member > values[inner]) {
            return true;
          } else {
            inner = -1;
            return false;
          }
        }
      })();
    }

    if (signal === "isSignalFalling") {
      signalValue = (function () {
        if (index === 0) return false;

        for (let inner = index - 1; inner >= 0; inner--) {
          if (member < values[inner]) {
            return true;
          } else {
            inner = -1;
            return false;
          }
        }
      })();
    }

    //Check if above level line
    stock[value.date] = {
      value: member,
      signal: signalValue,
    };
    //Push Data to Joined Data
    joinedData[value.date]["signal"]["MACD"][trade] = signalValue;
  });

  return {
    signal: stock,
    joinedData: joinedData,
  };
};
