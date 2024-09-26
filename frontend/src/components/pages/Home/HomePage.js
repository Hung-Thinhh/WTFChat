import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from '../../../css/HomePage.module.scss';
import { faMessage } from '@fortawesome/free-regular-svg-icons';

const cx = classNames.bind(styles);

function Home() {
    return (
        <div className={cx('wraper')}>
            <img
                className={cx('logo')}
                src={process.env.PUBLIC_URL + 'logo512.png'}
                alt="WTFChat"
            />
            <div className={cx('decribe')}>ChatTime - Thời gian tuyệt vời để trò chuyện</div>
            <button className={cx('btn')}>
                <FontAwesomeIcon icon={faMessage} />
                Nhắn tin ngay
            </button>
        </div>
    );
}

export default Home;
