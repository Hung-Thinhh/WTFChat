
import React from 'react';
import ChatRoom from './ChatRoomComponent';
import { timePassed } from 'lib/function/formatTime';
import classNames from 'classnames/bind';
import styles from './RightSidebar.module.scss';
const cx = classNames.bind(styles);

const ChatList = ({ chatRoom, currUser }) => {
    return chatRoom && chatRoom.length > 0 ? (
        <div className={cx('containerChatRoom')}>
            {chatRoom.map((room) => (
                <ChatRoom
                    key={room.id}
                    id={room.id}
                    chattype={room.type}
                    sender={
                        JSON.parse(room.last_message) ?
                            JSON.parse(room.last_message).idUser !== currUser.id
                                ? JSON.parse(room.last_message).sender
                                : 'You' : null
                    }
                    name={room.groupName}
                    avt={room.avt}
                    time={timePassed(room.update_time)}
                    mess={
                        JSON.parse(room.last_message) &&
                        JSON.parse(room.last_message).content
                    }
                    friendId={room.otherUserId}
                />
            ))}
        </div>
    ) : (
        <div>No new messages</div>
    );
};

export default ChatList;