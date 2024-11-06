import styles from "./FriendItem.module.scss";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import className from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef } from "react";
const cx = className.bind(styles);

export default function Search({ }) {
    const refInput = useRef(null);
    return (
        <div className={cx('container')}>
            <FontAwesomeIcon icon={faMagnifyingGlass} className={cx('icon')} />
        </div>
    );

}


