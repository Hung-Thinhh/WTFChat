import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './HomeHeader.module.scss';
import Button from 'components/Button';
import { faArrowLeft, faArrowRightToBracket, faPen } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import Avatar from 'components/Avatar';
import ChatDataContext from 'lib/Context/ChatContext';
import config from 'config';
import AvatarMenu from 'components/AvatarMenu';

const cx = classNames.bind(styles);

function HomeHeader() {
    const location = useLocation(); // to get current route
    const { currUser } = useContext(ChatDataContext); // get current user data from global state
    const defaultData = {
        to: '',
        icon: '',
        content: '',
    };
    const [data, setData] = useState(defaultData);

    useEffect(() => {
        if (location.pathname === config.routes.login) {
            setData({
                to: config.routes.register,
                icon: <FontAwesomeIcon icon={faPen} />,
                content: 'Đăng kí',
            });
        } else {
            setData({
                to: config.routes.login,
                icon: <FontAwesomeIcon icon={faArrowRightToBracket} />,
                content: 'Đăng nhập',
            });
        }
    }, [location, currUser]);

    return (
        <div className={cx('wrapper')}>
            <div>
                {location.pathname !== config.routes.home && (
                    <Button
                        to={config.routes.home}
                        type="text"
                        size="small"
                        leftIcon={<FontAwesomeIcon icon={faArrowLeft} />}
                    >
                        Trang chủ
                    </Button>
                )}
            </div>
            {currUser ? (
                <AvatarMenu>
                    <Avatar src={currUser.avt || ''} size="small" />
                    <p>{currUser.username}</p>
                </AvatarMenu>
            ) : (
                <Button to={data.to} type="text" size="small" leftIcon={data.icon}>
                    {data.content}
                </Button>
            )}
        </div>
    );
}

export default HomeHeader;
