import classNames from 'classnames/bind';

import styles from './OTPForm.module.scss';
import { useRef, useState } from 'react';
// import { setError, setOTP } from 'components/pages/Register/RegisterReducer/action';
import { setError, setOTP } from '../pages/Register/registerSlice';
import { useDispatch, useSelector } from 'react-redux';
import { registerSelector } from '../../redux/selectors';

const cx = classNames.bind(styles);

// function OTPForm({ state, dispatch }) {
function OTPForm() {
    // const [otp, setOtp] = useState(Array(6).fill(''));
    const inputRefs = useRef(Array(6).fill(null));
    // redux
    const state = useSelector(registerSelector);
    const dispatch = useDispatch();

    const handleInputChange = (index, value) => {
        const newOtp = [...state.otp];
        newOtp[index] = value;
        dispatch(setOTP(newOtp));
        dispatch(setError(''));

        if (value.length === 0) {
            // Check if input is empty (character deleted)
            if (index > 0) {
                inputRefs.current[index - 1].focus(); // Move focus to the previous input
            }
        } else if (index < 5 && value.length === 1) {
            // Move to the next input if there's a character
            inputRefs.current[index + 1].focus();
        }
    };

    // keyboard short cut
    const handleKeyDown = (e, index) => {
        if (e.keyCode === 8 && e.target.value === '') {
            // Backspace and input is empty
            if (index > 0) {
                e.preventDefault();
                inputRefs.current[index - 1].focus();
            }
        } else if (e.keyCode === 37) {
            // <
            if (index > 0) {
                e.preventDefault();
                inputRefs.current[index - 1].focus();
                inputRefs.current[index - 1].setSelectionRange(1, 1);
            }
        } else if (e.keyCode === 39) {
            // >
            if (index < 5) {
                e.preventDefault();
                inputRefs.current[index + 1].focus();
            }
        } else if (e.keyCode === 35) {
            // End
            if (index < 5) {
                e.preventDefault();
                inputRefs.current[5].focus();
            }
        } else if (e.keyCode === 36) {
            // Home
            if (index > 0) {
                e.preventDefault();
                inputRefs.current[0].focus();
            }
        } else if (e.keyCode !== 8) {
            // all key except backspace
            if (index < 5 && e.target.value !== '') {
                e.preventDefault();
                inputRefs.current[index + 1].focus();
            }
        }
    };

    const handlePaste = (e, index) => {
        e.preventDefault();

        let pastedText = e.clipboardData.getData('text/plain');

        if (pastedText.length > 6) pastedText = pastedText.substring(0, 6);

        const newOtp = [...state.otp];
        newOtp.splice(0, 6, ...pastedText.split(''));
        dispatch(setOTP(newOtp));

        if (pastedText.length > index + 1) {
            inputRefs.current[index + 1].focus();
        }
    };

    return (
        <>
            <p className={cx('otpSubheading')}>Chúng tôi đã gửi mã bảo mật đến email của bạn</p>
            <div className={cx('inputContainer')}>
                {state.otp.map((value, index) => (
                    <input
                        key={index}
                        ref={(el) => (inputRefs.current[index] = el)}
                        className={cx('otp-input')}
                        maxLength="1"
                        type="text"
                        value={value}
                        onChange={(e) => handleInputChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        onPaste={(e) => handlePaste(e, index)}
                    />
                ))}
            </div>
        </>
    );
}

export default OTPForm;
