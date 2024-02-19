import { AnyMxRecord } from "dns";
import React from "react";
import { useAsyncDebounce } from "react-table";
import { Table, Col, Card, CardBody } from "reactstrap";
import { Filter } from "../../../shared/components/Markets/SearchFilter";

interface Props {
  getTableProps: any;
  headerGroups: any;
  generateSortingIndicator: any;
  getTableBodyProps: any;
  page: [];
  prepareRow: any;
  onFetchMarketData?: Function;
  preGlobalFilteredRows: any;
  globalFilter: any;
  setGlobalFilter: AnyMxRecord;
  onSearchMarketData?: Function;
}

function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
  onSearchMarketData,
}) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
    onSearchMarketData(value);
  }, 200);

  return (
    <span>
      Search:{" "}
      <input
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`${count} records...`}
        style={{
          fontSize: "1.1rem",
          border: "0",
        }}
      />
    </span>
  );
}

export const MarketTable: React.FC<Props> = ({
  getTableProps,
  headerGroups,
  generateSortingIndicator,
  getTableBodyProps,
  page,
  prepareRow,
  onFetchMarketData,
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
  onSearchMarketData,
}) => {
  return (
    <Col md={12}>
      <Card>
        <CardBody>
          <Table bordered hover {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup: any) => (
                <tr
                  {...headerGroup.getHeaderGroupProps()}
                  style={{ display: "contents" }}
                >
                  {headerGroup.headers.map((column: any) => (
                    <th {...column.getHeaderProps()}>
                      <div {...column.getSortByToggleProps()}>
                        {column.render("Header")}
                        {generateSortingIndicator(column)}
                      </div>
                      <Filter
                        column={column}
                        onSearchMarketData={onSearchMarketData}
                      />
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map((row: any) => {
                prepareRow(row);
                return (
                  <tr
                    key={row.getRowProps().key}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      let { id, exchange, name, symbol } = row.original;

                      if (onFetchMarketData) {
                        onFetchMarketData({
                          marketId: id,
                          symbol: symbol,
                          interval: "15min",
                        });
                      }
                    }}
                  >
                    {row.cells.map((cell: any) => {
                      return (
                        <td key={cell.getCellProps().key}>
                          {cell.render("Cell")}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </Col>
  );
};

export default MarketTable;
