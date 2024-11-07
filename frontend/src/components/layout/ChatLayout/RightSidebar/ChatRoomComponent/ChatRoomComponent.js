import styles from "./ChatRoomComponent.module.scss";
import ChatDataContext from 'lib/Context/ChatContext';
import { useContext, useEffect } from 'react';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);
export default function ChatRoom({ id, avt, name, time, mess, sender }) {
    console.log(id);

    const { ChatData, setChatData } = useContext(ChatDataContext);
    const { setRoomInfo } = useContext(ChatDataContext);
    const handleClick = () => {
        console.log('okkkkkkk');

        setChatData(id);
        setRoomInfo({ id, avt, name });
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
        </div>
    );
}

