import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from './Avatar.module.scss';

const cx = classNames.bind(styles);

function Avatar({ src, size }) {
    return (
        <img
            className={cx('avatar', { [size]: size })}
            src={src || process.env.PUBLIC_URL + 'logo512.png'}
            alt="avatar"
        />
    );
}

Avatar.propTypes = {
    src: PropTypes.string.isRequired,
    size: PropTypes.oneOf(['small', 'large', 'medium', 'ultra-lg']),
};

export default Avatar;
