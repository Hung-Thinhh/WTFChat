import classNames from "classnames/bind";
import styles from "./NewChat.module.scss";
import Button from "components/Button";
import SearchComponent from "./SearchComponent";
import MemberList from "./MemberList";
import ChoosedMemberList from "./ChoosedMemberList";
import ButtonGroup from "./ButtonGroup";
import createChatRoom from 'services/createChatRoom';
import { useState, useEffect, useCallback, useRef } from "react";
const cx = classNames.bind(styles);

const NewChat = ({ callBack, active, setActive }) => {
    const [searchData, setSearchData] = useState('');
    const [findData, setFindData] = useState([]);
    const [choosedMember, setChoosedMember] = useState([]);
    const [step, setStep] = useState(1); // Step state to manage form steps
    const [chatRoomName, setChatRoomName] = useState(''); // State to store chat room name
    const refInput = useRef(null);
    useEffect(() => { refInput.current.focus() }, []);
    const handleNewChat = async () => {
        const data = await createChatRoom({ choosedMember, chatRoomName });
        if (data.EC !== 1) {
            alert(data.EM);
            return callBack(false);
        }
        setActive(false);
        setChoosedMember([]);
        setSearchData('');
        setFindData([]);
        setChatRoomName("");
        setActive(false);
        return callBack(true);
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
            <div className={cx('container', step == 1 && 'name')}>
                {step === 1 ? (
                    <div className={cx('initialForm')}>
                        <h3 className={cx('title')}>Nhập tên phòng chat</h3>
                        <input
                            ref={refInput}
                            type="text"
                            value={chatRoomName}
                            onChange={(e) => setChatRoomName(e.target.value)}
                            placeholder="Tên phòng chat"
                            className={cx('input')}
                        />
                        <div className={cx('btnGr')}>
                            <Button onClick={() => setActive(false)}>Hủy</Button>
                            <Button onClick={() => setStep(2)}>Tiếp theo</Button>
                        </div>
                    </div>
                ) : (
                    <div className={cx('maincontainer')}>
                        <div className={cx('content')}>
                            <h3 className={cx('title')}>Chọn thành viên</h3>
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
                )}
                {step === 2 && (
                    <ButtonGroup
                        setStep={setStep}
                        handleNewChat={handleNewChat}
                    />
                )}
            </div>
        </div>
    );
};

export default NewChat;