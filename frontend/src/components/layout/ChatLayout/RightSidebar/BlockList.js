
import React from 'react';
import ChatRoom from './ChatRoomComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDog, faSmile } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from './RightSidebar.module.scss';

const cx = classNames.bind(styles);

const BlockList = ({ blocklist }) => {
    return blocklist && blocklist.length > 0 ? (
        blocklist.map((item) => (
            <ChatRoom
                type='friend'
                key={item.id}
                id={item.id}
                name={item.firstname + ' ' + item.lastname}
                isBlock={true}
                avt={item.avatar}
                friendId={item.id}
                isFriend={item.isFriend}
            />
        ))
    ) : (
        <div className={cx('nonePage')}>楽しい犬 <FontAwesomeIcon icon={faDog} /> <FontAwesomeIcon icon={faSmile} /><br />You are good, you love everyone, keep going</div>
    );
};

export default BlockList;