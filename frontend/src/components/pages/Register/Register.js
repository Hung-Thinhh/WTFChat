import classNames from 'classnames/bind';

import styles from '../Login/Login.module.scss';
import Button from 'components/Button';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAge } from 'lib/function/function';
import { register, sendOTP } from 'controller/authen';
import config from 'config';
import RegisterForm from './RegisterForm';
import { setError, setLoading } from './registerSlice';
import OTPForm from 'components/OTPForm';
import { useDispatch, useSelector } from 'react-redux';
import { registerSelector } from '../../../redux/selectors';

const cx = classNames.bind(styles);

function Register() {
    const nav = useNavigate();
    // redux
    const state = useSelector(registerSelector);
    const dispatch = useDispatch();
    const [page, setPage] = useState(true);
    const [countDown, setCountDown] = useState(30);

    useEffect(() => {
        const id = setInterval(() => {
            if (countDown <= 0) clearInterval(id);
            setCountDown((prev) => prev - 1);
        }, 1000);

        return () => {
            clearInterval(id);
        };
    }, [countDown]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        dispatch(setLoading(true));
        // for avaiable input
        if (!state.input.email) dispatch(setError('Email không thể để trống'));
        else if (!state.input.username) dispatch(setError('Họ và tên không thể để trống'));
        else if (state.input.username.length > 100) dispatch(setError('Tên của bạn quá dài'));
        else if (state.input.password.length < 8 || state.input.password.length > 50)
            dispatch(setError('Mật khẩu phải có 8 - 50 kí tự'));
        else if (state.input.repass !== state.input.password)
            dispatch(setError('Mật khẩu nhập lại không trùng khớp'));
        else if (!state.input.birthdate) dispatch(setError('Ngày sinh không thể để trống'));
        else if (getAge(state.input.birthdate) <= 13) dispatch(setError('Độ tuổi tối thiểu là 13'));
        else if (state.input.gender < 0 || state.input.gender > 3)
            dispatch(setError('Giới tính không tồn tại'));
        else {
            const res = await register({
                ...state.input,
                password: state.input.repass,
                otp: state.otp.join(''),
            });

            if (res.EC === '200') {
                // dang ki thanh cong
                nav(config.routes.login);
                alert('Đăng kí tài khoản thành công!');
                dispatch(setError(''));
            } else if (res.EC === '400') {
                dispatch(setError(res.EM));
            } else if (res.EC === '500') {
                alert(
                    'Lỗi hệ thống vui lòng báo cáo với chúng tôi! qua email: deptraivkl@gmail.com',
                );
            }
        }

        dispatch(setLoading(false));
    };

    const handleOtpVerify = async (event) => {
        event.preventDefault();
        dispatch(setLoading(true));
        const res = await sendOTP({ email: state.input.email });

        if (res.EC === '200') {
            alert('Kiểm tra hộp thư email của bạn');
            dispatch(setError(''));
            setPage(false);
            setCountDown(30);
        } else if (res.EC === '400') {
            dispatch(setError('Email không thể để trống'));
        } else if (res.EC === '401') {
            dispatch(setError('Đã hết lượt gửi trong ngày'));
        } else if (res.EC === '500') {
            alert('Lỗi hệ thống vui lòng báo cáo với chúng tôi! qua email: deptraivkl@gmail.com');
        }
        dispatch(setLoading(false));
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('form-container')}>
                <div className={cx('image-box')}>
                    <p className={cx('title')}>{page ? 'THAM GIA ChatTime' : 'Nhập mã OTP'}</p>
                </div>
                <form className={cx('form')}>
                    {page ? (
                        // <RegisterForm state={state} dispatch={dispatch} />
                        <RegisterForm />
                    ) : (
                        <OTPForm />
                    )}
                    {!!state.err && <div className={cx('err-tag')}>* {state.err}</div>}
                    <div className={cx('btn-group')}>
                        {page || (
                            <Button
                                className={cx('sign')}
                                type="rounded"
                                size="medium"
                                disabled={!!state.err || state.loading}
                                onClick={() => setPage(true)}
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
                                page ? handleOtpVerify(e) : handleSubmit(e);
                            }}
                        >
                            {page ? 'Đăng kí' : 'Xác nhận'}
                        </Button>
                    </div>
                </form>
                <p className={cx('signup')}>
                    {page ? (
                        <>
                            Bạn đã có có tài khoản? <Link to={config.routes.login}>Đăng nhập</Link>
                        </>
                    ) : (
                        <>
                            Bạn chưa nhận được mã?{' '}
                            <Link
                                to=""
                                type="text"
                                onClick={(e) => {
                                    handleOtpVerify(e);
                                    setCountDown(30);
                                }}
                            >
                                {countDown <= 0 ? 'Gửi lại mã' : countDown + 's'}
                            </Link>
                        </>
                    )}
                </p>
            </div>
        </div>
    );
}

export default Register;
