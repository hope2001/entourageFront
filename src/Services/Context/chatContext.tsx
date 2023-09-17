// context/state.js
import React, { createContext, useState } from "react";

export const ChatContext = createContext<any>();

export const ChatWrapper = ({ children }) => {
  const [newChat, setnewChat] = useState(false);
  const [discussId, setdiscussId] = useState(null)

  return (
    <ChatContext.Provider value={{ newChat, setnewChat, discussId,setdiscussId }}>
      {children}
    </ChatContext.Provider>
  );
};
