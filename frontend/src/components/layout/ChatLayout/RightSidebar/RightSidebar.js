import React, { useContext, useEffect, useState, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import "./RightSidebar.scss";
import Footer from "./Footer";
import ChatRoom from "./chatRoom";
import ChatDataContext from 'lib/Context/ChatContext';
import getChatRoom from "services/getchatroom";
import { timePassed } from "lib/function/formatTime";
import findUser from "services/findUserService";

const RightSidebar = () => {
    const { currUser } = useContext(ChatDataContext);
    const [chatRoom, setRoomData] = useState([]);
    const [sidebar, setSidebar] = useState(null);
    const [findData, setFindData] = useState([]);

    const handleChange = async (e) => {
        const data = {
            text: e.target.value
        }
        if (data.text === '' || data.text === null || data.text === undefined || !data.text) {
            setFindData([])
            return
        } else {
            const res = await findUser(data)
            setFindData(res.DT)
        }
    }

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
    }, [fetchChatRoom, currUser]);

    const handleSidebar = (value) => {
        if (value === "search") {
            const newSidebarState = sidebar === "search" ? null : "search";
            setSidebar(newSidebarState);
            if (newSidebarState === "search") {
                setRoomData([]);
            } else {
                fetchChatRoom();
            }
        }
    }

    if (!currUser) return null;

    return (
        <div className="rightsidebar">
            <div className="me-auto list_nav">
                <div className="sidebar_header">
                    <FontAwesomeIcon icon={faUser} /> Wtf Chat
                </div>
                {sidebar === "search" ?
                    <input className="search" type="text" placeholder="Search" onChange={handleChange} />
                    :
                    ""
                }
                {
                    sidebar === "search" ?
                        findData && findData.map((item) => (
                            item.loai === 'Người dùng' ?
                                <ChatRoom
                                    key={item.id}
                                    id={item.id}
                                    name={item.firstname + ' ' + item.lastname}
                                    avt={item.avatar}
                                />
                                :
                                <ChatRoom
                                    key={item.id}
                                    id={item.id}
                                    name={item.groupname}
                                    avt={item.avatar}
                                />
                        ))
                        :
                        <div>
                            
                                {chatRoom && chatRoom.length > 0 ? (
                                    chatRoom.map((room) => (
                                        <ChatRoom 
                                            key={room.id} 
                                            id={room.id} 
                                            sender={JSON.parse(room.last_message).idUser !== currUser.id
                                                ? JSON.parse(room.last_message).sender : 'You'} 
                                            name={room.groupName}
                                            avt={room.avt} 
                                            time={timePassed(room.update_time)} 
                                            mess={JSON.parse(room.last_message).content} 
                                        />
                                    ))
                            ) : (<div>No new messages</div>)}
                        </div>
                }

            </div>
            <Footer sidebar={handleSidebar} />
        </div>
    );
};

export default RightSidebar;