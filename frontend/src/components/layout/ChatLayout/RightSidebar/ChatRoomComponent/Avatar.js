import React from 'react';
import classNames from 'classnames/bind';
import styles from "./ChatRoomComponent.module.scss";

const cx = classNames.bind(styles);

export default function Avatar({ avt }) {
    return (
        <div className={cx("CR_avt")}>
            <img src={avt && avt !== "/" ? avt : "https://static3.bigstockphoto.com/9/1/3/large1500/31903202.jpg"} alt="avt" />
        </div>
    );
}
