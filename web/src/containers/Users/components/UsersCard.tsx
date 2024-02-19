import React, { Suspense, useMemo } from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import { UserTable } from './UserTable';
import { Header } from './UserHeader';
import styled from "styled-components";
import { useUsersQuery } from '../../../generated/graphql';

interface Props { }

const StyledTable = styled.table`
  caption-side: top;
  border: none;
  border-collapse: collapse;

  caption-side: bottom;
  td,
  th {
    border: none;
  }
   td,
  th {
    // border: 1px solid;
    text-align: center;
    padding: 12px;
  }

  td {
    padding: 12px 52px;
  }

  tbody tr {
    :nth-of-type(odd) {
      background-color: #efefef;
    }
    :hover {
      background-color: #3399ff;
    }
  }
  thead > tr {
    background-color: #c2c2c2;
  }
  caption {
    font-size: 0.9em;
    padding: 5px;
    font-weight: bold;
  }
`;


export const UsersCard: React.FC<Props> = () => {
  const { data, loading } = useUsersQuery();

  if (loading || !data) {
    return (
      <div className={`load${loading ? '' : ' loaded'}`}>
        <div className="load__icon-wrap">
          <svg className="load__icon">
            <path fill="#4ce1b6" d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z" />
          </svg>
        </div>
      </div>
    );
  }

  return (
    <Col md={12} lg={12}>
      <Card>
        <CardBody className="products-list">
          <StyledTable>
            <UserTable columns={Header} data={data.users}></UserTable>
          </StyledTable>
        </CardBody>
      </Card>
    </Col>
  )
}
