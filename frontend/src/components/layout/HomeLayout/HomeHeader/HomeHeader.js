import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './HomeHeader.module.scss';
import Button from '../../../Button';
import { faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function HomeHeader({ to = '/login', content, icon }) {
    return (
        <div className={cx('wrapper')}>
            <Button
                to={to}
                type="text"
                size="medium"
                leftIcon={<FontAwesomeIcon icon={faArrowRightToBracket} />}
            >
                Đăng nhập
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

HomeHeader.propTypes = {
    to: PropTypes.string,
    leftIcon: PropTypes.node,
    content: PropTypes.string,
};

export default HomeHeader;
