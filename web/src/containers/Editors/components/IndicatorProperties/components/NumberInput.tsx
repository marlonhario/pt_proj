import React, { useState, useEffect, useMemo } from "react";
import { FormGroup, Input, Label } from "reactstrap";

interface NumberProps {
  data: DataProps;
  identification: string;
  onUpdateForm: Function;
  selectedIndicator: string;
  selectedIndicatorData: any;
  value: string | number;
  defaultValue: string | number;
}

interface DataProps {
  name: string;
  value: string | number;
  type: string;
  DefaultValue: number;
  SelectList?: ItemProps[];
  //   value: number | string;
}

interface ItemProps {
  name: string;
  value: string | number;
}

export const NumberInput: React.FC<NumberProps> = ({
  data,
  identification,
  onUpdateForm,
  selectedIndicator,
  selectedIndicatorData,
  value,
  defaultValue,
}) => {
  let { SelectList = [], name } = useMemo(() => data, [identification]);
  // console.log("defau", identification, DefaultValue);
  let [inputValue, setInputValue] = useState(value);
  let onChange = (e) => {
    setInputValue(e.target.value);
  };

  let onBlurUpdateForm = () => {
    onUpdateForm({
      [identification]: Number(inputValue),
    });
  };

  useEffect(() => {
    if (Object.keys(selectedIndicatorData).length > 0) {
      setInputValue(selectedIndicatorData[identification]);
    }
  }, []);

  useEffect(() => {
    onUpdateForm({
      [identification]: inputValue,
    });
  }, []);

  useEffect(() => {
    onUpdateForm({
      [identification]: inputValue,
    });
  }, [identification]);
  return (
    <FormGroup key={identification}>
      <Label for={`${identification}`}>{name}</Label>
      <Input
        // key={"1"}
        type="number"
        onChange={onChange}
        value={inputValue}
        // defaultValue={defaultValue}
        onBlur={onBlurUpdateForm}
        name={identification}
      // placeholder="with a placeholder"
      />
    </FormGroup>
  );
};
