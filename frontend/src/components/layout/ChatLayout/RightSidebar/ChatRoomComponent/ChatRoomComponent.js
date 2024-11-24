import styles from "./ChatRoomComponent.module.scss";
import ChatDataContext from 'lib/Context/ChatContext';
import { useContext, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { setOffset } from '../../LeftSidebar/sidebarSlide';
import { useDispatch } from 'react-redux';
import { addFriendCtrl, delFriendCtrl } from "controller/FriendStuff";
import blockFriend from "services/blockFriend";
import Avatar from './Avatar';
import RoomInfo from './RoomInfo';
import FriendMenu from './FriendMenu';
import NewRoomCheckbox from './NewRoomCheckbox';

const cx = classNames.bind(styles);

export default function ChatRoom({ onClick = () => { }, choosedMember, id, avt, name, time, mess, sender, friendId, isFriend, isBlock, type = 'chatroom' }) {
    const { ChatData, setChatData } = useContext(ChatDataContext);
    const { setRoomInfo } = useContext(ChatDataContext);
    const dispatch = useDispatch();
    const [insFriend, setInsFriend] = useState(isFriend);
    const [isnBlock, setIsnBlock] = useState(isBlock);
    const [isChoose, setIsChoose] = useState(choosedMember?.some((item) => item.id === id));

    useEffect(() => { setIsChoose(choosedMember?.some((item) => item.id === id)) }, [choosedMember]);

    const handleClick = (e) => {
        if (type === 'new') {
            onClick({ id, name, checked: isChoose });
            setIsChoose(!isChoose);
            return;
        }
        
        dispatch(setOffset(0));
        setChatData(id);
        if (isBlock) return;
        setRoomInfo({ id, avt, name, friendId });
    };

    const handleAddFriend = (e) => {
        addFriendCtrl({ friendId });
        setInsFriend(true);
    }
    const handleDelFriend = (e) => {
        delFriendCtrl({ friendId });
        setInsFriend(false);
    }
    const handleBlockFriend = (e) => {
        blockFriend({ friendId, status: true });
        setIsnBlock(true);
    }
    const handleUnBlockFriend = (e) => {
        blockFriend({ friendId, status: false });
        setIsnBlock(false);
    }

    return (
        <div className={cx("main_container", { "active": ChatData === id })} key={id} onClick={handleClick}>
            <Avatar avt={avt} />
            <RoomInfo name={name} mess={mess} sender={sender} id={id} type={type} time={time} />
            {type === 'friend' && (
                <FriendMenu
                    isnBlock={isnBlock}
                    insFriend={insFriend}
                    handleUnBlockFriend={handleUnBlockFriend}
                    handleBlockFriend={handleBlockFriend}
                    handleAddFriend={handleAddFriend}
                    handleDelFriend={handleDelFriend}
                />
            )}
            {type === 'new' && (
                <NewRoomCheckbox isChoose={isChoose} id={id} />
            )}
        </div>
    );
}
