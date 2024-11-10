import Dropdown from 'react-bootstrap/Dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import React, { useContext, useEffect, useState } from 'react';
import ChatDataContext from 'lib/Context/ChatContext';
import { timePassed } from 'lib/function/formatTime';

const HeaderChatPage = ({ RoomInfo }) => {
    const { listStatus } = useContext(ChatDataContext);
    const [status, setStatus] = useState('');

    useEffect(() => {
        const intervalId = setInterval(() => {
            // Tạo hàm cập nhật trạng thái
            const updateStatus = () => {
                const friendStatus = listStatus.find(
                    (userObj) => userObj.userId === RoomInfo.friendId,
                );
                if (friendStatus) {
                    setStatus(timePassed(friendStatus.time));
                }
            };

            // Gọi hàm cập nhật trạng thái
            updateStatus();
        }, 60000);

        return () => clearInterval(intervalId);
    }, []);
    return (
        <div className="chatpage_header">
            <div className="header_wrap">
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
                                                {status ?
                                                    (<>Hoạt động  {status}</>)
                                                    :
                                                    (<>Hoạt động {timePassed(
                                                        listStatus.find(
                                                            (userObj) =>
                                                                userObj.userId === RoomInfo.friendId,
                                                        ).time,
                                                    )}</>)}
                                            </>
                                    )}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
                <div className="more">
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            Dropdown Button
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>
        </div>
    );
};
export default HeaderChatPage;
