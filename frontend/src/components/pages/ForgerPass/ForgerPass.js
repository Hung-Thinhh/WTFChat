import classNames from 'classnames/bind';
import styles from '../Login/Login.module.scss';
import OTPForm from 'components/OTPForm';
import { Link } from 'react-router-dom';
import Button from 'components/Button';
import { useReducer, useState } from 'react';
import { initState, reducer } from './ForgetPassReducer/reducer';
import FindEmailForm from 'components/FindEmailForm/FindEmailForm';
import { setError, setLoading } from './ForgetPassReducer/action';
import { sendOTP } from 'controller/authen';

const cx = classNames.bind(styles);

function ForgetPass() {
    const [state, dispatch] = useReducer(reducer, initState);
    const [page, setPage] = useState(true);
    // const [countDown, setCountDown] = useState(30);

    const handleSendOTP = async (event) => {
        if (!state.searchUser.email) dispatch(setError('Chưa tìm kiếm tài khoản'));
        event.preventDefault();
        dispatch(setLoading(true));
        const res = await sendOTP({ email: state.searchUser.email });

        if (res.EC === '200') {
            alert('Kiểm tra hộp thư email của bạn');
            setPage(false);
            dispatch(setError(''));
        } else if (res.EC === '400') {
            dispatch(setError('Email không thể để trống'));
        } else if (res.EC === '401') {
            dispatch(setError('Đã hết lượt gửi trong ngày'));
        } else if (res.EC === '500') {
            alert('Lỗi hệ thống vui lòng báo cáo với chúng tôi! qua email: deptraivkl@gmail.com');
        }
        dispatch(setLoading(false));
    };

    const handleChangePass = async () => {};

    return (
        <div className={cx('wraper')}>
            <div className={cx('form-container')}>
                <div className={cx('image-box')}>
                    <p className={cx('title')}>Tìm kiếm tài khoản</p>
                </div>
                <form className={cx('form')}>
                    <FindEmailForm state={state} dispatch={dispatch} />
                    {/* <OTPForm state={state} dispatch={dispatch} /> */}
                    <div className={cx('btn-group')}>
                        {!!page || (
                            <Button
                                className={cx('sign')}
                                type="rounded"
                                size="medium"
                                disabled={!!state.err || state.loading}
                                onClick={setPage(true)}
                            >
                                Trở lại
                            </Button>
                        )}
                        <Button
                            className={cx('sign')}
                            type="rounded"
                            size="medium"
                            disabled={!!state.err || state.loading}
                            onClick={(e) => {
                                page ? handleSendOTP(e) : handleChangePass(e);
                            }}
                        >
                            {page ? 'Xác nhận' : 'Thay đổi'}
                        </Button>
                    </div>
                </form>
                {page === 1 && (
                    <p className={cx('signup')}>
                        Bạn chưa nhận được mã?{' '}
                        <Link to="" type="text">
                            Gửi lại mã
                        </Link>
                    </p>
                )}
            </div>
        </div>
    );
}

export default ForgetPass;
