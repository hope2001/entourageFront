// Import React and other necessary dependencies
import React, { useMemo, useRef, useState, useEffect } from 'react';

// Define a custom hook to handle pagination
function usePagination(data, pageSize) {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(data?.length / pageSize);

  const paginatedData = useMemo(() => {
    const start = currentPage * pageSize;
    const end = start + pageSize;
    return data?.slice(start, end);
  }, [currentPage, data, pageSize]);

  return {
    currentPage,
    totalPages,
    paginatedData,
    setCurrentPage,
  };
}

// Define the Table_User component
function Table_User({ dashData }) {
  // Use the usePagination hook to paginate the data
  const { currentPage, totalPages, paginatedData, setCurrentPage } = usePagination(dashData?.userstat?.user_list, 10);

  // Render the table header
  const renderTableHeader = () => {
    return (
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Date</th>
          <th scope="col">Status</th>
        </tr>
      </thead>
    );
  };

  // Render the table body
  const renderTableBody = () => {
    return (
      <tbody>
        {paginatedData?.map((item, index) => (
          <tr key={index}>
            <th scope="row"> {currentPage*10 +index + 1} </th>
            <td> {item.name} </td>
            <td> {item.email} </td>
            <td> {item.created_at.split('T')[0]} </td>
            <td> {item.is_active ? <span className="btn btn-sm btn-warning">Active</span> : <span className="btn btn-sm btn-warning">Inactive</span>} </td>
          </tr>
        ))}
      </tbody>
    );
  };

  // Render the pagination buttons
  const renderPaginationButtons = () => {
    return (
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 0 ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>
              <span className="bi bi-arrow-left"></span>
            </button>
          </li>
          {Array.from({ length: totalPages }, (_, i) => i).map((pageNumber) => (
            <li key={pageNumber} className={`page-item ${currentPage === pageNumber ? 'active' : ''}`}>
              <button className="page-link" onClick={() => setCurrentPage(pageNumber)}>
                {pageNumber + 1}
              </button>
            </li>
          ))}
          <li className={`page-item ${currentPage === totalPages - 1 ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>
            <span className="bi bi-arrow-right"></span>
            </button>
          </li>
        </ul>
      </nav>
    );
  };

  // Render the table
  return (
    <div className="container-fluid">
      <div className="row p-3 bg-light rounded">
    <h3 className="d-flex fw-bold">
        Users List
    </h3>
        <table className="table">
          {renderTableHeader()}
          {renderTableBody()}
        </table>
      {renderPaginationButtons()}
      </div>
    </div>
  );
}

export default Table_User;



// import React, { useMemo, useRef, useState, useEffect } from 'react';


// function Table_User({ dashData }) {
//     const [data, setdata] = useState([]);

//     useEffect(() => {
//         setdata(dashData?.userstat?.user_list.reverse())
//         //do something when the row selection changes
//       }, []);
//     return (
//         <div className="container">
//         <div className="row p-3 bg-light rounded">
//             <table className="table">
//                 <thead>
//                     <tr>
//                         <th scope="col">#</th>
//                         <th scope="col">Name</th>
//                         <th scope="col">Email</th>
//                         <th scope="col">Date</th>
//                         <th scope="col">Status</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {data?.map((item, index)=>(
//                     <tr key={index}>
//                         <th scope="row"> {index+1} </th>
//                         <td> {item.name} </td>
//                         <td> {item.email} </td>
//                         <td> {item.created_at.split("T")[0]} </td>
//                         <td> {item.is_active ?<span className="btn btn-sm btn-warning">Active</span> : <span className="btn btn-sm btn-warning">Inactive</span> } </td>
//                     </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//         </div>
//     )
// }
// export default Table_User