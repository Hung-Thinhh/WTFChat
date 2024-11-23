
import React from 'react';
import ChatRoom from './ChatRoomComponent';
import Search from './Footer/Search';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDog, faFaceSadTear } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from './RightSidebar.module.scss';

const cx = classNames.bind(styles);

const SearchResults = ({ findData, searchData, handleSearchChange }) => {
    return (
        <div className={cx('containerChatRoom')}>
            <div className={cx('searchData')}>
                {findData && findData.length > 0 ? (
                    <>
                        {findData.filter(item => item.isFriend && !item.isBlock).length > 0 && <div className={cx('label')}>Bạn bè</div>}
                        {findData.filter(item => item.isFriend && !item.isBlock).map((item) => (
                            <ChatRoom
                                type='friend'
                                key={item.id}
                                id={item.id}
                                name={item.firstname + ' ' + item.lastname}
                                avt={item.avatar}
                                friendId={item.id}
                                isFriend={item.isFriend}
                                isBlock={item.isBlock}
                            />
                        ))}
                        {findData.filter(item => item.isBlock).length > 0 && <div className={cx('label')}>Block list</div>}
                        {findData.filter(item => item.isBlock).map((item) => (
                            <ChatRoom
                                type='friend'
                                key={item.id}
                                id={item.id}
                                name={item.firstname + ' ' + item.lastname}
                                avt={item.avatar}
                                friendId={item.id}
                                isFriend={item.isFriend}
                                isBlock={item.isBlock}
                            />
                        ))}
                        {findData.filter(item => !item.isFriend && !item.isBlock).length > 0 && <div className={cx('label')}>Người lạ</div>}
                        {findData.filter(item => !item.isFriend && !item.isBlock).map((item) => (
                            <ChatRoom
                                type='friend'
                                key={item.id}
                                id={item.id}
                                name={item.firstname + ' ' + item.lastname}
                                avt={item.avatar}
                                friendId={item.id}
                                isFriend={item.isFriend}
                                isBlock={item.isBlock}
                            />
                        ))}
                    </>
                ) : (
                    <div className={cx('nonePage')}>寂しい犬 <FontAwesomeIcon icon={faDog} /> <FontAwesomeIcon icon={faFaceSadTear} /><br />You are alone, typing something to searchbox to continue</div>
                )}
            </div>
            <Search
                className={cx('search')}
                value={searchData}
                onChange={handleSearchChange}
            />
        </div>
    );
};

export default SearchResults;