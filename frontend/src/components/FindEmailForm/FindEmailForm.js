import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './FindEmailForm.module.scss';
import Button from 'components/Button';
import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { login } from 'controller/authen';
import ChatDataContext from 'lib/Context/ChatContext';
import config from 'config';
import Avatar from 'components/Avatar';
import { setError, setInput } from 'components/pages/ForgerPass/ForgetPassReducer/action';
import { useDebounce } from 'hooks';

const cx = classNames.bind(styles);

function FindEmailForm({ state, dispatch }) {
    const emailDebounce = useDebounce(state.input.email, 1000);
    const [searchUser, setSearchUser] = useState(null);

    useEffect(() => {
        if (emailDebounce === '') {
            setSearchUser(null);
            return;
        }

        const fetchApi = async () => {
            // setLoading(true);
            // const response = await fetch('/api/v1/search/search', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({ searchValue }),
            // });
            // if (response.ok) {
            //     // setLoading(false);
            //     const res: ResultInterface = await response.json();
            //     setSearchResult(res);
            // } else if (response.status === 400) {
            //     showAlert('!', 'error');
            // } else if (response.status === 500) {
            //     showAlert('Lỗi, hãy báo cáo lại với chúng tôi cảm ơn', 'error');
            // }
        };

        fetchApi();
    }, [emailDebounce]);

    const handleChange = (event) => {
        dispatch(setInput({ key: event.target.name, value: event.target.value }));
        if (state.err) dispatch(setError(''));
        // setInput((prev) => ({ ...prev, [event.target.name]: event.target.value }));
        // if (err) setErr('');
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
            </div>
            {searchUser ? (
                <>
                    <p className={cx('sub-heading')}>Đây có phải là tài khoản của bạn?</p>
                    <div className={cx('input-group', 'userinfo_group')}>
                        <Avatar alt="" src="" size="large" />
                        <p>Email: binhminh19112003@gmail.com</p>
                    </div>
                </>
            ) : (
                <p className={cx('sub-heading')}>Không thể tìm thấy tài khoản của bạn</p>
            )}
        </>
    );
}

export default FindEmailForm;
