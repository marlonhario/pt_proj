import React, { useState, useEffect } from "react";
import { FormGroup, Input } from "reactstrap";
export const PropertySignal = ({
  signal,
  onUpdateSignal,
  selectedIndicatorData,
}): any => {
  console.log("this is properties signal", signal);
  let [value, setValue] = useState({
    value: signal[0].value,
    oppositeValue: signal[0].oppositeValue,
  });

  let setInputValue = (e) => {
    let value = e.target.value;
    // let oppositevalue = e.target;
    let oppositeValue =
      e.target.options[e.target.selectedIndex].dataset.oppositeValue;

    setValue((prevState) => ({
      value: value,
      oppositeValue: oppositeValue,
    }));
    onUpdateSignal({
      value: value,
      oppositeValue: oppositeValue,
    });
  };
  useEffect(() => {
    if (Object.keys(selectedIndicatorData).length > 0) {
      if (
        signal.filter((item) => item.value === selectedIndicatorData["signal"])
          .length === 0
      ) {
        setValue({
          value: signal[0].value,
          oppositeValue: signal[0].oppositeValue,
        });
      } else {
        setValue({
          value: signal.filter(
            (item) => item.value === selectedIndicatorData["signal"]
          )[0].value,
          oppositeValue: signal.filter(
            (item) => item.value === selectedIndicatorData["signal"]
          )[0].oppositeValue,
        });
      }
    }
    // setInputValue(selectedIndicatorData[identification]);
  }, []);

  useEffect(() => {
    // onUpdateSignal(value);
  }, [value]);

  let onBlurUpdateSignal = () => {
    // let;
    // onUpdateSignal({
    //   [signal]: value,
    // });

    onUpdateSignal(value);
  };

  useEffect(() => {
    onUpdateSignal((prevState) => ({
      value: signal[0].value,
      oppositeValue: signal[0].oppositeValue,
    }));
  }, []);

  //   useEffect(() => {
  //     onUpdateForm({
  //       [identification]: inputValue,
  //     });
  //   }, []);

  //   useEffect(() => {
  //     onUpdateForm({
  //       [identification]: inputValue,
  //     });
  //   }, [identification]);

  return (
    <FormGroup>
      <Input
        type="select"
        name="signal"
        value={value["value"]}
        onChange={setInputValue}
      >
        {signal.map((item) => (
          <option
            value={item.value}
            key={item.value}
            data-opposite-value={item.oppositeValue}
          >
            {item.name}
          </option>
        ))}
      </Input>
    </FormGroup>
  );
};
