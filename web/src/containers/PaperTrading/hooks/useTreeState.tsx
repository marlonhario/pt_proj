import React from "react";
import { useMoveStrategyMutation } from "../../../generated/graphql";
import { getAccessToken } from "../../../accessToken";
import { deriveStateFromDB } from "../utils/deriveStateFromDB";
import { deriveStateToDB } from "../utils/deriveStateToDB";

export const useTreeState = () => {
  const [cards, setCards] = React.useState([]);
  const [treeData, setTreeData] = React.useState([]);
  const [moveStrategy] = useMoveStrategyMutation();

  const addGroupContainer = () => {
    let groupNum =
      Math.max(
        ...cards.map((item) => item.group).filter((card) => card !== null)
      ) + 1;
    if (!isFinite(groupNum)) {
      groupNum = 1;
    }
    setCards([
      ...cards,
      {
        id: `Group ${groupNum}`,
        title: `Group ${groupNum}`,
        group: groupNum,
        group_order: groupNum,
        children: [],
        canHaveChildren: true,
      },
    ]);
  };
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

  let onChangeName = (newName, node) => {
    let newGroup = treeData.map((item) => {
      if (node.id === item.id) {
        return {
          ...node,
          ...item,
          children: item.children?.map((childItem) => ({
            ...childItem,
            group_name: newName,
          })),
          group_name: newName,
          title: newName,
        };
      }

      return item;
    });
    setTreeData(newGroup);
  };

  React.useEffect(() => {
    if (cards.length > 0) {
      setTreeData(cards);
    }
  }, [cards]);

  React.useEffect(() => {
    if (treeData.length > 0) {
      saveToDB(treeData);
    }
  }, [cards, treeData]);

  return {
    cards,
    setCards,
    treeData,
    setTreeData,
    addGroupContainer,
    onChangeName,
  };
};
