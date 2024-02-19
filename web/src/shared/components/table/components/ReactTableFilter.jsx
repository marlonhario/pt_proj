import React, { useState } from "react";
import PropTypes from "prop-types";
import { useAsyncDebounce } from "react-table";
import { Input } from "reactstrap";

const ReactTableFilter = ({
  globalFilter,
  setGlobalFilter,
  placeholder,
  rows,
  dataLength,
}) => {
  const [value, setValue] = useState(globalFilter);
  const onChange = useAsyncDebounce((item) => {
    setGlobalFilter(item || undefined);
  }, 200);

  return (
    <div className="table__search">
      <Input
        className="table__search table__search-input"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`${placeholder}`}
      />
      {dataLength !== rows.length && <span>Found {rows.length} matches</span>}
    </div>
  );
};

function filterGreaterThan(rows, id, filterValue) {
  return rows.filter((row) => {
    const rowValue = row.values[id];
    return rowValue >= filterValue;
  });
}
filterGreaterThan.autoRemove = (val) => typeof val !== "number";

ReactTableFilter.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  globalFilter: PropTypes.string,
  setGlobalFilter: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  dataLength: PropTypes.number.isRequired,
};

ReactTableFilter.defaultProps = {
  globalFilter: "",
  placeholder: "Search...",
};

export default ReactTableFilter;
