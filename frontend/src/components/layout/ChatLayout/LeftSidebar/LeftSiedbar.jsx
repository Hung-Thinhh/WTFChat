import { faX } from "@fortawesome/free-solid-svg-icons";
import "./LeftSidebar.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { showMenuSelector } from '../../../../redux/selectors';
import { setShowMenu } from './sidebarSlide';
import { useDispatch, useSelector } from 'react-redux';
import getRoomInfoService from 'services/getRoomInfoService';
import { useContext, useEffect, useState } from 'react';
import ChatDataContext from 'lib/Context/ChatContext';

const LeftSiedbar = () => {
    const { ChatData } = useContext(ChatDataContext);
    const { RoomInfo } = useContext(ChatDataContext);
    const [roomInfo, setRoomInfo] = useState(null);    
    const state = useSelector(showMenuSelector);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setShowMenu(true));
    }, [])
    useEffect(() => {
        const fetchInfo = async () => {
            const data = await getRoomInfoService({ roomId: ChatData });
            setRoomInfo(data.DT);
        }
        if (ChatData) {
          fetchInfo();
        }
    }, [ChatData])
    useEffect(() => {
        console.log(roomInfo);
        console.log('roomInfo', RoomInfo);
    }, [roomInfo])
    
    return (
        <div className={`leftSidebar ${state ? 'hide' : 'show'}`}>
            <div className="btn_ctn" onClick={() => dispatch(setShowMenu(!state))}>
                <FontAwesomeIcon icon={faX} className="load_icon" />
            </div>
            <div className="head">
                <div className="avt_ctn">
                    <img src={RoomInfo.avt ? RoomInfo.avt : "https://static3.bigstockphoto.com/9/1/3/large1500/31903202.jpg"} alt="avt" />
                </div>
                <div className="mail">ng@gmail.com</div>
                <div className="name">{RoomInfo.name}</div>
            </div>
            <div className="media">
                {roomInfo && roomInfo.map((item, index) => (
                    <div className="img_ctn" key={index}>
                        <img src={item.image} alt="img" />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default LeftSiedbar;