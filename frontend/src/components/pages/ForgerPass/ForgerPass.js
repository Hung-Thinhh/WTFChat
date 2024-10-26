import classNames from 'classnames/bind';
import styles from '../Login/Login.module.scss';
import OTPForm from 'components/OTPForm';
import { Link } from 'react-router-dom';
import Button from 'components/Button';
import { useReducer, useState } from 'react';
import { initState, reducer } from './ForgetPassReducer/reducer';
import FindEmailForm from 'components/FindEmailForm/FindEmailForm';

const cx = classNames.bind(styles);

function ForgetPass() {
    const [state, dispatch] = useReducer(reducer, initState);
    const [page, setPage] = useState(0);
    // const [countDown, setCountDown] = useState(30);

    const handleSendOTP = async () => {};

    return (
        <div className={cx('wraper')}>
            <div className={cx('form-container')}>
                <div className={cx('image-box')}>
                    <p className={cx('title')}>Tìm kiếm tài khoản</p>
                </div>
                <form className={cx('form')}>
                    {/* <OTPForm state={state} dispatch={dispatch} /> */}
                    <FindEmailForm state={state} dispatch={dispatch} />
                    <div className={cx('btn-group')}>
                        {!!page && (
                            <Button
                                className={cx('sign')}
                                type="rounded"
                                size="medium"
                                // disabled={!!state.err || state.loading}
                                // onClick={setPage(true)}
                            >
                                Trở lại
                            </Button>
                        )}
                        <Button
                            className={cx('sign')}
                            type="rounded"
                            size="medium"
                            // disabled={!!state.err || state.loading}
                            // onClick={(e) => {
                            //     page ? handleOtpVerify(e) : handleSubmit(e);
                            // }}
                        >
                            {page ? 'Đăng kí' : 'Xác nhận'}
                        </Button>
                    </div>
                </form>
                {page === 1 && (
                    <p className={cx('signup')}>
                        Bạn chưa nhận được mã?{' '}
                        <Link to="" type="text">
                            Gửi lại mã
                        </Link>
                    </p>
                )}
            </div>
        </div>
    );
}

export default ForgetPass;
