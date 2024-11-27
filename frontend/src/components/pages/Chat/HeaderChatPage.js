import React, { useContext, useEffect, useState } from 'react';
import ChatDataContext from 'lib/Context/ChatContext';
import { timePassed } from 'lib/function/formatTime';
import { useDispatch, useSelector } from 'react-redux';
import { showMenuSelector } from '../../../redux/selectors';
import { chatDataSelector } from '../../../redux/selectors';
import UserInfo from './UserInfo';
import MoreOptions from './MoreOptions';

const HeaderChatPage = ({ RoomInfo, target }) => {
    const { listStatus } = useContext(ChatDataContext);
    const [status, setStatus] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const dispatch = useDispatch();
    const state = useSelector(showMenuSelector);
    const Chat = useSelector(chatDataSelector);

    useEffect(() => {
        const intervalId = setInterval(() => {
            const updateStatus = () => {
                const friendStatus = listStatus.find(
                    (userObj) => userObj.userId === RoomInfo.friendId,
                );
                if (friendStatus) {
                    setStatus(timePassed(friendStatus.time));
                }
            };
            updateStatus();
        }, 60000);

        return () => clearInterval(intervalId);
    }, [listStatus, RoomInfo.friendId]);

    const handleSearch = (event) => {
        const term = event.target.value;
        setSearchTerm(term);
        if (term === '') {
            setSearchResults([]);
        } else if (Array.isArray(Chat)) {
            const results = Chat.filter((message) =>
                message.content.toLowerCase().includes(term.toLowerCase())
            );
            setSearchResults(results);
        }
    };

    const handleBlur = () => {
        setTimeout(() => {
            setSearchResults([]);
        }, 2000);
    };

    return (
        <div className="chatpage_header">
            <div className="header_wrap">
                <UserInfo RoomInfo={RoomInfo} listStatus={listStatus} status={status} />
                <input
                    type="text"
                    placeholder="Search messages..."
                    value={searchTerm}
                    onChange={handleSearch}
                    onBlur={handleBlur}
                    className='search_input'
                />
                {searchResults.length > 0 && (
                    <div className="search_results">
                        {searchResults.map((result, index) => (
                            <div key={index} className="search_result_item" onClick={() => target(result.id)}>
                                {result.content}
                            </div>
                        ))}
                    </div>
                )}
                <MoreOptions RoomInfo={RoomInfo} dispatch={dispatch} state={state} />
            </div>
        </div>
    );
};

export default HeaderChatPage;