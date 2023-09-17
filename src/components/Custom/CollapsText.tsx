import React, { useState } from 'react';

const CollapsibleText = ({ text }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const collapsedText = text.substring(0, 150);
  const fullText = text;

  return (
    <div className="d-flex justify-content-end flex-column">
      {isCollapsed ? collapsedText +"...   ": fullText}
      {text.length > 150 && (
        <button style={{backgroundColor:"#F8EFEA"}} className="btn btn-sm btn-warning mt-2 align-item-start" onClick={() => setIsCollapsed(!isCollapsed)}>
          {isCollapsed ? 'View More' : 'View Less'}
        </button>
      )}
    </div>
  );
};

export default CollapsibleText;
