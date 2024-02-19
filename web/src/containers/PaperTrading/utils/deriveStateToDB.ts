import { sortCards } from "./sortByKey";
export let deriveStateToDB = async (data) => {
  let newData = data;

  let newList = newData.reduce((acc, cur, index) => {
    console.log({ rowData: cur });
    if (cur.children !== undefined) {
      return [
        ...acc,
        cur.children.map((item, indexInner) => ({
          ...item,
          inGroup: true,
          order: index,
          group: cur.group,
          group_order: indexInner,
          group_name: cur.group_name ? cur.group_name : cur.title,
        })),
      ];
    }

    return [...acc, { ...cur, order: index, group: null, group_name: null }];
  }, []);
  console.log({ newList });
  //remove nested array
  newList = newList.flat(2);

  // newList = sortCards(newList, "group_order");
  return newList;
};
