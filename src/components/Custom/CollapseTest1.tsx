import React, { useState } from 'react';

const CollapsibleText1 = ({ text }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const collapsedText = text.substring(0, 100);
  const fullText = text;

  return (
    <div className="d-flex justify-content-end flex-column">
      {isCollapsed ? collapsedText +" view more...   ": fullText}
      {/* {text.length > 100 && (
        <button style={{backgroundColor:"#F8EFEA"}} className="" onClick={() => setIsCollapsed(!isCollapsed)}>
          {isCollapsed ? 'View More' : 'View Less'}
        </button>
      )} */}
    </div>
  );
};

export default CollapsibleText1;
