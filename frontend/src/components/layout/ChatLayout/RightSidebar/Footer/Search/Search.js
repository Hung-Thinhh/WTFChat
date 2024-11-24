import styles from "./Search.module.scss";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import className from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef } from "react";
const cx = className.bind(styles);

export default function Search({ className, value, onChange, isMulti }) {
    const refInput = useRef(null);
    useEffect(() => { refInput.current.focus() }, []);
    return (
        <div className={cx('container', { [className]: className })}>
            <FontAwesomeIcon icon={faMagnifyingGlass} className={cx('icon')} />
            <input value={value} onChange={onChange} ref={refInput} type="text" placeholder="Search" className={cx('search')} />
        </div>
    );

}


