import { timePassed } from "lib/function/formatTime";
import React, { useContext, useEffect, useState, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import styles from "./RightSidebar.module.scss";
import classNames from "classnames/bind";
import Footer from "./Footer";
import ChatRoom from "./ChatRoom";
import ChatDataContext from 'lib/Context/ChatContext';
import getChatRoom from "services/getchatroom";
import FriendItem from "./FriendItem";
import Search from "./Footer/Search";
const cx = classNames.bind(styles);
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

    useEffect(() => {
        fetchChatRoom();
    }, [fetchChatRoom]);

    const sampleFriend = [
        {
            id: 1,
            first_name: "John",
            last_name: "Doe",
            avt: "https://media.decentralized-content.com/-/rs:fit:1920:1920/aHR0cHM6Ly9tYWdpYy5kZWNlbnRyYWxpemVkLWNvbnRlbnQuY29tL2lwZnMvYmFmeWJlaWJ5bGRqZ2pydWFraGZjNXlybHRibjVzYmx6Y2UzdzNneXlxd3JkcW5zbzdxb3V0eXhlZXE",
            last_message_time: new Date().toISOString(),
            last_message_content: "Hello, how are you?"
        },
        {
            id: 2,
            first_name: "Jane",
            last_name: "Smith",
            avt: "https://media.decentralized-content.com/-/rs:fit:1920:1920/aHR0cHM6Ly9tYWdpYy5kZWNlbnRyYWxpemVkLWNvbnRlbnQuY29tL2lwZnMvYmFmeWJlaWJ5bGRqZ2pydWFraGZjNXlybHRibjVzYmx6Y2UzdzNneXlxd3JkcW5zbzdxb3V0eXhlZXE",
            last_message_time: new Date().toISOString(),
            last_message_content: "Are we still on for tomorrow?"
        }
    ];

    if (!currUser) return null;
    return (
        <div className={cx('rightsidebar')}>
            <div className={cx('me-auto', 'list_nav')}>
                <div className={cx('sidebar_header')}>
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
                            return sampleFriend && sampleFriend.length > 0 ? (
                                sampleFriend.map((friend) => (
                                    <FriendItem
                                        key={friend.id}
                                        id={friend.id}
                                        name={`${friend.first_name} ${friend.last_name}`}
                                        avt={friend.avt}
                                        time={timePassed(friend.last_message_time)}
                                        mess={friend.last_message_content}
                                    />
                                ))
                            ) : (
                                <div>寂し犬</div>
                            );
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