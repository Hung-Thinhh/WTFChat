
import React from 'react';
import classNames from 'classnames/bind';
import styles from "./ChatRoomComponent.module.scss";

const cx = classNames.bind(styles);

export default function NewRoomCheckbox({ isChoose, id }) {
    return (
        <div className={cx("checkbox-container")}>
            <input checked={isChoose} onChange={() => { }} type="checkbox" id={`checkbox-${id}`} className={cx("checkbox")} />
            <label htmlFor={`checkbox-${id}`} className={cx("checkbox-label")}></label>
        </div>
    );
}