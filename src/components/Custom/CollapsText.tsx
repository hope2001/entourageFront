// import React from 'react';

const CollapsibleText = ({ text }) => {
  // const [isCollapsed, setIsCollapsed] = useState(true);

  // const collapsedText = text.substring(0, 300);
  const fullText = text;

  return (
    <div style={{ whiteSpace: 'break-spaces' }} className="d-flex text-dark justify-content-end flex-column">
      { fullText}
    
      
    </div>
  );
};

export default CollapsibleText;
// import React, { useState } from 'react';

// const CollapsibleText = ({ text }) => {
//   const [isCollapsed, setIsCollapsed] = useState(true);

//   const collapsedText = text.substring(0, 300);
//   const fullText = text;

//   return (
//     <div style={{ whiteSpace: 'break-spaces' }} className="d-flex justify-content-end flex-column">
//       {isCollapsed ?  collapsedText +"...    ": fullText}
//       {text.length > 300 && ( <div className="">
//         <span  className="mt-2 text-dar btn btn-sm btn-light " onClick={() => setIsCollapsed(!isCollapsed)}>
//           {isCollapsed ? 'View More' : 'View Less'}
//         </span></div>
//         // <button style={{backgroundColor:"#F8EFEA"}} className="btn btn-sm btn-warning mt-2 align-item-start" onClick={() => setIsCollapsed(!isCollapsed)}>
//         //   {isCollapsed ? 'View More' : 'View Less'}
//         // </button>
//       )}
//     </div>
//   );
// };

// export default CollapsibleText;
