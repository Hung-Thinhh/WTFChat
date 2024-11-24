import React from 'react';
import ChatDataContext from '../Context/ChatContext';
import { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
const ChatDataProvider = ({ children }) => {
    const [currUser, setCurrUser] = useState(null);
    const [ChatData, setChatData] = useState('');
    const [RoomInfo, setRoomInfo] = useState('');
    const [listStatus, setlistStatus ]= useState('');
    // const theme = useSelector((state) => state.theme.theme);
    // useEffect(() => {
    //     document.body.dataset.theme = theme;
    // }, [theme]);
    return (
        <ChatDataContext.Provider value={{ ChatData, currUser, RoomInfo,listStatus, setlistStatus, setCurrUser, setChatData, setRoomInfo }}>
            {children}
        </ChatDataContext.Provider>
    );
};

export default ChatDataProvider;
