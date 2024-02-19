import React from "react";
import { useTable } from "react-table";
import { Table } from "reactstrap";

function ReactTable({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  });

  // Render the UI for your table
  return (
    // <Table {...getTableProps()}>
    //   <thead>
    //     {headerGroups.map(headerGroup => (
    //       <tr {...headerGroup.getHeaderGroupProps()}>
    //         {headerGroup.headers.map(column => (
    //           <th {...column.getHeaderProps()}>{column.render('Header')}</th>
    //         ))}
    //       </tr>
    //     ))}
    //   </thead>
    //   <tbody {...getTableBodyProps()}>
    //     {rows.map((row, i) => {
    //       prepareRow(row)
    //       console.log(row)
    //       return (
    //         <tr {...row.getRowProps()}>
    //           {row.cells.map(cell => {
    //             return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
    //           })}
    //         </tr>
    //       )
    //     })}
    //   </tbody>
    // </Table>
    <Table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Step 1</th>
          <th>Step 2</th>
          <th>Step 3</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => {
          return (
            <tr>
              <th>{item.id}</th>
              <th>
                <ul>
                  {JSON.parse(item.step1).map((item) => {
                    return <li>{item}</li>;
                  })}
                </ul>
              </th>
              <th>
                <ul>
                  {JSON.parse(item.step2).map((item) => {
                    return <li>{item}</li>;
                  })}
                </ul>
              </th>
              <th>
                <ul>
                  {JSON.parse(item.step3).map((item) => {
                    return <li>{item}</li>;
                  })}
                </ul>
              </th>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

function App(data) {
  const columns = React.useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "Steps 1",
        accessor: "step1",
      },
      {
        Header: "Steps 2",
        accessor: "step2",
      },
      {
        Header: "Steps 3",
        accessor: "step3",
      },
    ],
    []
  );

  if (data.length === 0) {
    return <>...</>;
  }

  console.log({ data });
  return (
    <>
      <ReactTable columns={columns} data={data.data} />
    </>
  );
}

export default App;
