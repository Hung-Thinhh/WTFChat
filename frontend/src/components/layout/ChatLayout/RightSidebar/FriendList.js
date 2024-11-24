
import React from 'react';
import ChatRoom from './ChatRoomComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDog, faFaceSadTear } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from './RightSidebar.module.scss';

const cx = classNames.bind(styles);

const FriendList = ({ friend }) => {
    return friend && friend.length > 0 ? (
        <div className={cx('containerChatRoom')}>
            {friend.map((item) => (
                <ChatRoom
                    type='friend'
                    key={item.id}
                    id={item.id}
                    name={item.firstname + ' ' + item.lastname}
                    avt={item.avatar}
                    friendId={item.id}
                    isFriend={true}
                    isBlock={false}
                />
            ))}
        </div>
    ) : (
        <div className={cx('nonePage')}>寂しい犬 <FontAwesomeIcon icon={faDog} /> <FontAwesomeIcon icon={faFaceSadTear} /><br />You are alone, wake up from this reality and find some friends to continue</div>
    );
};

export default FriendList;