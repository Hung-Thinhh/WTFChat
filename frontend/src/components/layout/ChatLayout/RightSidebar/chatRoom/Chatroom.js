import "./ChatRoom.scss";
import ChatDataContext from 'lib/Context/ChatContext';
import { useContext, useEffect } from 'react';
import classNames from 'classnames';

const ChatRoom = ({ id, avt, name, time, mess }) => {
    const { ChatData, setChatData } = useContext(ChatDataContext);
    const { setRoomInfo } = useContext(ChatDataContext);
    const handleClick = () => {
        setChatData(id);
        setRoomInfo({ id, avt, name });
    }
    return (
        <div
            className={classNames("main_container", { "active": ChatData === id })}
            key={id}
            onClick={handleClick}
        >
            <div className="CR_avt">
                <img src={avt} alt="avt" />
            </div>
            <div className="CR_info">
                <div className="CR_left">
                    <div className="CR_romname">
                        <h3>{name}</h3>
                    </div>
                    <div className="CR_mess">
                        <p>{mess}</p>
                    </div>
                </div>
                <div className="CR_right">
                    {time}
                </div>
            </div>
        </div>
    );
}

export default ChatRoom;