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
import getFriendList from "services/getFriendList";
const cx = classNames.bind(styles);
const RightSidebar = () => {
    const { currUser } = useContext(ChatDataContext);
    const [chatRoom, setRoomData] = useState([]);
    const [pageState, setPageData] = useState('chat');
    const [friend, setFriend] = useState('chat');

    const fetchChatRoom = useCallback(async () => {
        try {
            const response = await getChatRoom({ id: currUser.id });
            setRoomData(response.DT); // API trả về danh sách phòng chat và tin nhắn mới nhất
        } catch (error) {
            console.error('Error fetching new messages:', error);
        }
    }, [currUser]);
    const fetchFriendList = useCallback(async () => {
        try {
            const response = await getFriendList({ id: currUser.id });
            setFriend(response.DT); // API trả về danh sách bạn bè
        } catch (error) {
            console.error('Error fetching new messages:', error);
        }
    }, [currUser]);

    useEffect(() => {
        fetchChatRoom();
        fetchFriendList();
    }, [fetchChatRoom, fetchFriendList]);

 

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
                            return friend && friend.length > 0 ? (
                                friend.map((friend) => (
                                    <FriendItem
                                        key={friend.id}
                                        id={friend.id}
                                        name={`${friend.first_name} ${friend.last_name}`}
                                        avt={friend.avt}
                                        time={timePassed(friend.last_message_time)}
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

export default RightSidebar;import React, { useContext, useEffect, useState, useCallback } from "react";
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
                            {chatRoom.length > 0 ? (
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
                            ) : (<div>No new messages</div>)}
                        </div>
                }

            </div>
            <Footer sidebar={handleSidebar} />
        </div>
    );
};

export default RightSidebar;