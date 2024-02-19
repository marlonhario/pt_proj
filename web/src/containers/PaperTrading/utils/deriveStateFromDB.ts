import { sortCards } from "./sortByKey";

export const deriveStateFromDB = (data) => {
  console.log({ data });
  let getGroups = data
    .reduce((acc, cur) => {
      if (cur.group !== null) {
        return [...acc, cur];
      }

      return acc;
    }, [])
    .reduce((acc, cur) => {
      if (acc.length > 0) {
        let findEqualItem = acc.filter((card) => card.group === cur.group);
        if (findEqualItem.length > 0) {
          acc = acc.map((card) => {
            if (card.group === cur.group) {
              return {
                ...card,
                canHaveChildren: true,
                order: cur.order,
                group_order: cur.group_order,
                id: `group-${cur.group}`,
                group_name: cur.group_name,
                children: sortCards(
                  [
                    ...card.children,
                    { ...cur, title: cur.id, canHaveChildren: false },
                  ],
                  "group_order"
                ),
              };
            }

            return card;
          });

          return acc;
        } else {
          return [
            ...acc,
            {
              id: `group-${cur.group}`,
              title: `Group ${cur.group}`,
              order: cur.order,
              group: cur.group,
              canHaveChildren: true,
              group_order: cur.group_order,
              group_name: cur.group_name,
              children: [{ ...cur, title: cur.id, canHaveChildren: false }],
            },
          ];
        }
      } else {
        return [
          ...acc,
          {
            id: `group-${cur.group}`,
            title: `Group ${cur.group}`,
            order: cur.order,
            group: cur.group,
            group_order: cur.group_order,
            canHaveChildren: true,
            group_name: cur.group_name,
            children: [{ ...cur, title: cur.id, canHaveChildren: false }],
          },
        ];
      }
    }, []);
  let getItems = data
    .filter((item) => item.group === null)
    .map((item) => ({ ...item, title: item.id, canHaveChildren: false }));

  let result = sortCards(
    [...getItems, ...getGroups]
      .map((item, index) => ({
        ...item,
        group_order: index,
      }))
      .slice(),
    "order"
  );
  const test = result.slice().sort((a, b) => {
    return b - a;
    // console.log({ a: a["order"], b: b["order"] });
    // if (a["order"] < b["order"]) {
    //   return -1;
    // }
    // if (a["order"] > b["order"]) {
    //   return 1;
    // }

    // return 0;
  });
  console.log({ test });
  return test;
};
