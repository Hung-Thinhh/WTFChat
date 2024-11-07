import classNames from 'classnames/bind';

import styles from './Profile.module.scss';
import Button from 'components/Button';
import { useEffect, useRef, useState } from 'react';
import Avatar from 'components/Avatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRotateLeft, faCamera, faPen } from '@fortawesome/free-solid-svg-icons';
import { getUserInfo, updateUserInfo } from 'controller/profile';
import { getAge } from 'lib/function/function';

const cx = classNames.bind(styles);

const genderList = ['Nam', 'Nữ', 'Khác'];

function Profile() {
    const fileInput = useRef(null);

    const [initInput, setInitInput] = useState({
        email: '',
        username: '',
        birthdate: '',
        gender: 0,
        avatar: '',
    });
    const [input, setInput] = useState({
        email: '',
        username: '',
        birthdate: '',
        gender: 0,
        avatar: '',
    });
    const [file, setFile] = useState();
    const [err, setErr] = useState('');
    const [loading, setLoading] = useState(false);
    const [currAvt, setCurrAvt] = useState('');

    const logout = async () => {
        // logout
        const logoutRes = await logout();

        if (logoutRes.EC === '200') {
            window.location.reload();
        } else if (logoutRes.EC === '500') {
            alert('Lỗi hệ thống vui lòng báo cáo với chúng tôi! qua email: deptraivkl@gmail.com');
        }
    };

    useEffect(() => {
        const getCurrUserInfo = async () => {
            const res = await getUserInfo();
            if (res.EC === '200') {
                const { avatar, birthdate, email, firstname, lastname, gender } = res.DT;
                const dateObject = new Date(birthdate);
                const formatBirthdate = dateObject.toISOString().slice(0, 10);

                const newInput = {
                    email,
                    username: firstname + ' ' + lastname,
                    birthdate: formatBirthdate,
                    gender,
                    avatar,
                };
                setInput(newInput);
                setInitInput(newInput);
            } else if (res.EC === '400') {
                alert('Tài khoản đang bị khoá');
                await logout();
            } else if (res.EC === '403') {
                alert('Xác thực thất bại');
                await logout();
            } else if (res.EC === '500') {
                alert(
                    'Lỗi hệ thống vui lòng báo cáo với chúng tôi! qua email: deptraivkl@gmail.com',
                );
            }
        };
        getCurrUserInfo();
    }, []);

    const handleFileChoose = () => {
        fileInput.current.click();
    };

    const handleBack = () => {
        if (input.avatar) {
            URL.revokeObjectURL(input.avatar); // clear prev url
        }

        setInput(initInput);
    };

    const handleChange = (event) => {
        setInput((prev) => ({ ...prev, [event.target.name]: event.target.value }));
        if (err) setErr('');
    };

    const handleChangeImage = (event) => {
        const file = event.target.files[0];

        if (!file) return;

        const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];

        if (!allowedTypes.includes(file.type)) {
            setErr('Hãy chọn thư mục có đuổi .png, .jpg hoặc .jpeg.');
        }

        if (input.avatar) {
            URL.revokeObjectURL(input.avatar); // clear prev url
        }

        setInput((prev) => ({ ...prev, avatar: URL.createObjectURL(file) }));
        if (err) setErr('');
    };

    const handleRatio = (event, value) => {
        event.preventDefault();
        setInput((prev) => ({ ...prev, gender: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        // for avaiable input
        if (JSON.stringify(input) === JSON.stringify(initInput))
            setErr('Không có thay đổi được thực hiện');
        else if (!input.email) setErr('Email không thể để trống');
        else if (!input.username) setErr('Họ và tên không thể để trống');
        else if (input.username.length > 100) setErr('Tên của bạn quá dài');
        else if (!input.birthdate) setErr('Ngày sinh không thể để trống');
        else if (getAge(input.birthdate) <= 13) setErr('Độ tuổi tối thiểu là 13');
        else if (input.gender < 0 || input.gender > 3) setErr('Giới tính không tồn tại');
        else {
            const formData = new FormData();
            // Add image data
            formData.append('avatar', file, file.name);

            // Add user data
            formData.append('username', input.username);
            formData.append('birthdate', input.birthdate);
            formData.append('gender', input.gender);
            const res = await updateUserInfo(formData);
            if (res.EC === '200') {
                // set mặc định thành input
                setInitInput(input);
            } else if (res.EC === '400') {
                setErr(res.EM);
                setInput(initInput);
            } else if (res.EC === '500') {
                alert(
                    'Lỗi hệ thống vui lòng báo cáo với chúng tôi! qua email: deptraivkl@gmail.com',
                );
                setErr('');
                setInput(initInput);
            }
        }
        setLoading(false);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <p className={cx('title')}>Thông tin cá nhân</p>
                <div className={cx('profile-cont')}>
                    <form className={cx('form')}>
                        <div className={cx('input-group')}>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Email"
                                value={'binhminh19112003@gmail.com'}
                                onChange={handleChange}
                                disabled
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
                        {!!err && <div className={cx('err-tag')}>* {err}</div>}
                    </form>
                    <div className={cx('avatar-form')}>
                        <Avatar alt="avatar" src={input.avatar} size="ultra-lg" />
                        <input
                            className={cx('file-input')}
                            ref={fileInput}
                            type="file"
                            value={file}
                            accept="image/png, image/jpeg, image/jpg"
                            onChange={handleChangeImage}
                        />
                        <button className={cx('upload-img-btn')} onClick={handleFileChoose}>
                            <FontAwesomeIcon icon={faPen} />
                        </button>
                    </div>
                </div>
                <div className={cx('button-group')}>
                    {JSON.stringify(input) !== JSON.stringify(initInput) && (
                        <Button
                            className={cx('sign')}
                            type="rounded"
                            size="medium"
                            disabled={!!err || loading}
                            onClick={handleBack}
                        >
                            Trở lại
                        </Button>
                    )}
                    <Button
                        className={cx('sign')}
                        type="rounded"
                        size="medium"
                        disabled={
                            !!err || loading || JSON.stringify(input) === JSON.stringify(initInput)
                        }
                        onClick={handleSubmit}
                    >
                        Lưu
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Profile;
