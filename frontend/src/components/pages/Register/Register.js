import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from '../Login/Login.module.scss';
import Button from 'components/Button';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';

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

    const handleChange = (event) => {
        setInput((prev) => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const handlePassShow = (event) => {
        event.preventDefault();
        setShowPass((prev) => !prev);
    };

    const handleRatio = (event, value) => {
        event.preventDefault();
        setInput((prev) => ({ ...prev, gender: value }));
    };

    return (
        <div className={cx('wraper')}>
            <div className={cx('form-container')}>
                <div className={cx('image-box')}>
                    <p className={cx('title')}>THAM GIA CHATTIME</p>
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
                    <Button className={cx('sign')} type="rounded" size="medium">
                        Đăng nhập
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
