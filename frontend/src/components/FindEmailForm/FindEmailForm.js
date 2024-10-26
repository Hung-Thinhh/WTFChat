import classNames from 'classnames/bind';
import styles from './FindEmailForm.module.scss';
import Avatar from 'components/Avatar';
import {
    setError,
    setInput,
    setSearchUser,
} from 'components/pages/ForgerPass/ForgetPassReducer/action';
import { setLoading } from 'components/pages/Register/RegisterReducer/action';
import Button from 'components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { searchMail } from 'controller/authen';

const cx = classNames.bind(styles);

function FindEmailForm({ state, dispatch }) {
    const handleChange = (event) => {
        console.log('aaa');

        dispatch(setInput({ key: event.target.name, value: event.target.value }));
        if (state.err) dispatch(setError(''));
    };

    const handleSearchEmail = async (event) => {
        event.preventDefault();
        dispatch(setLoading(true));

        const res = await searchMail({ email: state.input.email });

        if (res.EC === '200') {
            dispatch(setSearchUser(res.DT));
        } else if (res.EC === '400') {
            dispatch(setSearchUser('Tài khoản không tồn tại'));
        } else if (res.EC === '500') {
            alert('Lỗi hệ thống vui lòng báo cáo với chúng tôi! qua email: deptraivkl@gmail.com');
        }
        dispatch(setLoading(false));
    };

    return (
        <>
            <div className={cx('input-group')}>
                <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    value={state.input.email}
                    onChange={handleChange}
                />
                <Button
                    className={cx('search-btn')}
                    type="circle"
                    size="small"
                    onClick={handleSearchEmail}
                >
                    <FontAwesomeIcon icon={faSearch} />
                </Button>
            </div>
            {state.searchUser ? (
                <>
                    <p className={cx('sub-heading')}>Đây có phải là tài khoản của bạn?</p>
                    <div className={cx('input-group', 'userinfo_group')}>
                        <Avatar alt="avatar" src={state.searchUser.avatar} size="large" />
                        <p>Email: {state.searchUser.email}</p>
                        <p>
                            Họ và tên:{' '}
                            {state.searchUser.firstname + ' ' + state.searchUser.lastname}
                        </p>
                    </div>
                </>
            ) : (
                <p className={cx('sub-heading')}>Tài khoản không tồn tại</p>
            )}
        </>
    );
}

export default FindEmailForm;
