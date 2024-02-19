import React, { useState, useEffect } from "react";
import { FormGroup, Input, Label } from "reactstrap";

interface SelectProps {
  // data: DataProps[];
  data: DataProps;
  identification: string;
  selectedIndicator: string;
  onUpdateForm: Function;
  selectedIndicatorData: any;
}

interface DataProps {
  name: string;
  value: string | number | boolean;
  type: string;
  DefaultValue: number | boolean | string;
  SelectList?: ItemProps[];
  //   value: number | string;
}

interface ItemProps {
  name: string;
  value: string | number;
}

export const SelectInput = ({
  data,
  identification,
  onUpdateForm,
  selectedIndicator,
  selectedIndicatorData,
}) => {
  let { SelectList = [], name, DefaultValue, value } = data;
  let [inputValue, setInputValue] = useState(DefaultValue.toString());
  console.log(`identification ${identification}`, {
    inputValue,
    DefaultValue,
    SelectList,
  });
  //console.log("default value", identification, DefaultValue);
  let onBlurUpdateForm = () => {
    onUpdateForm({
      [identification]: inputValue === "true",
    });
  };

  let onChange = (e) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    if (Object.keys(selectedIndicatorData).length > 0) {
      setInputValue(selectedIndicatorData[identification]);
    }
  }, []);

  return (
    <FormGroup>
      <Label for={`${identification}`}>{name}</Label>
      <Input
        type="select"
        name={identification}
        value={inputValue?.toString()}
        onChange={onChange}
        onBlur={onBlurUpdateForm}
      >
        {SelectList.map((item, index) => (
          <option key={index} value={item.value.toString()}>
            {item.name}
          </option>
        ))}
      </Input>
    </FormGroup>
  );
};
