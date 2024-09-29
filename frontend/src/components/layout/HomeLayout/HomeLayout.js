import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from './HomeLayout.module.scss';
import HomeHeader from './HomeHeader';

const cx = classNames.bind(styles);

function HomeLayout({ children, contactInfo }) {
    return (
        <div className={cx('wrapper')}>
            <HomeHeader />
            {children}
        </div>
    );
}

HomeLayout.propTypes = {
    children: PropTypes.node.isRequired,
    contactInfo: PropTypes.array,
};

export default HomeLayout;
