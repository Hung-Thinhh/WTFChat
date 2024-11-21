import './ChatRoomComponent.scss';
import ChatDataContext from 'lib/Context/ChatContext';
import { useContext } from 'react';
import classNames from 'classnames';
import { setOffset } from '../../LeftSidebar/sidebarSlide';
import { useDispatch } from 'react-redux';

export default function ChatRoom({ id, avt, name, time, mess, sender, friendId }) {
    const { ChatData, setChatData } = useContext(ChatDataContext);
    const { setRoomInfo } = useContext(ChatDataContext);
    const dispatch = useDispatch();
    const handleClick = () => {
        dispatch(setOffset(0));
        setChatData(id);
        setRoomInfo({ id, avt, name, friendId });
    };
    return (
        <div
            className={classNames('main_container', { active: ChatData === id })}
            key={id}
            onClick={handleClick}
        >
            <div className="CR_avt">
                <img
                    src={
                        avt && avt !== '/'
                            ? avt
                            : 'https://static3.bigstockphoto.com/9/1/3/large1500/31903202.jpg'
                    }
                    alt="avt"
                />
            </div>
            <div className="CR_info">
                <div className="CR_left">
                    <div className="CR_room_name">
                        <h3>{name}</h3>
                    </div>
                    <div className="CR_mess">
                        {sender && <span className="Sender">{sender}:</span>}
                        {mess && <span className="content">{mess}</span>}
                    </div>
                </div>
                <div className="CR_right">{time}</div>
            </div>
        </div>
    );
}
