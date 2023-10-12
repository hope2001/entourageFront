import React, { useMemo, useRef, useState, useEffect } from 'react';
import { MaterialReactTable } from 'material-react-table';


 function Datatable({dashData}) {
    const [data, setdata] = useState([]);

    useEffect(() => {
        setdata(dashData?.userstat?.user_list)
        //do something when the row selection changes
      }, []);
    
    const data1 = [
      {
        name: 'John',
        age: 30,
      },
      {
        name: 'Sara',
        age: 25,
      },
    ]

    
  const columns = useMemo(
    () => [
      {
        accessorKey: 'name', //simple recommended way to define a column
        header: 'Name',
        muiTableHeadCellProps: { sx: { color: 'green' } }, //optional custom props  
        Cell: ({ cell }) => <span>{cell.getValue()}</span>, //optional custom cell render
      },
      {
        accessorKey: 'email', //simple recommended way to define a column
        header: 'Email',
        muiTableHeadCellProps: { sx: { color: 'green' } }, //optional custom props  
        Cell: ({ cell }) => <span>{cell.getValue()}</span>, //optional custom cell render
      },
      {
        accessorKey: 'created_at', //simple recommended way to define a column
        header: 'Date',
        muiTableHeadCellProps: { sx: { color: 'green' } }, //optional custom props  
        Cell: ({ cell }) => <span>{cell.getValue().split("T")[0]}</span>, //optional custom cell render
      },
      {
        accessorKey: 'is_active', //simple recommended way to define a column
        header: 'Status',
        muiTableHeadCellProps: { sx: { color: 'green' } }, //optional custom props  
        Cell: ({ cell }) => <span>{cell.getValue()} {cell.getValue() ?<span className="btn btn-sm btn-warning">Active</span>:<span className="btn btn-sm btn-dark">Inactive</span> }</span>, //optional custom cell render
      },
    ],
    [],
  );

  //optionally, you can manage any/all of the table state yourself
  const [rowSelection, setRowSelection] = useState({});

//   useEffect(() => {
    
//     //do something when the row selection changes
//   }, [rowSelection]);


  //Or, optionally, you can get a reference to the underlying table instance
  const tableInstanceRef = useRef(null);

  const someEventHandler = () => {
    //read the table state during an event from the table instance ref
    console.log(tableInstanceRef.current.getState().sorting);
  }

  return (<>
  {JSON.stringify(dashData)}
    <MaterialReactTable 
      columns={columns} 
      data={data} 
      enableColumnOrdering //enable some features
      enableRowSelection 
      enablePagination={false} //disable a default feature
      onRowSelectionChange={setRowSelection} //hoist internal state to your own state (optional)
      state={{ rowSelection }} //manage your own state, pass it back to the table (optional)
      tableInstanceRef={tableInstanceRef} //get a reference to the underlying table instance (optional)
    /></>
  );
}

export default Datatable;