import classNames from 'classnames/bind';

import styles from './Profile.module.scss';
import Button from 'components/Button';
import { useEffect, useRef, useState } from 'react';
import Avatar from 'components/Avatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRotateLeft, faCamera, faPen } from '@fortawesome/free-solid-svg-icons';
import { getUserInfo, updateUserInfo } from 'controller/profile';
import { getAge } from 'lib/function/function';
import { useDispatch, useSelector } from 'react-redux';
import { profileSelector } from '../../../redux/selectors';
import { fetchUser, setError, setInitInput, setInput, setLoading } from './profileSlice';

const cx = classNames.bind(styles);

const genderList = ['Nam', 'Nữ', 'Khác'];

function Profile() {
    const fileInput = useRef(null);

    const dispatch = useDispatch();
    const state = useSelector(profileSelector);

    useEffect(() => {
        const getCurrUserInfo = async () => {
            dispatch(fetchUser());
        };
        getCurrUserInfo();
    }, []);

    const handleFileChoose = () => {
        fileInput.current.click();
    };

    const handleBack = () => {
        if (state.input.avatar) {
            URL.revokeObjectURL(state.input.avatar); // clear prev url
        }

        dispatch(setInput(state.initInput));
    };

    const handleChange = (event) => {


        dispatch(setInput({ ...state.input, [event.target.name]: event.target.value }));
        if (state.err) dispatch(setError(''));
    };

    const handleChangeImage = (event) => {
        const newFile = event.target.files[0];
        if (!newFile) return;

        const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];

        if (!allowedTypes.includes(newFile.type)) {
            dispatch(setError('Hãy chọn thư mục có đuổi .png, .jpg hoặc .jpeg.'));
        }

        if (state.input.avatar) {
            URL.revokeObjectURL(state.input.avatar); // clear prev url
        }

        dispatch(setInput({ ...state.input, avatar: URL.createObjectURL(newFile) }));
        // setFile(newFile);
        if (state.err) dispatch(setError(''));
    };

    const handleRatio = (event, value) => {
        event.preventDefault();
        dispatch(setInput({ ...state.input, gender: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        dispatch(setLoading(true));

        // for avaiable input
        if (JSON.stringify(state.input) === JSON.stringify(state.initInput))
            setError('Không có thay đổi được thực hiện');
        else if (!state.input.email) setError('Email không thể để trống');
        else if (!state.input.username) setError('Họ và tên không thể để trống');
        else if (state.input.username.length > 100) setError('Tên của bạn quá dài');
        else if (!state.input.birthdate) setError('Ngày sinh không thể để trống');
        else if (getAge(state.input.birthdate) <= 13) setError('Độ tuổi tối thiểu là 13');
        else if (state.input.gender < 0 || state.input.gender > 3)
            setError('Giới tính không tồn tại');
        else {
            const formData = new FormData();
            // Add image data
            const avatar = fileInput.current.files[0];
            if (avatar) formData.append('avatar', avatar, avatar.name);

            // Add user data
            formData.append('username', state.input.username);
            formData.append('birthdate', state.input.birthdate);
            formData.append('gender', state.input.gender);
            for (const [key, value] of formData.entries()) {
                console.log(`${key}: ${value}`);
            }

            const res = await updateUserInfo(formData);
            if (res.EC === '200') {
                // set mặc định thành input
                dispatch(setInitInput(state.input));
                alert('Thay đổi thông tin thành công');
            } else if (res.EC === '400') {
                dispatch(setError(res.EM));
                dispatch(setInput(state.initInput));
            } else if (res.EC === '500') {
                alert(
                    'Lỗi hệ thống vui lòng báo cáo với chúng tôi! qua email: deptraivkl@gmail.com',
                );
                dispatch(setError(''));
                dispatch(setInput(state.initInput));
            }
        }
        dispatch(setLoading(false));
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
                                value={state.input.email}
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
                                value={state.input.username}
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
                        {!!state.err && <div className={cx('err-tag')}>* {state.err}</div>}
                    </form>
                    <div className={cx('avatar-form')}>
                        <Avatar alt="avatar" src={state.input.avatar} size="ultra-lg" />
                        <input
                            className={cx('file-input')}
                            ref={fileInput}
                            type="file"
                            // value={file}
                            accept="image/png, image/jpeg, image/jpg"
                            onChange={handleChangeImage}
                        />
                        <button className={cx('upload-img-btn')} onClick={handleFileChoose}>
                            <FontAwesomeIcon icon={faPen} />
                        </button>
                    </div>
                </div>
                <div className={cx('button-group')}>
                    {JSON.stringify(state.input) !== JSON.stringify(state.initInput) && (
                        <Button
                            className={cx('sign')}
                            type="rounded"
                            size="medium"
                            disabled={!!state.err || state.loading}
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
                            !!state.err ||
                            state.loading ||
                            JSON.stringify(state.input) === JSON.stringify(state.initInput)
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
