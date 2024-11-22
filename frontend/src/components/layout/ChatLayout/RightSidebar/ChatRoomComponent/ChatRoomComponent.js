import styles from "./ChatRoomComponent.module.scss";
import ChatDataContext from 'lib/Context/ChatContext';
import { useContext, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faBellSlash, faLock, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu';
const cx = classNames.bind(styles);
export default function ChatRoom({ id, avt, name, time, mess, sender, friendId, type = 'chatroom' }) {
    const { ChatData, setChatData } = useContext(ChatDataContext);
    const { setRoomInfo } = useContext(ChatDataContext);
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
                    <MenuItem className={cx("menu_item")}><FontAwesomeIcon icon={faBellSlash} />Mute</MenuItem>
                    <MenuItem className={cx("menu_item")}><FontAwesomeIcon icon={faLock} />Block user</MenuItem>
                    <MenuItem className={cx("menu_item", "deleteUser")}><FontAwesomeIcon icon={faTrash} />Delete friend/Add friend</MenuItem>
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
