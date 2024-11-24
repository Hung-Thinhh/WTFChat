
import classNames from "classnames/bind";
import styles from "./Chip.module.scss";
import Button from "components/Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from "react";
const cx = classNames.bind(styles);


const Chip = ({ name, handleDelete, color }) => {
    return <div className={cx("chip")} style={{ backgroundColor: color }}>
        <div className={cx('chipname')} >{name}</div>
        <Button
            type='rounded'
            className={cx('chipbtn')}
            onClick={handleDelete} onlyIcon={true} leftIcon={<FontAwesomeIcon icon={faX} />} ></Button>

    </div>
};


export default Chip;