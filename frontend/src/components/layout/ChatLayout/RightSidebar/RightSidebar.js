import React, { useContext, useEffect, useState, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import "./RightSidebar.scss";
import Footer from "./Footer";
import ChatRoom from "./chatRoom";
import ChatDataContext from 'lib/Context/ChatContext';
import getChatRoom from "services/getchatroom";
import { timePassed } from "lib/function/formatTime";

const RightSidebar = () => {
    const { currUser } = useContext(ChatDataContext);
    const [chatRoom, setRoomData] = useState([]);

    const fetchChatRoom = useCallback(async () => {
        try {
            const response = await getChatRoom({ id: currUser.id });
            setRoomData(response.DT); // API trả về danh sách phòng chat và tin nhắn mới nhất
        } catch (error) {
            console.error('Error fetching new messages:', error);
        }
    }, [currUser]);

    useEffect(() => {
        fetchChatRoom();
    }, [fetchChatRoom]);

    if (!currUser) return null;

    return (
        <div className="rightsidebar">
            <div className="me-auto list_nav">
                <div className="sidebar_header">
                    <FontAwesomeIcon icon={faUser} /> Wtf Chat
                </div>
                {chatRoom && chatRoom.length > 0 ? (
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
                )}
            </div>
            <Footer />
        </div>
    );
};

export default RightSidebar;