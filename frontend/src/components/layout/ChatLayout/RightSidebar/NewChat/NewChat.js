
import classNames from "classnames/bind";
import styles from "./NewChat.module.scss";
import Button from "components/Button";
import Search from "../Footer/Search";
import ChatRoom from "../ChatRoomComponent";
import findUser from 'services/findUserService';
import useDebounce from 'hooks/useDebounce';
import { useState, useEffect } from "react";
const cx = classNames.bind(styles);







const NewChat = ({ active, setActive }) => {
    const [searchData, setSearchData] = useState('');
    const [findData, setFindData] = useState([]);

    const handleNewChat = (e) => {
        setActive(true)
        alert('Tạo phòng chat mới thành công')
    };
    // Handle search change
    const handleSearchChange = async (e) => {
        const data = {
            text: e.target.value,
        };
        if (data.text === '' || data.text === null || data.text === undefined || !data.text) {
            setFindData([]);
            setSearchData(data.text);
        } else {
            setSearchData(data.text);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            if (!searchData) return;
            const res = await findUser({ text: searchData });
            setFindData(res.DT);
        };
        fetchData();
    }, [useDebounce(searchData, 500)]);

    useEffect(() => {
        const handleEnterKey = (event) => {
            if (event.key === 'Enter') {
                const fetchData = async () => {
                    if (!searchData) return;
                    const res = await findUser({ text: searchData });
                    setFindData(res.DT);
                };
                fetchData();
            }
        };

        window.addEventListener('keydown', handleEnterKey);
        return () => {
            window.removeEventListener('keydown', handleEnterKey);
        };
    }, [searchData]);

    return <div className={cx('overlay', active ? 'active' : 'unActive')}>
        <div className={cx('container')}>
            <h3 className={cx('title')}>Tạo phòng chat mới</h3>

            <div className={cx('content')}>
                <Search value={searchData}
                    onChange={handleSearchChange}
                    className={cx('search')} isMulti />
                <div className={cx('membercontainer')}>
                    {findData &&
                        findData.map((item) =>
                            item.loai === 'nguoidung' && (
                                <ChatRoom
                                    type="new"
                                    key={item.id}
                                    id={item.id}
                                    name={
                                        item.firstname + ' ' + item.lastname
                                    }
                                    avt={item.avatar}
                                    friendId={item.id}

                                />
                            )
                        )}
                </div>
            </div>

            <div className={cx('btnGr')}>
                <Button onClick={() => setActive(false)}>Đóng</Button>
                <Button onClick={handleNewChat}>Lưu</Button>
            </div>



        </div>
    </div>
};


export default NewChat;