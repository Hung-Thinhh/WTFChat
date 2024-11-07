import { timePassed } from "lib/function/formatTime";
import React, { useContext, useEffect, useState, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import styles from "./RightSidebar.module.scss";
import classNames from "classnames/bind";
import Footer from "./Footer";
import ChatRoom from "./ChatRoomComponent";
import ChatDataContext from 'lib/Context/ChatContext';
import getChatRoom from "services/getchatroom";
import Search from "./Footer/Search";
import getFriendList from "services/getFriendList";
import findUser from "services/findUserService";
import useDebounce from "hooks/useDebounce";
import NewChat from "./NewChat";
const cx = classNames.bind(styles);







const RightSidebar = () => {
    const { currUser } = useContext(ChatDataContext);
    const [chatRoom, setRoomData] = useState([]);
    const [pageState, setPageData] = useState('chat');
    const [friend, setFriend] = useState([]);
    const [findData, setFindData] = useState([]);
    const [searchData, setSearchData] = useState('');
    const [stateNewChatPopUp, setStateNewChatPopUp] = useState(false);
    const handleNewChat = (e) => {
        setStateNewChatPopUp(true)

    };

    // Fetch chat room
    const fetchChatRoom = useCallback(async () => {
        try {
            const response = await getChatRoom({ id: currUser.id });
            setRoomData(response.DT); // API trả về danh sách phòng chat và tin nhắn mới nhất
        } catch (error) {
            console.error('Error fetching new messages:', error);
        }
    }, [currUser]);

    // Fetch friend list
    const fetchFriendList = useCallback(async () => {
        try {
            const response = await getFriendList({ id: currUser.id });
            setFriend(response.DT); // API trả về danh sách bạn bè
        } catch (error) {
            console.error('Error fetching new messages:', error);
        }
    }, [currUser]);

    // Handle search change
    const handleSearchChange = async (e) => {
        const data = {
            text: e.target.value
        }
        if (data.text === '' || data.text === null || data.text === undefined || !data.text) {
            setFindData([])
            setSearchData(data.text);
        } else {
            setSearchData(data.text);
        }
    }



    useEffect(() => {
        const fetchData = async () => {
            if (!searchData) return;
            const res = await findUser({ text: searchData });
            setFindData(res.DT);
        };
        fetchData();
    }, [useDebounce(searchData, 500)]);
    // Load chat room and friend list when component is mounted
    useEffect(() => {
        fetchChatRoom();
    }, [fetchChatRoom, fetchFriendList, currUser]);


    useEffect(() => {
        if (pageState === 'friend') {
            fetchFriendList();
        }
    }, [pageState]);


    if (!currUser) return null;


    return (
        <div className={cx('rightsidebar')}>
            <NewChat active={stateNewChatPopUp} setActive={setStateNewChatPopUp}></NewChat>
            <div className={cx('me-auto', 'list_nav')}>
                <div className={cx('sidebar_header')}>
                    <FontAwesomeIcon icon={faUser} /> Wtf Chat
                </div>

                {
                    // Render different content based on the current page state
                    (() => {
                        switch (pageState) {
                            case 'chat':
                                return chatRoom && chatRoom.length > 0 ? (
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
                                ) : (
                                    <div>No new messages</div>
                                );
                            case 'friend':
                                return friend && friend.length > 0 ? (
                                    friend.map((friend) => (
                                        <ChatRoom
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
                                return <div>
                                    <div className={cx('searchData')}>
                                        {findData && findData.map((item) => (
                                            item.loai === 'nguoidung' ?
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
                                        ))}
                                    </div>
                                    <Search value={searchData} onChange={handleSearchChange}></Search>;
                                </div>
                            case 'archive':
                                return <div style={{ color: 'white' }}>Archive Page</div>;
                            default:
                                return null;
                        }
                    })()}
            </div>
            <Footer onClickNewChat={handleNewChat} key={pageState} pageState={pageState} setPageData={setPageData} />
        </div>
    );
};

export default RightSidebar;