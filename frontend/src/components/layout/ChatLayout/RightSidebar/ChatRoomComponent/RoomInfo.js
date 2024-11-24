
import React from 'react';
import classNames from 'classnames/bind';
import styles from "./ChatRoomComponent.module.scss";

const cx = classNames.bind(styles);

export default function RoomInfo({ name, mess, sender, id, type, time }) {
    return (
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
                {(type === 'new' || type === 'friend') && (
                    <div className={cx("CR_mess")}>
                        <span className={cx("iduser")}>@{id}</span>
                    </div>
                )}
            </div>
            <div className={cx("CR_right")}>
                {time}
            </div>
        </div>
    );
}