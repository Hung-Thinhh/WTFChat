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
import createChatRoom from "services/createChatRoom";
import { socket } from "socket";
const cx = classNames.bind(styles);

export default function ChatRoom({ onClick = () => { }, choosedMember, chattype, id, avt, name, time, mess, sender, friendId, isFriend, isBlock, type = 'chatroom' }) {
    const { ChatData, setChatData } = useContext(ChatDataContext);
    const { setRoomInfo } = useContext(ChatDataContext);
    const dispatch = useDispatch();
    const [insFriend, setInsFriend] = useState(isFriend);
    const [isnBlock, setIsnBlock] = useState(isBlock);
    const [isChoose, setIsChoose] = useState(choosedMember?.some((item) => item.id === id));
    useEffect(() => { setIsChoose(choosedMember?.some((item) => item.id === id)) }, [choosedMember]);
    let offChat = false;
    const handleClick = async (e) => {
        if (type === 'new') {
            onClick({ id, name, checked: isChoose });
            setIsChoose(!isChoose);
            return;
        }
        if (type === "friend") {
            const data = await createChatRoom({ choosedMember: [id], type: 'private' });
            socket.emit('newRoomAdded', data);
            if (data.EC !== 1) {
                alert(data.EM);
                return;
            }
        }
        dispatch(setOffset(0));
        setChatData(id);
        if (offChat || isnBlock) {
            setRoomInfo("");
            return;
        }
        setRoomInfo({ id, avt, name, friendId, type: chattype });
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
        offChat = true;

    }
    const handleUnBlockFriend = (e) => {
        blockFriend({ friendId, status: false });
        setIsnBlock(false);
        offChat = false;

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
