import React from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Table, FormGroup, Label, Input } from "reactstrap";
import { useTable } from "react-table";
import MenuIcon from "mdi-react/MenuIcon";
import update from "immutability-helper";

interface Props {
  data: any;
}

const CustomTable = ({
  records,
  columns,
  setRecords,
  setRowVisiblity,
  setBackmarketTargetSetting,
}) => {
  const getRowId = React.useCallback((row) => {
    return row.id;
  }, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  }: any = useTable({
    data: records,
    columns,
    getRowId,
  });

  const moveRow = (dragIndex, hoverIndex) => {
    const dragRecord = records[dragIndex];
    setRecords(
      update(records, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragRecord],
        ],
      })
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Table striped responsive {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
              <th></th>
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(
            (row, index) =>
              prepareRow(row) || (
                <Row
                  index={index}
                  setRowVisiblity={setRowVisiblity}
                  row={row}
                  setBackmarketTargetSetting={setBackmarketTargetSetting}
                  moveRow={moveRow}
                  {...row.getRowProps()}
                />
              )
          )}
        </tbody>
      </Table>
    </DndProvider>
  );
};

const DND_ITEM_TYPE = "row";

const Row = ({
  row,
  index,
  moveRow,
  setRowVisiblity,
  setBackmarketTargetSetting,
}) => {
  const dropRef = React.useRef(null);
  const dragRef = React.useRef(null);

  const [, drop] = useDrop({
    accept: DND_ITEM_TYPE,
    hover(item: any, monitor) {
      if (!dropRef.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = dropRef.current.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action
      moveRow(dragIndex, hoverIndex);
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag, preview] = useDrag({
    item: { type: DND_ITEM_TYPE, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;

  preview(drop(dropRef));
  drag(dragRef);

  return (
    <tr ref={dropRef} style={{ opacity }}>
      {row.cells.map((cell) => {
        console.log("cell", cell);
        console.log("getCell", cell.render("Cell"));
        if (cell.column.Header === "Target Value") {
          return (
            <td {...cell.getCellProps()}>
              <FormGroup>
                <Input
                  type="number"
                  name="target-value"
                  placeholder="Target Value"
                  value={cell.value}
                  onChange={(e) => {
                    let newValue = {
                      targetValue: e.target.value,
                    };
                    setBackmarketTargetSetting(row, newValue);
                  }}
                />
              </FormGroup>
            </td>
          );
        }
        if (cell.column.Header === "Visible") {
          return (
            <td {...cell.getCellProps()}>
              <FormGroup check>
                <Label check>
                  <Input
                    type="checkbox"
                    checked={cell.value}
                    onChange={() => setRowVisiblity(row)}
                  />{" "}
                </Label>
              </FormGroup>
            </td>
          );
        }
        if (cell.column.Header === "Target Setting") {
          console.log("cell.value", cell.value);
          return (
            <td {...cell.getCellProps()}>
              <FormGroup>
                {/* <Label for="exampleSelect">Select</Label> */}
                <Input
                  type="select"
                  name="select"
                  value={cell.value}
                  onChange={(e) => {
                    let newValue = {
                      setting: e.target.value,
                    };
                    setBackmarketTargetSetting(row, newValue);
                  }}
                >
                  <option value={"GREATER"}>&gt;= {"               "}</option>
                  <option value="LESSER">&lt;= {"               "}</option>
                </Input>
              </FormGroup>
            </td>
          );
        }
        return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
      })}
      <td ref={dragRef} className="drag-icon">
        <MenuIcon />
      </td>
    </tr>
  );
};

export const DesignBackTestDnD: React.FC<Props> = ({ data }) => {
  console.log("backtest", { data });
  const columns = React.useMemo(
    () => [
      {
        Header: "Visible",
        accessor: "visible",
      },
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Value",
        accessor: "value",
      },
      {
        Header: "Target Setting",
        accessor: "setting",
      },
      {
        Header: "Target Value",
        accessor: "targetValue",
      },
    ],
    []
  );

  return (
    <CustomTable
      records={data}
      columns={columns}
      setRecords={columns}
      setRowVisiblity={columns}
      setBackmarketTargetSetting={columns}
    />
  );
};
