import React, { PropsWithChildren, ReactElement } from "react";
import { Col, Card, CardBody, Container, Input } from "reactstrap";
import {
  TableOptions,
  useAsyncDebounce,
  useColumnOrder,
  useExpanded,
  useFilters,
  useFlexLayout,
  useGlobalFilter,
  useGroupBy,
  usePagination,
  useResizeColumns,
  useRowSelect,
  useSortBy,
  useTable,
} from "react-table";
import { DefaultColumnFilter } from "../../../shared/components/Markets/SearchFilter";
import MarketTable from "./MartketTable";
import { MarketPagination } from "./MarketPagination";

export interface MarketCard<T extends object = {}> extends TableOptions<T> {
  columns: any;
  data: any;
  onFetchMarketData?: Function;
  onSearchMarketData?: Function;
  children?: any;
}

function ColumnFilter({
  column: {
    filterValue,
    setFilter,
    preFilteredRows: { length },
  },
  onSearchMarketData,
}) {
  const count = length;
  const [value, setValue] = React.useState(filterValue);
  const onChange = useAsyncDebounce((value) => {
    setFilter(value || undefined);
    // onSearchMarketData(value);
  }, 50);

  const onEnter = () => {
    onSearchMarketData(value);
  };
  return (
    <Input
      value={value}
      onKeyDown={(e) => {
        console.log("e key", e.key);
        if (e.key === "Enter") {
          // onChange(value);
          onSearchMarketData(value);
        }
      }}
      onChange={(e) => {
        setValue(e.target.value);
        onChange(e.target.value);
      }}
      onKeyPress={(e) => {
        if (e.key === "Enter") {
          onEnter();
        }
      }}
      placeholder={`Search (${length}) ...`}
    />
  );
}

export function MarketCard<T extends object>(
  props: PropsWithChildren<MarketCard<T>>
): ReactElement {
  const {
    columns,
    data,
    onFetchMarketData,
    onSearchMarketData,
    children,
  } = props;

  const defaultColumn = {
    Filter: ColumnFilter,
    // Cell: TooltipCell,
    // Header: DefaultHeader,
    // When using the useFlexLayout:
    minWidth: 30,
    width: 150,
    maxWidth: 200,
  };

  const hooks = [
    useGlobalFilter,
    useColumnOrder,
    useFilters,
    useGroupBy,
    useSortBy,
    useExpanded,
    useFlexLayout,
    usePagination,
    useResizeColumns,
    useRowSelect,
  ];

  const instance = useTable<T>(
    {
      ...props,
      columns,
      data,
      defaultColumn,
    },
    ...hooks
  );

  const {
    getTableProps,
    headerGroups,
    getTableBodyProps,
    page,
    prepareRow,
    state: { pageIndex, pageSize, globalFilter },
    previousPage,
    canPreviousPage,
    canNextPage,
    nextPage,
    gotoPage,
    setPageSize,
    pageOptions,
    pageCount,
    preGlobalFilteredRows,
    setGlobalFilter,
  }: any = instance;

  const generateSortingIndicator = (column: any) => {
    return column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : "";
  };

  const onChangeInSelect = (event) => {
    setPageSize(Number(event.target.value));
  };

  const onChangeInInput = (event) => {
    const page = event.target.value ? Number(event.target.value) - 1 : 0;
    gotoPage(page);
  };

  return (
    <Container>
      <Col md={12}>
        <Card>
          <CardBody>
            <Col lg={3}>{children}</Col>
            <MarketTable
              getTableProps={getTableProps}
              onFetchMarketData={onFetchMarketData}
              headerGroups={headerGroups}
              generateSortingIndicator={generateSortingIndicator}
              getTableBodyProps={getTableBodyProps}
              page={page}
              prepareRow={prepareRow}
              preGlobalFilteredRows={preGlobalFilteredRows}
              globalFilter={globalFilter}
              setGlobalFilter={setGlobalFilter}
              onSearchMarketData={onSearchMarketData}
            />
            <MarketPagination
              onChangeInSelect={onChangeInSelect}
              onChangeInInput={onChangeInInput}
              canPreviousPage={canPreviousPage}
              previousPage={previousPage}
              pageIndex={pageIndex}
              pageOptions={pageOptions}
              pageSize={pageSize}
              nextPage={nextPage}
              canNextPage={canNextPage}
              pageCount={pageCount}
              gotoPage={gotoPage}
            />
          </CardBody>
        </Card>
      </Col>
    </Container>
  );
}

export default MarketCard;
