import classNames from 'classnames/bind';

import styles from './AvatarMenu.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import config from 'config';
import Item from './Item';
import { useRef, useState } from 'react';
import { fetchLogout } from '../../redux/globalSlice/userSlice';
import { useDispatch } from 'react-redux';

const cx = classNames.bind(styles);

const menuItems = [
    {
        title: 'Thông tin cá nhân',
        icon: <FontAwesomeIcon icon={faUser} />,
        to: config.routes.profile,
    },
    {
        title: 'Đăng xuất',
        icon: <FontAwesomeIcon icon={faArrowRightFromBracket} />,
        event: 'logout',
    },
];

function AvatarMenu({ children }) {
    const dispatch = useDispatch();
    const timeId = useRef(null);
    const [show, setShow] = useState(false);

    const handleEvent = async (event) => {
        switch (event) {
            case 'logout':
                const res = dispatch(fetchLogout());

                if (res.EC === '200') {
                    window.location.reload();
                } else if (res.EC === '500') {
                    alert(
                        'Lỗi hệ thống vui lòng báo cáo với chúng tôi! qua email: deptraivkl@gmail.com',
                    );
                }
                break;
            default:
                break;
        }
    };

    const handleMouseEnter = () => {
        timeId.current && clearTimeout(timeId.current);
        show || setShow(true);
    };

    const handleMouseLeave = () => {
        timeId.current = setTimeout(() => {
            setShow(false);
        }, 500);
    };

    return (
        <div
            className={cx('tooltip-container')}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className={cx('tooltip', { show: show })}>
                {menuItems.map((item, index) => (
                    <Item key={index} onClick={() => handleEvent(item.event)} {...item} />
                ))}
            </div>
            {children}
        </div>
    );
}

export default AvatarMenu;
