import classNames from 'classnames/bind';
import styles from '../Login/Login.module.scss';
import OTPForm from 'components/OTPForm';
import { Link } from 'react-router-dom';
import Button from 'components/Button';

const cx = classNames.bind(styles);

function ForgetPass() {
    return (
        <div className={cx('wraper')}>
            <div className={cx('form-container')}>
                <div className={cx('image-box')}>
                    <p className={cx('title')}>Nhập mã OTP</p>
                </div>
                <form className={cx('form')}>
                    <OTPForm />
                    <Button
                        className={cx('sign')}
                        type="rounded"
                        size="medium"
                        // disabled={err || loading}
                        // onClick={handleSubmit}
                    >
                        Xác nhận
                    </Button>
                </form>
                <p className={cx('signup')}>
                    Bạn chưa nhận được mã?{' '}
                    <Link to="" type="text">
                        Gửi lại mã
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default ForgetPass;
