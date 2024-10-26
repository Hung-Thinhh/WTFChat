import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './HomeHeader.module.scss';
import Button from 'components/Button';
import { faArrowLeft, faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import Avatar from 'components/Avatar';
import ChatDataContext from 'lib/Context/ChatContext';
import config from 'config';
import AvatarMenu from 'components/AvatarMenu';

const cx = classNames.bind(styles);

function HomeHeader() {
    const location = useLocation(); // to get current route
    const { currUser } = useContext(ChatDataContext); // get current user data from global state
    const [data, setData] = useState({});

    useEffect(() => {
        if (
            location.pathname === config.routes.login ||
            location.pathname === config.routes.register ||
            location.pathname === config.routes.forgetpassword
        ) {
            setData({
                to: config.routes.home,
                icon: <FontAwesomeIcon icon={faArrowLeft} />,
                content: 'Trang chủ',
            });
        } else if (location.pathname === '/') {
            setData({
                to: config.routes.login,
                icon: <FontAwesomeIcon icon={faArrowRightToBracket} />,
                content: 'Đăng nhập',
            });
        }
    }, [location]);

    return (
        <div className={cx('wrapper')}>
            {currUser ? (
                <AvatarMenu>
                    <Avatar src={currUser.avt} size="small" />
                    <p>{currUser.username}</p>
                </AvatarMenu>
            ) : (
                <Button to={data.to} type="text" size="small" leftIcon={data.icon}>
                    {data.content}
                </Button>
            )}
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
