import React, { useState } from 'react';
import styles from "./DropDownMenu.module.scss";
import classNames from 'classnames/bind';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import Button from 'components/Button';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const cx = classNames.bind(styles);

export default function DropDownMenu({ classNames }) {
    const [isOpen, setIsOpen] = useState(false);

    const handleMenuClick = (option) => {
        // Handle menu option click
        console.log(`Option selected: ${option}`);
        setIsOpen(false); // Close the menu after selecting an option
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={cx('dropdown-container', { [classNames]: classNames })}>
            <Button className={cx('dropdown-button')} onlyIcon={true} leftIcon={<FontAwesomeIcon icon={faEllipsisVertical} />} onClick={toggleMenu}></Button>
            {isOpen && (
                <div className={cx('dropdown-content')}>
                    <a href="#" onClick={() => handleMenuClick('Option 1')}>Option 1</a>
                    <a href="#" onClick={() => handleMenuClick('Option 2')}>Option 2</a>
                    <a href="#" onClick={() => handleMenuClick('Option 3')}>Option 3</a>
                </div>
            )}
        </div>
    );
}
