import React from "react";
import { Input } from "reactstrap";

export const SearchInput = ({
  search,
  placeholder = "search",
  initialValue = "",
}) => {
  const [value, setValue] = React.useState(initialValue);
  const onChange = (item) => {
    // setGlobalFilter(item || undefined);
    // handleFilter(item || undefined);
    // search(item);
  };

  return (
    <div className="table__search">
      <Input
        className="table__search table__search-input"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          //   onChange(e.target.value);
        }}
        onKeyPress={(e) => {
          if (e.key === "Enter" && value.length !== 0) {
            search(value);
          }
        }}
        placeholder={`${placeholder}`}
      />
      {/* {dataLength !== rows.length && <span>Found {rows.length} matches</span>} */}
    </div>
  );
};
