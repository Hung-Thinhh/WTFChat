import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from '../HomeLayout/HomeLayout.module.scss';
import RightSidebar from './RightSidebar';
import LeftSiedbar from './LeftSidebar';

const cx = classNames.bind(styles);

function HomeLayout({ children, contactInfo }) {
    return (
        <div className={cx('wrapper')}>
            <RightSidebar />
            <div className={cx('content')}>
                {children}
                <LeftSiedbar /></div>
        </div>
    );
}

HomeLayout.propTypes = {
    children: PropTypes.node.isRequired,
    contactInfo: PropTypes.array,
};

export default HomeLayout;
