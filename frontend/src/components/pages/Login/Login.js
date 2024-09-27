import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './Login.module.scss';
import Button from '../../../components/Button';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Login() {
    const [imput, setInput] = useState({
        email: '',
        passwork: '',
    });

    return (
        <div className={cx('wraper')}>
            <div className={cx('form-container')}>
                <div className={cx('image-box')}>
                    <img
                        className={cx('logo')}
                        src={process.env.PUBLIC_URL + 'logo512.png'}
                        alt="WTFChatLogo"
                    />
                    <p className={cx('title')}>Login</p>
                </div>
                <form className={cx('form')}>
                    <div className={cx('input-group')}>
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" placeholder="" />
                    </div>
                    <div className={cx('input-group')}>
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" placeholder="" />
                        <div className={cx('forgot')}>
                            <Link to="/forgetpass">Forgot Password ?</Link>
                        </div>
                    </div>
                    <Button className={cx('sign')} type="rounded" size="medium">
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
