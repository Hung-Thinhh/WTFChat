import styles from "./ChatRoomComponent.module.scss";
import ChatDataContext from 'lib/Context/ChatContext';
import { useContext, useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faBellSlash, faLock, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu';
import { addFriendCtrl, delFriendCtrl } from "controller/FriendStuff";
const cx = classNames.bind(styles);
export default function ChatRoom({ id, avt, name, time, mess, sender, friendId, isFriend, type = 'chatroom' }) {
    const { ChatData, setChatData } = useContext(ChatDataContext);
    const { setRoomInfo } = useContext(ChatDataContext);
    const [insFriend, setInsFriend] = useState(isFriend);
    const checkboxref = useRef();
    const handleClick = (e) => {
        if (e.target.classList.contains('btn_more')) return
        if (type === 'new') {
            checkboxref.current.checked = !checkboxref.current.checked;
            return;
        }
        setChatData(id);
        setRoomInfo({ id, avt, name, friendId });
    };


    const handleAddFriend = (e) => {
        addFriendCtrl({ friendId });
        setInsFriend(true);
    }
    const handleDelFriend = (e) => {
        delFriendCtrl({ friendId });
        setInsFriend(false);
    }
    const handleBlockFriend = (e) => {
        alert('Block friend');
    }
    const handleMuteFriend = (e) => {
        alert('Mute friend is in development');
    }

    return (
        <div
            className={cx("main_container", { "active": ChatData === id })}
            key={id}
            onClick={handleClick}
        >
            <div className={cx("CR_avt")}>
                <img src={avt && avt !== "/" ? avt : "https://static3.bigstockphoto.com/9/1/3/large1500/31903202.jpg"} alt="avt" />
            </div>
            <div className={cx("CR_info")}>
                <div className={cx("CR_left")}>
                    <div className={cx("CR_room_name")}>
                        <h3>{name}</h3>
                    </div>
                    {mess && (
                        <div className={cx("CR_mess")}>
                            <span className={cx("Sender")}>{sender}:</span>
                            <span className={cx("content")}>{mess}</span>
                        </div>
                    )}
                </div>
                <div className={cx("CR_right")}>
                    {time}
                </div>

            </div>
            {type !== "new" ?
                (<Menu menuButton={<MenuButton className={cx("btn_more")}><FontAwesomeIcon icon={faEllipsisVertical} /></MenuButton>} transition className={cx("my-menu")}>
                    <MenuItem className={cx("menu_item")} onClick={handleMuteFriend}><FontAwesomeIcon icon={faBellSlash} />Mute</MenuItem>
                    <MenuItem className={cx("menu_item")} onClick={handleBlockFriend}><FontAwesomeIcon icon={faLock} />Block user</MenuItem>
                    {insFriend ?
                        (<MenuItem className={cx("menu_item", "deleteUser")} onClick={handleDelFriend}><FontAwesomeIcon icon={faTrash} />Delete friend</MenuItem>) :
                        (<MenuItem className={cx("menu_item", "addFUser")} onClick={handleAddFriend}><FontAwesomeIcon icon={faPlus} />Add friend</MenuItem>)}

                </Menu>)
                :
                (<div className={cx("checkbox-container")}>
                    <input ref={checkboxref} type="checkbox" id={`checkbox-${id}`} className={cx("checkbox")} />
                    <label for={`checkbox-${id}`} className={cx("checkbox-label")}></label>
                </div>)
            }
        </div >
    );
}
