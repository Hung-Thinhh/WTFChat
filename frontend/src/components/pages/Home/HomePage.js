import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './HomePage.module.scss';
import { faMessage } from '@fortawesome/free-regular-svg-icons';
import Button from 'components/Button';
import config from 'config';

const cx = classNames.bind(styles);

function Home() {
    return (
        <div className={cx('wrapper')}>
            <img
                className={cx('logo')}
                src={process.env.PUBLIC_URL + 'logo512.png'}
                alt="WTFChatLogo"
            />
            <div className={cx('decribe')}>ChatTime - Thời gian tuyệt vời để trò chuyện</div>
            <Button
                className={cx('btn')}
                to={config.routes.chatpage}
                leftIcon={<FontAwesomeIcon icon={faMessage} />}
                type="rounded"
                size="medium"
            >
                <span className={cx('text')}>Nhắn tin</span>
            </Button>
        </div>
    );
}

export default Home;
