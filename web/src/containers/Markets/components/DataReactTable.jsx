import React, { useState } from "react";
import PropTypes from "prop-types";
import { Card, CardBody, Col } from "reactstrap";
import BaseReactTable from "../../../shared/components/table/BaseReactTable";
// import TableCustomizer from "../../../shared/components/table/components/ReactTableCustomizer";

const DataTable = ({
  reactTableData,
  title = "Data List",
  // search = undefined,
  children = null,
  filterPlaceholder = "Search...",
  withSearch = true,
}) => {
  const [isSortable] = useState(false);
  const [withPagination] = useState(true);
  const [withSearchEngine] = useState(withSearch);

  const tableConfig = {
    isEditable: false,
    isResizable: false,
    isSortable,
    withPagination,
    withSearchEngine,
    manualPageSize: [50, 10, 25, 50, 100],
    placeholder: filterPlaceholder,
  };

  return (
    <Col md={12} lg={12}>
      <Card>
        <CardBody>
          <div className="react-table__wrapper">
            <div className="card__title">
              <h5 className="bold-text">{title}</h5>
            </div>
          </div>
          {children}
          <BaseReactTable
            columns={reactTableData.tableHeaderData}
            data={reactTableData.tableRowsData}
            tableConfig={tableConfig}
          />
        </CardBody>
      </Card>
    </Col>
  );
};

DataTable.propTypes = {
  withSearch: PropTypes.bool,
  filterPlaceholder: PropTypes.string,
  reactTableData: PropTypes.shape({
    tableHeaderData: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string,
        name: PropTypes.string,
      })
    ),
    tableRowsData: PropTypes.arrayOf(PropTypes.shape()),
    defaultTableHeaderData: PropTypes.arrayOf(PropTypes.shape()),
    defaultTableRowData: PropTypes.arrayOf(PropTypes.shape()),
  }).isRequired,
};

export default DataTable;
