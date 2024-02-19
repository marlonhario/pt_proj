import React, { useContext } from "react";
import { Card, CardText, CardTitle } from "reactstrap";
import CloseIcon from "mdi-react/CloseIcon";
import { ContextDesign } from "../../../../hooks/context/Context";
import { useIndicator } from "../../../../services/graphQL/Design/useIndicator";
import { staticData } from "../data";

interface Props {
  id: any;
  item: any;
  name: any;
  subName: any;
  exit: any;
  selectIndicator: any;
  color?: any;
  setOpenIndicator: any;
}

export const DesignEntryCard: React.FC<Props> = ({
  id,
  item,
  name,
  subName,
  exit,
  color = "#d0dfd4",
  setOpenIndicator,
}) => {
  const {
    designState: {
      longExitList,
      shortExitList,
      longEntryList,
      shortEntryList,
      isLongEntryRules,
      stockData,
      strategyProperties,
    },
    designDispatch,
  } = useContext(ContextDesign);

  const { handleAddIndicator } = useIndicator();
  const { backMarketData } = staticData();

  const handleDeleteItem = (id: any, exit: boolean) => {
    let longId = `${id}-long`;
    let shortId = `${id}-short`;

    if (exit) {
      const longExit = longExitList.filter((item) => item.id !== longId);
      const shortExit = shortExitList.filter((item) => item.id !== shortId);

      designDispatch({
        type: "DELETE_EXIT_STRATEGY",
        longExitList: longExit,
        shortExitList: shortExit,
      });
      setOpenIndicator(false)

      // addIndicator(longEntryList, longExit, shortEntryList, shortExit);
    } else {
      const longEntry = longEntryList.filter((item) => item.id !== longId);
      const shortEntry = shortEntryList.filter((item) => item.id !== shortId);

      designDispatch({
        type: "DELETE_ENTRY_STRATEGY",
        longEntryList: longEntry,
        shortEntryList: shortEntry,
      });

      setOpenIndicator(false)

      // addIndicator(longEntry, longExitList, shortEntry, shortExitList);
    }
  };

  const addIndicator = (
    longEntry: any,
    longExit: any,
    shortEntry: any,
    shortExit: any
  ) => {
    if (
      (longEntry.length > 0 || shortEntry.length > 0) &&
      (longExit.length > 0 || shortExit.length > 0)
    ) {
      if (stockData.length > 0) {
        // handleAddIndicator(
        //   {
        //     longEntry,
        //     shortEntry,
        //     longExit,
        //     shortExit,
        //   },
        //   stockData,
        //   strategyProperties
        // );
      } else {
        // handleAddIndicator(
        //   {
        //     longEntry,
        //     shortEntry,
        //     longExit,
        //     shortExit,
        //   },
        //   undefined,
        //   strategyProperties
        // );
      }
    } else {
      designDispatch({
        type: "UPDATE_BACK_TEST_BALANCE_CHART",
        backmarketData: backMarketData,
        balance_chart: [],
      });
    }
  };

  return (
    <Card
      body
      style={{
        backgroundColor: color,
        padding: ".75rem",
        marginTop: ".2rem",
      }}
      onClick={(e) => {
        e.stopPropagation();
        setOpenIndicator(true);
        designDispatch({
          type: "SET_TOGGLE_LONG_ENTRY_RULES",
          isLongEntryRules: !exit,
          selectedIndicatorData: item,
        });
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
                  onClick={(event) => {
                    event.stopPropagation();
                    let newId = id.split("-")[0];
                    handleDeleteItem(newId, exit);
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
