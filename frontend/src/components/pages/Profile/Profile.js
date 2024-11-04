import classNames from 'classnames/bind';

import styles from './Profile.module.scss';
import config from 'config';
import Button from 'components/Button';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Avatar from 'components/Avatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

const genderList = ['Nam', 'Nữ', 'Khác'];

function Profile() {
    const [input, setInput] = useState({
        email: '',
        username: '',
        birthdate: '',
        gender: 0,
    });
    const [err, setErr] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (event) => {
        setInput((prev) => ({ ...prev, [event.target.name]: event.target.value }));
        if (err) setErr('');
    };

    const handleRatio = (event, value) => {
        event.preventDefault();
        setInput((prev) => ({ ...prev, gender: value }));
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
                        <Avatar alt="avatar" src="" size="ultra-lg" />
                        <button className={cx('upload-img-btn')}>
                            <FontAwesomeIcon icon={faCamera} />
                        </button>
                    </div>
                </div>
                <Button
                    className={cx('sign')}
                    type="rounded"
                    size="medium"
                    disabled={!!err || loading}
                    // onClick={handleSubmit}
                >
                    Lưu
                </Button>
            </div>
        </div>
    );
}

export default Profile;
