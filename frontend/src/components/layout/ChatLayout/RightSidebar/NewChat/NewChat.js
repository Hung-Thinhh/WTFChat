import classNames from "classnames/bind";
import styles from "./NewChat.module.scss";
import Button from "components/Button";
import Search from "../Footer/Search";
import ChatRoom from "../ChatRoomComponent";
import findUser from 'services/findUserService';
import useDebounce from 'hooks/useDebounce';
import { useState, useEffect, useCallback } from "react";
import Chip from "./Chip";
const cx = classNames.bind(styles);

const SearchComponent = ({ searchData, setSearchData, setFindData }) => {
    const handleSearchChange = async (e) => {
        const data = { text: e.target.value };
        if (!data.text) {
            setFindData([]);
            setSearchData('');
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

    return (
        <Search
            value={searchData}
            onChange={handleSearchChange}
            className={cx('search')}
            isMulti
        />
    );
};

const MemberList = ({ findData, handleClickMember, choosedMember }) => (
    <div className={cx('membercontainer')}>
        {findData &&
            findData.map((item) =>
                item.loai === 'nguoidung' && (
                    <ChatRoom
                        key={item.id}
                        onClick={(item) => handleClickMember(item)}
                        type="new"
                        id={item.id}
                        name={item.firstname + ' ' + item.lastname}
                        choosedMember={choosedMember}
                        avt={item.avatar}
                        friendId={item.id}
                    />
                )
            )}
    </div>
);

const ChoosedMemberList = ({ choosedMember, handleClickMember }) => {
    const getRandomLightColor = () => {
        const letters = 'BCDEF'; // Exclude 'A' to avoid darker colors
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * letters.length)];
        }
        return color;
    };

    return (
        <div className={cx('choosedmember')}>
            {choosedMember.map((item) => (
                <Chip
                    color={getRandomLightColor()}
                    key={item.id}
                    name={item.name}
                    handleDelete={(e) => handleClickMember({ ...item, checked: true })}
                />
            ))}
        </div>
    );
};

const ButtonGroup = ({ setActive, handleNewChat }) => (
    <div className={cx('btnGr')}>
        <Button onClick={() => setActive(false)}>Đóng</Button>
        <Button onClick={handleNewChat}>Lưu</Button>
    </div>
);

const NewChat = ({ active, setActive }) => {
    const [searchData, setSearchData] = useState('');
    const [findData, setFindData] = useState([]);
    const [choosedMember, setChoosedMember] = useState([]);

    const handleNewChat = () => {
        setActive(true);
        setChoosedMember([]);
        alert('Tạo phòng chat mới thành công');
    };

    const handleClickMember = useCallback(({ name, id, checked }) => {
        if (checked) {
            setChoosedMember((prev) => prev.filter(member => member.id !== id));
        } else {
            setChoosedMember((prev) => [...prev, { name, id }]);
        }
    }, []);

    useEffect(() => {
        console.log(choosedMember);
    }, [choosedMember]);

    return (
        <div className={cx('overlay', active ? 'active' : 'unActive')}>
            <div className={cx('container')}>
                <div className={cx('maincontainer')}>
                    <div className={cx('content')}>
                        <h3 className={cx('title')}>Tạo phòng chat mới</h3>
                        <SearchComponent
                            searchData={searchData}
                            setSearchData={setSearchData}
                            setFindData={setFindData}
                        />
                        <MemberList
                            findData={findData}
                            handleClickMember={handleClickMember}
                            choosedMember={choosedMember}
                        />
                    </div>
                    <ChoosedMemberList
                        choosedMember={choosedMember}
                        handleClickMember={handleClickMember}
                    />
                </div>
                <ButtonGroup
                    setActive={setActive}
                    handleNewChat={handleNewChat}
                />
            </div>
        </div>
    );
};

export default NewChat;