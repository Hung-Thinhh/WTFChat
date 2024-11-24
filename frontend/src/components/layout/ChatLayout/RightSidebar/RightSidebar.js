import React, { useContext, useEffect, useState, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from './RightSidebar.module.scss';
import Footer from './Footer';
import ChatDataContext from 'lib/Context/ChatContext';
import getChatRoom from 'services/getchatroom';
import getFriendList from 'services/getFriendList';
import findUser from 'services/findUserService';
import useDebounce from 'hooks/useDebounce';
import NewChat from './NewChat';
import getBlockFriendList from 'services/getBlockFriendList';
import ChatList from './ChatList';
import FriendList from './FriendList';
import SearchResults from './SearchResults';
import BlockList from './BlockList';
import { socket } from '../../../../socket';
const cx = classNames.bind(styles);

const RightSidebar = () => {
    const { currUser } = useContext(ChatDataContext);
    const [chatRoom, setRoomData] = useState([]);
    const [pageState, setPageData] = useState('chat');
    const [friend, setFriend] = useState([]);
    const [findData, setFindData] = useState([]);
    const [searchData, setSearchData] = useState('');
    const [stateNewChatPopUp, setStateNewChatPopUp] = useState(false);
    const [blocklist, setBlockList] = useState([]);

    const handleNewChat = (e) => {
        setStateNewChatPopUp(true);
    };

    const handleAdd = (data) => {
        
        socket.emit('newRoom', data);
    }






    useEffect(() => {
        socket.on('newRoom', (data) => {
            setRoomData((prev) => [data, ...prev]);
        });
        return () => {
            socket.off('newRoom'); // Hủy đăng ký sự kiện khi component unmount
        };
    }, []);

    const fetchChatRoom = useCallback(async () => {
        try {
            const response = await getChatRoom({ id: currUser.id });
            setRoomData(response.DT);
        } catch (error) {
            console.error('Error fetching new messages:', error);
        }
    }, [currUser]);

    const fetchFriendList = useCallback(async () => {
        try {
            const response = await getFriendList({ id: currUser.id });
            setFriend(response.DT);
        } catch (error) {
            console.error('Error fetching friend list:', error);
        }
    }, [currUser]);

    const fetchBlockList = useCallback(async () => {
        try {
            const response = await getBlockFriendList({ id: currUser.id });
            setBlockList(response.DT);
        } catch (error) {
            console.error('Error fetching block list:', error);
        }
    }, [currUser]);

    const handleSearchChange = async (e) => {
        const data = { text: e.target.value };
        if (!data.text) {
            setFindData([]);
            setSearchData(data.text);
        } else {
            setSearchData(data.text);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            if (!searchData) return;
            const res = await findUser({ text: searchData });
            setFindData(res.DT);
        };
        fetchData();
    }, [useDebounce(searchData, 500)]);

    useEffect(() => {
        const handleEnterKey = (event) => {
            if (event.key === 'Enter') {
                const fetchData = async () => {
                    if (!searchData) return;
                    const res = await findUser({ text: searchData });
                    setFindData(res.DT);
                };
                fetchData();
            }
        };

        window.addEventListener('keydown', handleEnterKey);
        return () => {
            window.removeEventListener('keydown', handleEnterKey);
        };
    }, [searchData]);

    useEffect(() => {
        fetchChatRoom();
    }, [fetchChatRoom, fetchFriendList, currUser]);

    useEffect(() => {
        (() => {
            switch (pageState) {
                case 'friend':
                    return fetchFriendList();
                case 'block':
                    return fetchBlockList();
                default:
                    return null;
            }
        })();
        setFindData([]);
        setSearchData('');
    }, [pageState]);

    if (!currUser) return null;

    return (
        <div className={cx('rightsidebar')}>
            <NewChat callBack={handleAdd} active={stateNewChatPopUp} setActive={setStateNewChatPopUp} />
            <div className={cx('me-auto', 'list_nav')}>
                <div className={cx('sidebar_header')}>
                    <FontAwesomeIcon icon={faUser} />{pageState}
                </div>
                {
                    (() => {
                        switch (pageState) {
                            case 'chat':
                                return <ChatList chatRoom={chatRoom} currUser={currUser} />;
                            case 'friend':
                                return <FriendList friend={friend} />;
                            case 'search':
                                return (
                                    <SearchResults
                                        findData={findData}
                                        searchData={searchData}
                                        handleSearchChange={handleSearchChange}
                                    />
                                );
                            case 'block':
                                return <BlockList blocklist={blocklist} />;
                            default:
                                return null;
                        }
                    })()
                }
            </div>
            <Footer onClickNewChat={handleNewChat} key={pageState} pageState={pageState} setPageData={setPageData} />
        </div>
    );
};

export default RightSidebar;
