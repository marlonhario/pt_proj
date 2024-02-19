import React, { useState, useEffect } from "react";
import { FormGroup, Input, Label } from "reactstrap";

export const NumberInput: React.FC = ({}) => {
  return (
    <FormGroup>
      <Label for={``}>{name}</Label>
      <Input
        type="number"
        // placeholder="with a placeholder"
      />
    </FormGroup>
  );
};
