import React from "react";

const ChatDataContext = React.createContext({
  Cur_data:"",
  setChatData: () => {}, 
});
  
  export default ChatDataContext;