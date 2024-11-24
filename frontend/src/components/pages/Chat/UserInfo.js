
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { timePassed } from 'lib/function/formatTime';

const UserInfo = ({ RoomInfo, listStatus, status }) => (
    <div className="infor">
        <div className="chatPage_chat_avt">
            <img
                src={
                    RoomInfo.avt
                        ? RoomInfo.avt
                        : 'https://meliawedding.com.vn/wp-content/uploads/2022/03/avatar-gai-xinh-1.jpg'
                }
                alt="user-avt"
            />
        </div>
        <div className="chatPage_chat_name">
            <h3>{RoomInfo.name}</h3>
            <div className="status">
                {listStatus.some((userObj) => userObj.userId === RoomInfo.friendId) && (
                    <span>
                        {listStatus.find(
                            (userObj) => userObj.userId === RoomInfo.friendId,
                        ).status === 'online' ? (
                            <>
                                Online <FontAwesomeIcon icon={faCircle} />
                            </>
                        ) : (
                            <>
                                {status ? (
                                    <>Hoạt động {status}</>
                                ) : (
                                    <>
                                        Hoạt động{' '}
                                        {timePassed(
                                            listStatus.find(
                                                (userObj) =>
                                                    userObj.userId === RoomInfo.friendId,
                                            ).time,
                                        )}
                                    </>
                                )}
                            </>
                        )}
                    </span>
                )}
            </div>
        </div>
    </div>
);

export default UserInfo;