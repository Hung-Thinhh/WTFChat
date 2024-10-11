import classNames from 'classnames/bind';

import styles from './AvatarMenu.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import config from 'config';

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
        event: 'logout'
    },
];

function AvatarMenu({ children }) {
    return (
        <div class={cx('tooltip-container')}>
            <div class={cx('tooltip')}>
                {/* Menu Item go here */}
            </div>
            {children}
        </div>
    );
}

export default AvatarMenu;
