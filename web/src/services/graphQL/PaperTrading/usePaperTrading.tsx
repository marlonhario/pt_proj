import React from "react";
import { getAccessToken } from "../../../accessToken";
import { useGetPaperTradingByIdQuery } from "../../../generated/graphql";

const usePaperTrading = () => {
  const token = getAccessToken();
  const { data, loading, refetch } = useGetPaperTradingByIdQuery({
    variables: {
      data: { token },
    },
  });
  const [paperList, setPaperList] = React.useState<any>({});

  let paperLists: any = [];
  let cumul: number = 0;
  let paper_count: number = 0;

  let id = [];
  let sourceId = [];
  let sourceParent = [];
  let sourceParent1 = [];

  let items = {
    board: {
      id: "board",
      isExpanded: true,
      children: id,
      data: {
        title: "Dashboard",
      },
    },
  };

  let results = {};

  if (loading) {
    paperLists = [];
  } else if (data && data.getPaperTradingById) {
    if (typeof data == "object") {
      if (data.hasOwnProperty("getPaperTradingById")) {
        paperLists = data.getPaperTradingById.paper_trading[0]?.strategies;
        cumul = data.getPaperTradingById.paper_trading[0]?.cumul_return;
        paper_count = paperLists?.length;

        if (paperLists !== undefined) {
          paperLists.map((item, index: number) => {
            let isp = item.source_parent == 0 ? 0 : item.source_parent;

            if (isp == null) {
              id.push(item.id);
            } else {
              if (!id.includes(`group_paper_trading_${isp}`)) {
                id.push(`group_paper_trading_${isp}`);
              }
            }

            items[item.id] = {
              id: item.id,
              isExpanded: false,
              children: [],
              data: {
                title: `${index} Sample ${item.source}  ${item.id}`,
              },
              source: item.source,
              paper_id: item.id,
            };

            if (isp != null) {
              if (!sourceParent.includes(item.source_parent)) {
                sourceParent.push(item.source_parent);
              }

              sourceId.push(`${item.source}`);
              sourceParent1.push({
                source_parent: item.source_parent,
                source: item.source,
                item_id: item.id,
              });
            }
          });
        }

        sourceParent.map((item, index) => {
          let grp_id = [];
          let grp_source = [];
          sourceParent1.map((value) => {
            if (value.source_parent === item) {
              grp_id.push(value.item_id);
              grp_source.push(value.source);
            }
          });

          const src = grp_source[index] + "." + item;

          items[`group_paper_trading_${item}`] = {
            children: Object.values(grp_id),
            data: { title: "The Best Bundle" },
            id: `group_paper_trading_${item}`,
            isExpanded: true,
            source: Number(src),
          };
        });

        results = {
          rootId: "board",
          items: items,
        };
      }
    }
  }

  React.useEffect(() => {
    if (results) {
      setPaperList(results);
    }
  }, [data]);

  return {
    paperList: paperList ? paperList : null,
    cumul,
    paper_count,
    refetch,
    setPaperList,
  };
};

export default usePaperTrading;
