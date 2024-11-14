import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from 'components/pages/Login/Login.module.scss';
import Button from 'components/Button';
// import { useReducer, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
// import { getAge } from 'lib/function/function';
// import { register, sendVerifyMail } from 'controller/authen';
// import config from 'config';
// import { initState, reducer } from '../RegisterReducer/reducer';
// import { setError, setInput, showPass } from '../RegisterReducer/action';
import { useDispatch, useSelector } from 'react-redux';
import { setInput, showPass, setError } from '../registerSlice';
import { registerSelector } from '../../../../redux/selectors';

const cx = classNames.bind(styles);

const genderList = ['Nam', 'Nữ', 'Khác'];

// function RegisterForm({ state, dispatch }) {
function RegisterForm() {
    // redux
    const state = useSelector(registerSelector);
    const dispatch = useDispatch();

    const handleChange = (event) => {
        dispatch(setInput({ key: event.target.name, value: event.target.value }));
        if (state.err) {
            dispatch(setError(''));
        }
    };

    const handlePassShow = (event) => {
        event.preventDefault();
        dispatch(showPass(state.showPass));
    };

    const handleRatio = (event, value) => {
        event.preventDefault();
        dispatch(setInput({ key: 'gender', value: value }));
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
            <div className={cx('input-group')}>
                <input
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Họ và tên"
                    value={state.input.username}
                    onChange={handleChange}
                />
            </div>
            <div className={cx('pass-container')}>
                <div className={cx('input-group')}>
                    <div className={cx('pass-input')}>
                        <input
                            type={state.showPass ? 'text' : 'password'}
                            name="password"
                            id="password"
                            placeholder="Mật khẩu"
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
            </div>
            <div className={cx('input-group')}>
                <label className={cx('label')} htmlFor="birthdate">
                    Ngày sinh
                </label>
                <input
                    type="date"
                    name="birthdate"
                    id="birthdate"
                    value={state.input.birthdate}
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
                                'gender-selected': index === state.input.gender,
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
        </>
    );
}

export default RegisterForm;
