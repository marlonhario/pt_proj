import React from "react";
import SortableTree, {
  changeNodeAtPath,
  getVisibleNodeCount,
} from "react-sortable-tree";
import { useMoveStrategyMutation } from "../../../generated/graphql";
import { getAccessToken } from "../../../accessToken";
import usePaperTrading from "../hooks/usePaperTradingQuery";
import { deriveStateFromDB } from "../utils/deriveStateFromDB";
import { deriveStateToDB } from "../utils/deriveStateToDB";
import { Row, Col, CardBody } from "reactstrap";

import "react-sortable-tree/style.css"; // This only needs to be imported once in your app
import { useTreeState } from "../hooks/useTreeState";
import { StrategyItem } from "./StrategyItem";
import { GroupItem } from "./GroupItem";
import { Card } from "@material-ui/core";

export const Tree = () => {
  const { paperList } = usePaperTrading();
  const [moveStrategy] = useMoveStrategyMutation();
  const {
    setCards,
    treeData,
    setTreeData,
    addGroupContainer,
    onChangeName,
  } = useTreeState();

  let treeRef = React.useRef();

  let saveToDB = async (data) => {
    let newList = await deriveStateToDB(data);

    await moveStrategy({
      variables: {
        data: JSON.stringify({
          rows: newList,
        }),
        token: getAccessToken(),
      },
    });
  };

  const canHaveChildren = (node) => {
    return node.canHaveChildren;
  };

  let renderCardDisplay = (node) => {
    if (
      node.canHaveChildren &&
      treeData.filter((item) => item.group === node.group)[0]?.children
    ) {
      return (
        <GroupItem
          node={node}
          saveToDB={saveToDB}
          onChangeName={onChangeName}
          items={
            treeData.filter((item) => item.group === node.group)[0]?.children
          }
        />
      );
    }

    return <StrategyItem node={node} />;
  };

  let getIndexOfArrayObjects = (array, key, search) => {
    return array
      .map((item) => {
        return item[key];
      })
      .indexOf(search);
  };

  React.useEffect(() => {
    if (paperList.length > 0) {
      setCards(deriveStateFromDB(paperList));
    }
  }, [paperList]);


  return (
    <div style={{ height: getVisibleNodeCount({ treeData }) * 124 + 150 }}>
      <button
        className="btn btn-secondary btn-secondary-outlined"
        onClick={(e) => {
          addGroupContainer();
        }}
      >
        Add group container
      </button>
      <SortableTree
        maxDepth={2}
        treeData={treeData}
        canNodeHaveChildren={canHaveChildren}
        getNodeKey={({ node, treeIndex }) => {
          if (node.id) {
            return node.id;
          }
          return `${node.id}-${node.group}`;
        }}
        onChange={(treeData) => {

          const newTreeData = treeData.map((item) => {
            if(item.canHaveChildren){
              return item
            }
            return {
              ...item,
              group: null
            }
          })
          setTreeData(newTreeData);
        }}
        rowHeight={({ node }) => {
          return 124;
        }}
        innerStyle={{ marginTop: "2rem" }}
        generateNodeProps={({ node, path }) => ({
          title: <div>{renderCardDisplay(node)}</div>,
        })}
      />
    </div>
  );
};
