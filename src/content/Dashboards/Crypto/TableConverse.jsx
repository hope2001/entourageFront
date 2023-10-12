// Import React and other necessary dependencies
import React, { useMemo, useRef, useState, useEffect } from 'react';

import CollapsibleText from '@/components/Custom/CollapsText';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
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
function Table_Converse({ dashData }) {
  // Use the usePagination hook to paginate the data
  const [show, setShow] = useState(false);
  const [mdata, setMdata] = useState({});
  const { currentPage, totalPages, paginatedData, setCurrentPage } = usePagination(dashData?.conversesstats?.converses.reverse(), 10);

  // Render the table header
  const renderTableHeader = () => {

    return (
      <thead>
        
            {/* {JSON.stringify(dashData.conversesstats.converses)} */}
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">query</th>
          <th scope="col">Answer</th>
          <th scope="col">Status</th>
          <th scope="col">Reason</th>
        </tr>
      </thead>
    );
  };

  // Render the table body
  const renderTableBody = (show, setShow, setMdata) => {
const itdata = (item)=>{
  setMdata(item)
    setShow(!show)


}
    return (
      <tbody>
        {paginatedData?.map((item, index) => (
            <tr onClick={()=> itdata(item)} key={index} >
            <th  scope="row"> {index + 1} </th>
            <td> {item.user_name} </td>
            <td> {item.query} </td>
            <td> {item.created_at.split('T')[0]} </td>
            <td> {item.isliked ? <span className="btn btn-sm btn-success">Liked <i className="bi bi-hand-thumbs-up-fill"></i> </span> : item.isliked == false ? <span className="btn btn-sm btn-danger">Disliked <i className="bi bi-hand-thumbs-down-fill"></i> </span> : <span></span> } </td>
            <td> {item.raison} </td>
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
        Conversation List
    </h3>
        <table className="table table-hover">
          {renderTableHeader()}
          {renderTableBody(show, setShow, setMdata)}
        </table>
      {renderPaginationButtons()}
      </div>
      <Modaldata show={show} setShow={setShow} mdata={mdata} />
    </div>
  );
}

export default Table_Converse;





function Modaldata({show, setShow, mdata}) {
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    // const data = JSON.parse(mdata.answer)
    const [detail, setDetails] = useState({});
    useEffect(() => {
      // let answers = mdata?.answer
      // const parsedJson = JSON.parse(answers);
      // alert(parsedJson.bot_response)
     let list = {}
     let list1 = []
     list.name = mdata?.user_name
     list.query = mdata?.query
     list.answer = mdata.answer
    //  list.answer = JSON.parse(mdata.answer)
     list.isliked = mdata?.isliked
     list.raison = mdata?.raison
     setDetails(list)
    }, [mdata])
    
    return (
      <>
        {/* <Button variant="primary" onClick={handleShow}>
          Launch demo modal
        </Button> */}
  
        <Modal size="lg" show={show} onHide={handleClose} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>Details</Modal.Title>
          </Modal.Header>
          {/* {JSON.stringify(mdata)} }*/}
          {/* <CollapsibleText className="px-3 mx-3" text={detail.answer?.bot_response} />  */}
 <Modal.Body className="">
          <div className="container-fluid" style={{fontSize:"14px"}}>
            <div className="row my-1">
            <strong>Name: </strong> <span> {detail.name} </span> 
            </div>
            <div className="row my-2">
            <strong>Question: </strong> <span> {detail.query} </span> 
            </div>
            <div className="row my-2">
            <strong>Answer: </strong> <span  style={{ whiteSpace: 'break-spaces', lineHeight: "1.8rem", fontSize: "12px" }}  className="p-2 bg- text-dark"> {detail.answer}  </span> 
            {/* <strong>Answer: </strong> <span> <CollapsibleText className="px-3 mx-3" text={detail.answer?.bot_response} />  </span>  */}
            </div>
            <div className="row my-2">
            <strong>Status: </strong> <span> {detail?.isliked ? "liked": "Disliked"} </span> 
            </div>
           {<div className="row my-2">
            <strong>Reason: </strong> <span> {detail?.raison} </span> 
            </div>}
                     {/* <div className="row my-3">
              <h4 className="col-md-12 text-center"> {data?.Full_name}  <a rel="noreferrer" href={data?.Linkedin} target="_blank"><i className="bi bi-linkedin text-primary"></i></a>  </h4>
            { data?.Email? <h6 className="col-md-12 text-center text-dark ">   <a style={{textDecoration:"none", color:"gray"}} rel="noreferrer" href={'mailto:'+data?.Email} target="_blank"> {data?.Email} </a>  </h6> : <span></span>}
              </div>
            <div className="row text-cente p-2">
              <div className="col-md-4 d-flex flex-column"> <span>Country</span> <strong>{data?.Country ||"N.A"}</strong>  </div>
              
              <div className="col-md-4 d-flex flex-column"> 
              <span>Cohort</span> 
             {data?.Cohort.length>1 ?  <strong > 
                {data.Cohort}
                </strong>:
                <span>N.A</span> }
              </div>

              <div className="col-md-4 d-flex flex-column"> 
              <span>Postion</span> 
             {data?.Position.length>1 ?  <strong > 
                {data.Position}
                </strong>:
                <span>N.A</span> }
              </div>

 <div className="my-2"></div>
              <div className="col-md-8 d-flex flex-column"> <span> Area of Expertise </span> <strong>{data?.Area_of_Expertise ||"N.A"}</strong>  </div>
              </div>
              <div className="row p-2 my-4">
                  <strong className="">Bio</strong>
                <div className="col ">
                  <div style={{ whiteSpace: 'break-spaces', lineHeight: '1.2rem', textAlign:"justify" }} className="">
                  {data?.Biography ||"N.A"}
                  </div>
                </div>
              </div>*/}
          </div>
        </Modal.Body> 
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }





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