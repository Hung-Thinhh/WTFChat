import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './Login.module.scss';
import Button from 'components/Button';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';

const cx = classNames.bind(styles);

function Login() {
    const [input, setInput] = useState({
        email: '',
        password: ''
    });
    const [showPass, setShowPass] = useState(false);
    const [err, setErr] = useState('');

    const handleChange = (event) => {
        setInput((prev) => ({ ...prev, [event.target.name]: event.target.value }));
        if (err) setErr('');
    };

    const handlePassShow = (event) => {
        event.preventDefault();
        setShowPass((prev) => !prev);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // for avaiable input
        if (!input.email) setErr('Email không thể để trống');
        else if (!input.password) setErr('Mật khẩu không thể để trống');
        else if (input.password.length < 8 || input.password.length > 50)
            setErr('Mật khẩu phải có 8 - 50 kí tự');
        else {
            setErr('');
            // send request
        }
    };

    return (
        <div className={cx('wraper')}>
            <div className={cx('form-container')}>
                <div className={cx('image-box')}>
                    <img
                        className={cx('logo')}
                        src={process.env.PUBLIC_URL + 'logo512.png'}
                        alt="WTFChatLogo"
                    />
                    <p className={cx('title')}>Đăng nhập</p>
                </div>
                <form className={cx('form')}>
                    <div className={cx('input-group')}>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Email"
                            value={input.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={cx('input-group')}>
                        <div className={cx('pass-input')}>
                            <input
                                type={showPass ? 'text' : 'password'}
                                name="password"
                                id="password"
                                placeholder="Mật khẩu"
                                suggested="new-password"
                                value={input.password}
                                onChange={handleChange}
                            />
                            <button className={cx('eye-btn')} onClick={handlePassShow}>
                                {showPass ? (
                                    <FontAwesomeIcon icon={faEye} />
                                ) : (
                                    <FontAwesomeIcon icon={faEyeSlash} />
                                )}
                            </button>
                        </div>
                        <div className={cx('forgot')}>
                            <Link to="/forgetpass">Quên mật khẩu ?</Link>
                        </div>
                    </div>
                    {err && <div className={cx('err-tag')}>* {err}</div>}
                    <Button
                        className={cx('sign')}
                        type="rounded"
                        size="medium"
                        disabled={err}
                        onClick={handleSubmit}
                    >
                        Đăng nhập
                    </Button>
                </form>
                <p className={cx('signup')}>
                    Bạn chưa có tài khoản? <Link to="/register">Đăng kí</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;
