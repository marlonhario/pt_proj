import React from "react";
import { Card, CardTitle, CardText } from "reactstrap";
import nextId from "react-id-generator";

import CloseIcon from "mdi-react/CloseIcon";
import { useIndicatorFormStore } from "./store";
interface Props {
  name: string;
  subName: string;
  id: string;
  color?: string;
  isExit?: boolean;
  deleteItem: Function;
  selectIndicator: Function;
  item: any;
}

export const EntryCard: React.FC<Props> = ({
  name,
  subName,
  id,
  color = "#d0dfd4",
  isExit = false,
  deleteItem,
  selectIndicator,
  item,
}) => {
  return (
    <Card
      body
      style={{
        backgroundColor: color,
        padding: ".75rem",
        marginTop: ".2rem",
      }}
      onClick={(e) => {
        // e.stopPropagation();
        // e.preventDefault();
        selectIndicator(item);
      }}
    >
      <CardTitle style={{ marginBottom: "-.5rem" }}>
        <div className="d-flex justify-content-between">
          <div>
            <h5 className="bold-text">{name}</h5>
          </div>
          <div className="">
            <button className="panel__btn">
              {color === "#d0dfd4" && (
                <CloseIcon
                  onClick={(e) => {
                    // e.preventDefault();
                    e.stopPropagation();
                    // e.stopImmediatePropagation();
                    let newId = id.split("-")[0];
                    // selectIndicator({});
                    deleteItem(newId, isExit);
                  }}
                />
              )}
            </button>
          </div>
        </div>
      </CardTitle>
      <CardText>{subName}</CardText>
    </Card>
  );
};
