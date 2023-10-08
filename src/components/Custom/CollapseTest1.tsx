import React, { useState } from 'react';

const CollapsibleText1 = ({ text }) => {
  const [isCollapsed] = useState(true);

  const collapsedText = text.substring(0, 300);
  const fullText = text;

  return (
    <div style={{ whiteSpace: 'break-spaces' }} className="d-flex text-dark justify-content-end flex-column">
      {isCollapsed ? collapsedText +"... ": fullText}
      {/* {text.length > 100 && (
        <button style={{backgroundColor:"#F8EFEA"}} className="" onClick={() => setIsCollapsed(!isCollapsed)}>
          {isCollapsed ? 'View More' : 'View Less'}
        </button>
      )} */}
    </div>
  );
};

export default CollapsibleText1;
