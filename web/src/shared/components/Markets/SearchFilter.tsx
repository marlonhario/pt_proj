import React from "react";
import { useAsyncDebounce } from "react-table";
import { Input, CustomInput } from "reactstrap";

export const Filter = ({ column, onSearchMarketData }) => {
  return (
    <div style={{ marginTop: 5 }}>
      {column.canFilter && column.render("Filter")}
    </div>
  );
};

function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
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

export function DefaultColumnFilter({
  column: {
    filterValue,
    setFilter,
    preFilteredRows: { length },
  },
}) {
  const count = length;
  const [value, setValue] = React.useState(filterValue);
  const onChange = useAsyncDebounce((value) => {
    setFilter(value || undefined);
  }, 200);
  return (
    <Input
      value={value}
      onChange={(e) => {
        setValue(e.target.value);

        onChange(e.target.value);
      }}
      name="test-column-filter"
      placeholder={`Search (${length}) ...`}
    />
  );
}

export const SelectColumnFilter = ({
  column: { filterValue, setFilter, preFilteredRows, id },
}) => {
  const options = React.useMemo(() => {
    const options: any = new Set();
    preFilteredRows.forEach((row) => {
      options.add(row.values[id]);
    });
    return [...options.values()];
  }, [id, preFilteredRows]);

  return (
    <CustomInput
      id="custom-select"
      type="select"
      value={filterValue}
      onChange={(e) => {
        setFilter(e.target.value || undefined);
      }}
    >
      <option value="">All</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </CustomInput>
  );
};
