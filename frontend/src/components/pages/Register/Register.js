import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from '../Login/Login.module.scss';
import Button from 'components/Button';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { getAge } from 'lib/function/function';

const cx = classNames.bind(styles);

const genderList = ['Nam', 'Nữ', 'Khác'];

function Register() {
    const [input, setInput] = useState({
        email: '',
        username: '',
        password: '',
        repass: '',
        birthdate: '',
        gender: 0,
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

    const handleRatio = (event, value) => {
        event.preventDefault();
        setInput((prev) => ({ ...prev, gender: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // for avaiable input
        if (!input.email) setErr('Email không thể để trống');
        else if (!input.username) setErr('Họ và tên không thể để trống');
        else if (input.username.length > 100) setErr('Tên của bạn quá dài');
        else if (!input.password) setErr('Mật khẩu không thể để trống');
        else if (input.password.length < 8 || input.password.length > 50)
            setErr('Mật khẩu phải có 8 - 50 kí tự');
        else if (!input.repass) setErr('Nhập lại mật khẩu không thể để trống');
        else if (input.repass !== input.password) setErr('Mật khẩu nhập lại không trùng khớp');
        else if (!input.birthdate) setErr('Ngày sinh không thể để trống');
        else if (getAge(input.birthdate) <= 13) setErr('Độ tuổi tối thiểu là 13');
        else if (input.gender < 0 || input.gender > 3) setErr('Giới tính không tồn tại');
        else {
            setErr('');
            // send request
        }
    };

    return (
        <div className={cx('wraper')}>
            <div className={cx('form-container')}>
                <div className={cx('image-box')}>
                    <p className={cx('title')}>THAM GIA ChatTime</p>
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
                        <input
                            type="text"
                            name="username"
                            id="username"
                            placeholder="Họ và tên"
                            value={input.username}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={cx('pass-container')}>
                        <div className={cx('input-group')}>
                            <div className={cx('pass-input')}>
                                <input
                                    type={showPass ? 'text' : 'password'}
                                    name="password"
                                    id="password"
                                    placeholder="Mật khẩu"
                                    value={input.password}
                                    suggested="new-password"
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
                        </div>
                        <div className={cx('input-group')}>
                            <input
                                type="password"
                                name="repass"
                                id="repass"
                                placeholder="Nhập lại mật khẩu"
                                suggested="new-password"
                                value={input.repass}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className={cx('input-group')}>
                        <label className={cx('label')} htmlFor="birthdate">
                            Ngày sinh
                        </label>
                        <input
                            type="date"
                            name="birthdate"
                            id="birthdate"
                            value={input.birthdate}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={cx('input-group', 'ratio-group')}>
                        <label className={cx('gender-title')} htmlFor="birthdate">
                            Giới tính:
                        </label>
                        <div className={cx('ratio')}>
                            {genderList.map((gender, index) => (
                                <Button
                                    key={index}
                                    className={cx('gender', {
                                        'gender-selected': index === input.gender,
                                    })}
                                    type="primary"
                                    size="medium"
                                    onClick={(event) => handleRatio(event, index)}
                                >
                                    {gender}
                                </Button>
                            ))}
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
                        Đăng kí
                    </Button>
                </form>
                <p className={cx('signup')}>
                    Bạn đã có có tài khoản? <Link to="/login">Đăng nhập</Link>
                </p>
            </div>
        </div>
    );
}

export default Register;
