import React, { useState, useEffect } from "react";
import { FormGroup, Input, Label } from "reactstrap";

export const SelectInput = ({}) => {
  return (
    <FormGroup>
      <Label for={``}></Label>
      <Input type="select"></Input>
    </FormGroup>
  );
};
