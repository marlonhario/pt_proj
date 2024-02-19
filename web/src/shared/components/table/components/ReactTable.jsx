import React from "react";
import PropTypes from "prop-types";
import {
  useTable,
  useGlobalFilter,
  usePagination,
  useSortBy,
  useRowSelect,
} from "react-table";
import ReactTableHeader from "./ReactTableHeader.jsx";
import BodyReactTable from "./ReactTableBody.jsx";
import ReactTableFooter from "./ReactTableFooter.jsx";
import ReactTableFilter from "./ReactTableFilter.jsx";
import ReactTablePagination from "./ReactTablePagination.jsx";

const ReactTable = ({ tableConfig, arrayForTable }) => {
  const {
    isEditable,
    isResizable,
    isSortable,
    withSearchEngine,
    manualPageSize,
    placeholder,
    withPagination,
  } = tableConfig;
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    state,
    rows,
    prepareRow,
    page,
    pageCount,
    pageOptions,
    gotoPage,
    previousPage,
    canPreviousPage,
    nextPage,
    canNextPage,
    setPageSize,
    setGlobalFilter,
    withDragAndDrop,
    updateData,
    dataLength,
    state: { pageIndex, pageSize },
  } = useTable(
    ...arrayForTable,
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect
  );

  return (
    <div>
      {withSearchEngine && (
        <ReactTableFilter
          globalFilter={state.globalFilter}
          setGlobalFilter={setGlobalFilter}
          placeholder={placeholder}
          rows={rows}
          dataLength={dataLength}
        />
      )}
      <div
        className={
          withPagination
            ? "table react-table"
            : "table react-table table--not-pagination"
        }
      >
        <table
          {...getTableProps()}
          className={
            isEditable ? "editable-table" : "react-table resizable-table"
          }
        >
          <ReactTableHeader
            headerGroups={headerGroups}
            isSortable={isSortable}
            isResizable={isResizable}
          />
          <BodyReactTable
            page={page}
            getTableBodyProps={getTableBodyProps}
            prepareRow={prepareRow}
            updateData={updateData}
            isEditable={isEditable}
            withDragAndDrop={withDragAndDrop}
          />
          {(pageCount === pageIndex + 1 ||
            (!withPagination && rows.length !== 0)) && (
            <ReactTableFooter footerGroups={footerGroups} />
          )}
        </table>
      </div>
      {withPagination && rows.length > 0 && (
        <ReactTablePagination
          page={page}
          gotoPage={gotoPage}
          previousPage={previousPage}
          nextPage={nextPage}
          canPreviousPage={canPreviousPage}
          canNextPage={canNextPage}
          pageOptions={pageOptions}
          pageSize={pageSize}
          pageIndex={pageIndex}
          pageCount={pageCount}
          setPageSize={setPageSize}
          manualPageSize={manualPageSize}
          dataLength={dataLength}
        />
      )}
    </div>
  );
};

ReactTable.propTypes = {
  tableConfig: PropTypes.shape({
    isEditable: PropTypes.bool,
    isResizable: PropTypes.bool,
    isSortable: PropTypes.bool,
    withDragAndDrop: PropTypes.bool,
    withPagination: PropTypes.bool,
    withSearchEngine: PropTypes.bool,
    manualPageSize: PropTypes.arrayOf(PropTypes.number),
    placeholder: PropTypes.string,
  }),
  arrayForTable: PropTypes.arrayOf(
    PropTypes.shape({
      columns: PropTypes.arrayOf(
        PropTypes.shape({
          key: PropTypes.string,
          name: PropTypes.string,
        })
      ),
      data: PropTypes.arrayOf(PropTypes.shape()),
      updateData: PropTypes.func,
      defaultColumn: PropTypes.oneOfType([
        PropTypes.any,
        PropTypes.shape({
          Cell: PropTypes.func,
        }).isRequired,
      ]),
      isEditable: PropTypes.func,
      withDragAndDrop: PropTypes.bool,
      dataLength: PropTypes.number,
      initialState: {
        pageIndex: PropTypes.number,
        pageSize: PropTypes.number,
      },
    })
  ),
};

ReactTable.defaultProps = {
  tableConfig: {
    isEditable: false,
    isResizable: false,
    isSortable: false,
    withDragAndDrop: false,
    withPagination: false,
    withSearchEngine: false,
    manualPageSize: [10, 20, 30, 40],
    placeholder: "Search...",
  },
  arrayForTable: [
    {
      columns: [],
      data: [],
      isEditable: PropTypes.bool,
      updateData: () => {},
      defaultColumn: [],
      withDragAndDrop: false,
      dataLength: null,
      autoResetPage: false,
      disableSortBy: false,
      manualSortBy: false,
      manualGlobalFilter: false,
      manualPagination: false,
      initialState: {
        pageIndex: null,
        pageSize: null,
      },
    },
  ],
};

export default ReactTable;
