import classNames from 'classnames/bind';
import styles from '../Login/Login.module.scss';
import OTPForm from 'components/OTPForm';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'components/Button';
import { useEffect, useReducer, useState } from 'react';
import { initState, reducer } from './ForgetPassReducer/reducer';
import FindEmailForm from 'components/FindEmailForm/FindEmailForm';
import { setError, setInput, setLoading, showPass } from './ForgetPassReducer/action';
import { changePass, sendOTP } from 'controller/authen';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import config from 'config';

const cx = classNames.bind(styles);

function ForgetPass() {
    const nav = useNavigate();
    const [state, dispatch] = useReducer(reducer, initState);
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

    const handlePassShow = (event) => {
        event.preventDefault();
        dispatch(showPass(state.showPass));
    };

    const handleChange = (event) => {
        dispatch(setInput({ key: event.target.name, value: event.target.value }));
        if (state.err) {
            dispatch(setError(''));
        }
    };

    const handleSendOTP = async (event) => {
        if (!state.searchUser.email) dispatch(setError('Chưa tìm kiếm tài khoản'));
        event.preventDefault();
        dispatch(setLoading(true));
        const res = await sendOTP({ email: state.searchUser.email });

        if (res.EC === '200') {
            alert('Kiểm tra hộp thư email của bạn');
            setPage(false);
            setCountDown(30);
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

    const handleChangePass = async (event) => {
        event.preventDefault();
        dispatch(setLoading(true));
        // for avaiable input
        if (!state.input.email) dispatch(setError('Email không thể để trống'));
        else if (state.input.password.length < 8 || state.input.password.length > 50)
            dispatch(setError('Mật khẩu phải có 8 - 50 kí tự'));
        else if (state.input.repass !== state.input.password)
            dispatch(setError('Mật khẩu nhập lại không trùng khớp'));
        else {
            const res = await changePass({
                email: state.searchUser.email,
                password: state.input.repass,
                otp: state.otp.join(''),
            });

            if (res.EC === '200') {
                nav(config.routes.login);
                alert('Thay đổi mật khẩu thành công!');
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

    return (
        <div className={cx('wraper')}>
            <div className={cx('form-container')}>
                <div className={cx('image-box')}>
                    <p className={cx('title')}>
                        {page ? 'Tìm kiếm tài khoản' : 'Thay đổi mật khẩu'}
                    </p>
                </div>
                <form className={cx('form')}>
                    {page ? (
                        <FindEmailForm state={state} dispatch={dispatch} />
                    ) : (
                        <>
                            <div className={cx('input-group')}>
                                <div className={cx('pass-input')}>
                                    <input
                                        type={state.showPass ? 'text' : 'password'}
                                        name="password"
                                        id="password"
                                        placeholder="Mật khẩu mới"
                                        value={state.input.password}
                                        suggested="new-password"
                                        onChange={handleChange}
                                    />
                                    <div className={cx('eye-btn')} onClick={handlePassShow}>
                                        {state.showPass ? (
                                            <FontAwesomeIcon icon={faEye} />
                                        ) : (
                                            <FontAwesomeIcon icon={faEyeSlash} />
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className={cx('input-group')}>
                                <input
                                    type="password"
                                    name="repass"
                                    id="repass"
                                    placeholder="Nhập lại mật khẩu"
                                    suggested="new-password"
                                    value={state.input.repass}
                                    onChange={handleChange}
                                />
                            </div>
                            <OTPForm state={state} dispatch={dispatch} />
                        </>
                    )}
                    {!!state.err && <div className={cx('err-tag')}>* {state.err}</div>}
                    <div className={cx('btn-group')}>
                        {!!page || (
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
                                page ? handleSendOTP(e) : handleChangePass(e);
                            }}
                        >
                            {page ? 'Xác nhận' : 'Thay đổi'}
                        </Button>
                    </div>
                </form>
                {page || (
                    <p className={cx('signup')}>
                        Bạn chưa nhận được mã?{' '}
                        <Link
                            to=""
                            type="text"
                            onClick={(e) => {
                                handleSendOTP(e);
                                setCountDown(30);
                            }}
                        >
                            {countDown <= 0 ? 'Gửi lại mã' : countDown + 's'}
                        </Link>
                    </p>
                )}
            </div>
        </div>
    );
}

export default ForgetPass;
