import React, { useContext, useEffect, useState } from 'react';
import ChatDataContext from 'lib/Context/ChatContext';
import { timePassed } from 'lib/function/formatTime';
import { useDispatch, useSelector } from 'react-redux';
import { showMenuSelector } from '../../../redux/selectors';
import { setShowMenu } from '../../layout/ChatLayout/LeftSidebar/sidebarSlide';
import UserInfo from './UserInfo';
import MoreOptions from './MoreOptions';

const HeaderChatPage = ({ RoomInfo }) => {
    const { listStatus } = useContext(ChatDataContext);
    const [status, setStatus] = useState('');
    const dispatch = useDispatch();
    const state = useSelector(showMenuSelector);

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

    return (
        <div className="chatpage_header">
            <div className="header_wrap">
                <UserInfo RoomInfo={RoomInfo} listStatus={listStatus} status={status} />
                <MoreOptions RoomInfo={RoomInfo} dispatch={dispatch} state={state} />
            </div>
        </div>
    );
};

export default HeaderChatPage;
