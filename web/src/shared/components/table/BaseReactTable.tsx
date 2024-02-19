import React from "react";
import PropTypes from "prop-types";
import { useResizeColumns, useFlexLayout } from "react-table";
import ReactTable from "./components/ReactTable";
interface TableConfig {
  isEditable?: Boolean;
  isResizable?: Boolean;
  isSortable?: Boolean;
  withDragAndDrop?: Boolean;
  withPagination?: Boolean;
  withSearchEngine?: Boolean;
  manualPageSize?: number[];
}

interface Column {
  key: String;
  name: String;
}

interface BaseReactTableProps {
  tableConfig: TableConfig;
  columns: Column[];
  data: any[];
  updateData: Function;
  defaultColumn: any[];
}
const BaseReactTable = ({
  tableConfig,
  columns,
  data,
  defaultColumn,
  updateData,
}) => {
  const {
    isEditable,
    isResizable,
    isSortable,
    withDragAndDrop,
    withPagination,
    withSearchEngine,
    manualPageSize,
  } = tableConfig;
  let arrayForTable: any = [
    {
      columns,
      data,
      updateData,
      defaultColumn,
      isEditable: () => {},
      withDragAndDrop: withDragAndDrop || false,
      dataLength: data.length,
      autoResetPage: false,
      disableSortBy: !isSortable,
      manualSortBy: !isSortable,
      manualGlobalFilter: !withSearchEngine,
      manualPagination: !withPagination,
      initialState: {
        pageIndex: 0,
        pageSize: manualPageSize ? manualPageSize[0] : 10,
      },
    },
  ];

  if (isResizable && !withDragAndDrop) {
    arrayForTable.push(useFlexLayout, useResizeColumns);
  }

  return <ReactTable tableConfig={tableConfig} arrayForTable={arrayForTable} />;
};

// BaseReactTable.propTypes = {
//   tableConfig: PropTypes.shape({
//     isEditable: PropTypes.bool,
//     isResizable: PropTypes.bool,
//     isSortable: PropTypes.bool,
//     withDragAndDrop: PropTypes.bool,
//     withPagination: PropTypes.bool,
//     withSearchEngine: PropTypes.bool,
//     manualPageSize: PropTypes.arrayOf(PropTypes.number),
//   }),
//   columns: PropTypes.arrayOf(
//     PropTypes.shape({
//       key: PropTypes.string,
//       name: PropTypes.string,
//     })
//   ),
//   data: PropTypes.arrayOf(PropTypes.shape()),
//   updateData: PropTypes.func,
//   defaultColumn: PropTypes.oneOfType([
//     PropTypes.any,
//     PropTypes.shape({
//       Cell: PropTypes.func,
//     }).isRequired,
//   ]),
// };

export default BaseReactTable;
