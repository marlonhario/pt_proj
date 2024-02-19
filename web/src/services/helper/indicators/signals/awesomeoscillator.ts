export const IOscillator = (
  trade,
  joinedData,
  values,
  levelLine = 0,
  signal = "isAboveLevelLine"
) => {
  let stock = {};
  let signalValue = false;

  console.log(joinedData);

  if (values.length === 0) return stock;

  values.forEach((value, index) => {
    let member = value.value;

    if (signal === "isAboveLevelLine") {
      signalValue = member > levelLine;
    }

    if (signal === "isBelowLevelLine") {
      signalValue = member < levelLine;
    }

    if (signal === "isCrossingLineUpward") {
      signalValue = (function () {
        if (index === 0) return false;

        return member > values[index - 1] && member > levelLine;
      })();
    }

    if (signal === "isCrossingLineDownward") {
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
    joinedData[value.date]["signal"]["AO"][trade] = signalValue;
  });

  return {
    signal: stock,
    joinedData: joinedData,
  };
};
