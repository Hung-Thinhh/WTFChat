import classNames from 'classnames/bind';

import styles from '../AvatarMenu.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Item({ title, to, icon, onClick }) {
    return (
        <Link to={to} className={cx('item')} onClick={onClick}>
            <span>{icon}</span>
            <span className={cx('title')}>{title}</span>
        </Link>
    );
}



export default Item;
