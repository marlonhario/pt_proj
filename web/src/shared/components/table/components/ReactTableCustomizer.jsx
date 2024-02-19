import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Row, Collapse } from 'reactstrap';
import DownIcon from 'mdi-react/ChevronDownIcon';

const TableCustomizerToggle = ({
  text, checked, handleClick,
}) => (
  <label className="toggle-btn table__toggle" htmlFor={`${text}_toggle`}>
    <input
      className="toggle-btn__input"
      type="checkbox"
      name={`${text}_toggle`}
      id={`${text}_toggle`}
      defaultChecked={checked}
      onClick={handleClick}
    />
    <span className="toggle-btn__input-label table__toggle" />
    <span className="pagination__item pagination-info">{text}</span>
  </label>
);

TableCustomizerToggle.propTypes = {
  text: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
};

const TableCustomizer = ({
  handleClickIsSortable, handleClickWithPagination, handleClickWithSearchEngine,
  isSortable, withPagination, withSearchEngine,
}) => {
  const [collapse, setCollapse] = useState(false);

  const handleOpen = () => {
    setCollapse(!collapse);
  };

  return (
    <Row className="react-table__customizer">
      <div className="table__collapse">
        <button className="table__btn" type="button" onClick={handleOpen}>
          <h5>Table customizer</h5>
          <DownIcon className="table__icon" />
        </button>
        {collapse && <button className="table__collapse-back" type="button" onClick={handleOpen} />}
        <Collapse
          isOpen={collapse}
          className="table__collapse-content"
        >
          <div className="table__collapse-title-wrap">
            <p>This customizer allows you to see the different variations of the data table.</p>
          </div>
          <div className="table__collapse-item">
            <TableCustomizerToggle
              text="Filtration mode"
              handleClick={handleClickWithSearchEngine}
              checked={withSearchEngine}
            />
            <TableCustomizerToggle
              text="Sortable mode"
              handleClick={handleClickIsSortable}
              checked={isSortable}
            />
            <TableCustomizerToggle
              text="Pagination mode"
              handleClick={handleClickWithPagination}
              checked={withPagination}
            />
          </div>
        </Collapse>
      </div>
    </Row>
  );
};

TableCustomizer.propTypes = {
  handleClickIsSortable: PropTypes.func.isRequired,
  handleClickWithPagination: PropTypes.func.isRequired,
  handleClickWithSearchEngine: PropTypes.func.isRequired,
  isSortable: PropTypes.bool.isRequired,
  withPagination: PropTypes.bool.isRequired,
  withSearchEngine: PropTypes.bool.isRequired,
};

export default TableCustomizer;
