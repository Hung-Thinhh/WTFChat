import styles from "./FriendItem.module.scss";
import { faMagnifyingGlass, faUser } from "@fortawesome/free-solid-svg-icons";
import className from "classnames/bind";
import ChatDataContext from 'lib/Context/ChatContext';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {useContext } from "react";
const cx = className.bind(styles);

export default function FriendItem({ id, avt, name, time, mess }) {
    const { ChatData, setChatData } = useContext(ChatDataContext);
    const { setRoomInfo } = useContext(ChatDataContext);
    const handleClick = () => {
        setChatData(id);
        setRoomInfo({ id, avt, name });
    }
    return (
        <div
            className={cx("container", { "active": ChatData === id })}
            key={id}
            onClick={handleClick}
        >
            <div className={cx("CR_avt")}>
                {avt === null ? <FontAwesomeIcon icon={faUser} /> :
                    <img src={avt} alt="avt" />}
            </div>
            <div className={cx("CR_info")}>
                <div className={cx("CR_left")}>
                    <div className={cx("CR_romname")}>
                        <h3>{name}</h3>
                    </div>
                </div>
                <div className={cx("CR_right")}>
                    {time}
                </div>
            </div>
        </div>
    );

}


