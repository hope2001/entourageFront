// context/state.js
import React, { createContext, useState } from "react";

export const ChatContext = createContext();

export const ChatWrapper = ({ children }) => {
  const [newChat, setnewChat] = useState(false);
  const [changeHistory, setchangeHistory] = useState(false);
  const [discussId, setdiscussId] = useState(null)
  const [fromHistory, setfromHistory] = useState([])

  return (
    <ChatContext.Provider value={{ newChat, setnewChat, discussId,setdiscussId ,fromHistory, setfromHistory,changeHistory, setchangeHistory}}>
      {children}
    </ChatContext.Provider>
  );
};
