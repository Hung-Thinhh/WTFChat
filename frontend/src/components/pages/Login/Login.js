import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './Login.module.scss';
import Button from 'components/Button';
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { login } from 'controller/authen';
import ChatDataContext from 'lib/Context/ChatContext';
import config from 'config';

const cx = classNames.bind(styles);

function Login() {
    const nav = useNavigate(); // for nav page
    const { setCurrUser } = useContext(ChatDataContext);
    const [input, setInput] = useState({
        email: '',
        password: '',
        remember: false,
    });
    const [showPass, setShowPass] = useState(false);
    const [err, setErr] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (event) => {
        setInput((prev) => ({ ...prev, [event.target.name]: event.target.value }));
        if (err) setErr('');
    };

    const handlePassShow = (event) => {
        event.preventDefault();
        setShowPass((prev) => !prev);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        // for avaiable input
        if (!input.email) setErr('Email không thể để trống');
        else if (!input.password) setErr('Mật khẩu không thể để trống');
        else if (input.password.length < 8 || input.password.length > 50)
            setErr('Mật khẩu phải có 8 - 50 kí tự');
        else {
            const res = await login(input);
            if (res.EC === '200') {
                // dang nhap thanh cong
                setCurrUser(res.DT);
                localStorage.setItem("jwt", JSON.stringify(res.DT));
                nav(config.routes.home);
            }   
            if (res.EC === '201') {
                // dang nhap quan tri thanh cong
                window.location.href = config.routes.admin;
            } else if (res.EC === '400') {
                setErr(res.EM);
            } else if (res.EC === '500') {
                alert(
                    'Lỗi hệ thống vui lòng báo cáo với chúng tôi! qua email: deptraivkl@gmail.com',
                );
                setErr('');
            }
        }
        setLoading(false);
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
                            <div className={cx('eye-btn')} onClick={handlePassShow}>
                                {showPass ? (
                                    <FontAwesomeIcon icon={faEye} />
                                ) : (
                                    <FontAwesomeIcon icon={faEyeSlash} />
                                )}
                            </div>
                        </div>
                        <div className={cx('forgot')}>
                            <Link to={config.routes.forgetpassword}>Quên mật khẩu ?</Link>
                        </div>
                    </div>
                    <div className={cx('input-group', 'remeber-box')}>
                        <input
                            type="checkbox"
                            name="remember"
                            value={input.remember}
                            onChange={handleChange}
                        />
                        <label htmlFor="remember">Ghi nhớ đăng nhập</label>
                    </div>
                    {err && <div className={cx('err-tag')}>* {err}</div>}
                    <Button
                        className={cx('sign')}
                        type="rounded"
                        size="medium"
                        disabled={err || loading}
                        onClick={handleSubmit}
                    >
                        Đăng nhập
                    </Button>
                </form>
                <p className={cx('signup')}>
                    Bạn chưa có tài khoản? <Link to={config.routes.register}>Đăng kí</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;
