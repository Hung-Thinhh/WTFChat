import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from '../HomeLayout/HomeLayout.module.scss';
import RightSidebar from './RightSidebar';

const cx = classNames.bind(styles);

function HomeLayout({ children, contactInfo }) {
    return (
        <div className={cx('wrapper')}>
            <RightSidebar />
            {children}
        </div>
    );
}

HomeLayout.propTypes = {
    children: PropTypes.node.isRequired,
    contactInfo: PropTypes.array,
};

export default HomeLayout;
