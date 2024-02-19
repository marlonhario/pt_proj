import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ReactTableBodyDnD from "./ReactTableBodyDnD";
import { ThemeProps } from "../../../prop-types/ReducerProps";

const DraggableOffBodyReactTable = ({
  page,
  getTableBodyProps,
  prepareRow,
}) => (
  <tbody className="table table--bordered" {...getTableBodyProps()}>
    {page.map((row) => {
      prepareRow(row);
      return (
        <tr {...row.getRowProps()}>
          {row.cells.map((cell) => (
            <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
          ))}
        </tr>
      );
    })}
  </tbody>
);

DraggableOffBodyReactTable.propTypes = {
  page: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  getTableBodyProps: PropTypes.func.isRequired,
  prepareRow: PropTypes.func.isRequired,
};

const ReactTableBody = ({
  page,
  getTableBodyProps,
  prepareRow,
  withDragAndDrop,
  updateData,
  theme,
}) => (
  <>
    {withDragAndDrop ? (
      <ReactTableBodyDnD
        page={page}
        getTableBodyProps={getTableBodyProps}
        prepareRow={prepareRow}
        updateData={updateData}
        theme={theme}
      />
    ) : (
      <DraggableOffBodyReactTable
        page={page}
        getTableBodyProps={getTableBodyProps}
        prepareRow={prepareRow}
      />
    )}
  </>
);

ReactTableBody.propTypes = {
  page: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  getTableBodyProps: PropTypes.func.isRequired,
  prepareRow: PropTypes.func.isRequired,
  updateData: PropTypes.func.isRequired,
  withDragAndDrop: PropTypes.bool.isRequired,
  theme: ThemeProps.isRequired,
};

export default ReactTableBody;
