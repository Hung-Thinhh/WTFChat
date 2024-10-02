import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './HomeHeader.module.scss';
import Button from 'components/Button';
import { faArrowLeft, faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

function HomeHeader() {
    const location = useLocation();
    const [data, setData] = useState({});

    useEffect(() => {
        if (location.pathname === '/login' || location.pathname === '/register') {
            setData({
                to: '/',
                icon: <FontAwesomeIcon icon={faArrowLeft} />,
                content: 'Trang chủ',
            });
        } else if (location.pathname === '/') {
            setData({
                to: '/login',
                icon: <FontAwesomeIcon icon={faArrowRightToBracket} />,
                content: 'Đăng nhập',
            });
        }
    }, [location]);

    return (
        <div className={cx('wrapper')}>
            <Button to={data.to} type="text" size="medium" leftIcon={data.icon}>
                {data.content}
            </Button>
            <Button
                href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                type="text"
                size="medium"
                target="_blank"
            >
                About Us
            </Button>
        </div>
    );
}

export default HomeHeader;
