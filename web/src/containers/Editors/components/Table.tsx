import React from "react";
import { Card, CardBody, Col, Table } from "reactstrap";

interface ChildrenProps {
  children: React.ReactNode;
}

export const TableTitle: React.FC<ChildrenProps> = ({ children }) => {
  return <div className="card__title">{children}</div>;
};

export const TableTitleText: React.FC<ChildrenProps> = ({ children }) => {
  return (
    <tr>
      <th className="bold-text">{children}</th>
    </tr>
  );
};

export const TableTitleSubText: React.FC<ChildrenProps> = ({ children }) => {
  return (
    <h5 className="subhead">
      {children}
      {/* Use default table with property{" "}
          <span className="red-text">striped</span> */}
    </h5>
  );
};

interface DataTypes {
  name: string;
  value: number | string;
  visible: boolean;
  targetValue?: number;
  setting?: string;
}

interface CardTableProps {
  data: DataTypes[];
  children: React.ReactNode;
}
export const CardTable: React.FC<CardTableProps> = ({ data, children }) => (
  <Col sm={12}>
    <Card key={Math.random()}>
      <CardBody>
        {children}
        <Table striped responsive>
          <tbody>
            {data.map((row) => {
              if (row.targetValue && row.setting && row.visible) {
                if (row.setting === "LESSER") {
                  if (row.value < row.targetValue) {
                    return (
                      <tr key={Math.random()}>
                        <td>{row.name}</td>
                        <td className="marketoutput-green">{row.value}</td>
                      </tr>
                    );
                  } else {
                    return (
                      <tr key={Math.random()}>
                        <td>{row.name}</td>
                        <td className="marketoutput-red">{row.value}</td>
                      </tr>
                    );
                  }
                } else {
                  if (row.value > row.targetValue) {
                    return (
                      <tr key={Math.random()}>
                        <td>{row.name}</td>
                        <td className="marketoutput-green">{row.value}</td>
                      </tr>
                    );
                  } else {
                    return (
                      <tr key={Math.random()}>
                        <td>{row.name}</td>
                        <td className="marketoutput-red">{row.value}</td>
                      </tr>
                    );
                  }
                }
              }

              if (row.visible) {
                return (
                  <tr key={Math.random()}>
                    <td>{row.name}</td>
                    <td>{row.value}</td>
                  </tr>
                );
              }
              return <tr />;
            })}
          </tbody>
        </Table>
      </CardBody>
    </Card>
  </Col>
);

// ColoredStringTable.propTypes = {
//   t: PropTypes.func.isRequired,
// };

// export default ColoredStringTable;
