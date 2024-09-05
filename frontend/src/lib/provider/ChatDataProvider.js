import React from "react";
import ChatDataContext from "../Context/ChatContext";
import { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
const ChatDataProvider = ({ children }) => {
  const [ChatData, setChatData] = useState("");
  const theme = useSelector((state) => state.theme.theme);
    useEffect(() => {
      document.body.dataset.theme = theme;
    }, [theme]);
    return (
      <ChatDataContext.Provider value={{ ChatData, setChatData }}>
        {children}
      </ChatDataContext.Provider>
    );
  };
  
  export default ChatDataProvider;