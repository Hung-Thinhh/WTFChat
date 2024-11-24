import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faLock, faTrash, faBellSlash, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
// import { faBell,faBellSlash } from '@fortawesome/free-regular-svg-icons';
import React, { useContext, useEffect, useState } from 'react';
import ChatDataContext from 'lib/Context/ChatContext';
import { timePassed } from 'lib/function/formatTime';
import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/zoom.css';
import { setShowMenu } from '../../layout/ChatLayout/LeftSidebar/sidebarSlide';
import { useDispatch, useSelector } from 'react-redux';
import { showMenuSelector } from '../../../redux/selectors';
import Button from 'components/Button';
const HeaderChatPage = ({ RoomInfo }) => {
    const { listStatus } = useContext(ChatDataContext);
    const [status, setStatus] = useState('');
    const dispatch = useDispatch();
    const state = useSelector(showMenuSelector);
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
            <div className="header_wrap" >
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
                                                                userObj.userId ===
                                                                RoomInfo.friendId,
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
                <div className="more">
                    <Button onClick={() => dispatch(setShowMenu(!state))}
                        className="btn_more" onlyIcon={true}
                        rightIcon={<FontAwesomeIcon icon={faEllipsisVertical} />}
                    >
                         {/* thằng nào xoá của t v */}
                    </Button>
                    <Menu menuButton={<MenuButton className="btn_more"><FontAwesomeIcon icon={faEllipsisVertical} /></MenuButton>} transition className="my-menu">
                        <MenuItem className="menu_item"><FontAwesomeIcon icon={faBellSlash} />Mute</MenuItem>
                        <MenuItem className="menu_item"><FontAwesomeIcon icon={faLock} /> Block user</MenuItem>
                        <MenuItem className="menu_item delete-chat"><FontAwesomeIcon icon={faTrash} /> Delete chat</MenuItem>
                    </Menu>

                </div>
            </div>
        </div>
    );
};
export default HeaderChatPage;
