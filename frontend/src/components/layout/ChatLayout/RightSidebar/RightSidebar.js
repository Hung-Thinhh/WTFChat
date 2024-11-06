import React, { useContext, useEffect, useState, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import "./RightSidebar.scss";
import Footer from "./Footer";
import ChatRoom from "./chatRoom";
import ChatDataContext from 'lib/Context/ChatContext';
import getChatRoom from "services/getchatroom";
import { timePassed } from "lib/function/formatTime";
import Search from "./Footer/Search";

const RightSidebar = () => {
    const { currUser } = useContext(ChatDataContext);
    const [chatRoom, setRoomData] = useState([]);
    const [pageState, setPageData] = useState('chat');

    const fetchChatRoom = useCallback(async () => {
        try {
            const response = await getChatRoom({ id: currUser.id });
            setRoomData(response.DT); // API trả về danh sách phòng chat và tin nhắn mới nhất
        } catch (error) {
            console.error('Error fetching new messages:', error);
        }
    }, [currUser]);

    // useEffect(() => {
    //     fetchChatRoom();
    // }, [fetchChatRoom]);
    // Sample chat room data
    const sampleChatRoomData = [
        {
            id: 1,
            first_name: "John",
            last_name: "Doe",
            avt: "path/to/avatar1.jpg",
            last_message_time: new Date().toISOString(),
            last_message_content: "Hello, how are you?"
        },
        {
            id: 2,
            first_name: "Jane",
            last_name: "Smith",
            avt: "path/to/avatar2.jpg",
            last_message_time: new Date().toISOString(),
            last_message_content: "Are we still on for tomorrow?"
        }
    ];

    useEffect(() => {
        setRoomData(sampleChatRoomData);
    }, []);
    if (!currUser) return null;
    return (
        <div className="rightsidebar">
            <div className="me-auto list_nav">
                <div className="sidebar_header">
                    <FontAwesomeIcon icon={faUser} /> Wtf Chat
                </div>
                {(() => {
                    switch (pageState) {
                        case 'chat':
                            return chatRoom && chatRoom.length > 0 ? (
                                chatRoom.map((friend) => (
                                    <ChatRoom
                                        key={friend.id}
                                        id={friend.id}
                                        name={`${friend.first_name} ${friend.last_name}`}
                                        avt={friend.avt}
                                        time={timePassed(friend.last_message_time)}
                                        mess={friend.last_message_content}
                                    />
                                ))
                            ) : (
                                <div>No new messages</div>
                            );
                        case 'friend':
                            return <div style={{ color: 'white' }}>Friend Page</div>;
                        case 'search':
                            return <Search></Search>;
                        case 'archive':
                            return <div style={{ color: 'white' }}>Archive Page</div>;
                        default:
                            return null;
                    }
                })()}
            </div>
            <Footer key={pageState} pageState={pageState} setPageData={setPageData} />
        </div>
    );
};

export default RightSidebar;