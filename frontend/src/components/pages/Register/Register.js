import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from '../Login/Login.module.scss';
import Button from 'components/Button';
import { useReducer, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { getAge } from 'lib/function/function';
import { register } from 'controller/authen';
import config from 'config';
import RegisterForm from './RegisterForm';
import { initState, reducer } from './RegisterReducer/reducer';
import { setError, setLoading } from './RegisterReducer/action';

const cx = classNames.bind(styles);

function Register() {
    const nav = useNavigate();
    const [state, dispatch] = useReducer(reducer, initState);
    // const [input, setInput] = useState({
    //     email: '',
    //     username: '',
    //     password: '',
    //     repass: '',
    //     birthdate: '',
    //     gender: 0,
    // });
    // const [showPass, setShowPass] = useState(false);
    // const [err, setErr] = useState('');
    // const [loading, setLoading] = useState(false);

    // const handleChange = (event) => {
    //     dispatch({
    //         type: SET_INPUT,
    //         payload: { key: event.target.name, value: event.target.value },
    //     });
    //     if (err) dispatch({ type: SET_ERROR, payload: true });
    // };

    // const handlePassShow = (event) => {
    //     event.preventDefault();
    //     setShowPass((prev) => !prev);
    // };

    // const handleRatio = (event, value) => {
    //     event.preventDefault();
    //     setInput((prev) => ({ ...prev, gender: value }));
    // };

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
            const res = await register({ ...state.input, password: state.input.repass });

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

    return (
        <div className={cx('wraper')}>
            <div className={cx('form-container')}>
                <div className={cx('image-box')}>
                    <p className={cx('title')}>THAM GIA ChatTime</p>
                </div>
                <form className={cx('form')}>
                    <RegisterForm />
                    {!!state.err && <div className={cx('err-tag')}>* {state.err}</div>}
                    <Button
                        className={cx('sign')}
                        type="rounded"
                        size="medium"
                        disabled={!!state.err || state.loading}
                        onClick={handleSubmit}
                    >
                        Đăng kí
                    </Button>
                </form>
                <p className={cx('signup')}>
                    Bạn đã có có tài khoản? <Link to={config.routes.login}>Đăng nhập</Link>
                </p>
            </div>
        </div>
    );
}

export default Register;
