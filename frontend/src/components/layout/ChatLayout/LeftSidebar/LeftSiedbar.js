import { faX } from "@fortawesome/free-solid-svg-icons";
import "./LeftSidebar.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import getRoomInfoService from 'services/getRoomInfoService';
import { useContext, useEffect, useRef, useState } from 'react';
import ChatDataContext from 'lib/Context/ChatContext';
import { showMenuSelector, chatRoomListSelector } from '../../../../redux/selectors';
import { setChatRooms } from '../../../../redux/chatRoomSlice';

import { setShowMenu } from './sidebarSlide';
import { useDispatch, useSelector } from 'react-redux';
import { faPenToSquare, faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import Button from "components/Button";
import { changeInfoGrAvt, changeInfoGrName } from "services/changeInfoGr";

const LeftSiedbar = () => {
    const { RoomInfo, setRoomInfo, ChatData } = useContext(ChatDataContext);
    const state = useSelector(showMenuSelector);
    const [currroomInfo, setCurrroomInfo] = useState([]);
    const [inputName, setInputName] = useState(RoomInfo.name);
    const [avtlink, setAvtLink] = useState(RoomInfo.avt);
    const [setEdit, setSetEdit] = useState(false);
    const inputRef = useRef();
    const chatRoom = useSelector(chatRoomListSelector);

    const dispatch = useDispatch();
    useEffect(() => {
        setAvtLink(RoomInfo.avt);
        setInputName(RoomInfo.name);
        setSetEdit(false);


    }, [RoomInfo])
    useEffect(() => {
        const fetchInfo = async () => {
            const data = await getRoomInfoService({ roomId: ChatData });
            // console.log('xxx', data);

            setCurrroomInfo(data.DT);
        }
        if (ChatData) {
            fetchInfo();
        }
    }, [ChatData])

    return (
        <div className={`leftSidebar ${state ? 'hide' : 'show'}`}>
            <div className="btn_ctn" onClick={() => dispatch(setShowMenu(!state))}>
                <FontAwesomeIcon icon={faX} className="load_icon" />
            </div>
            <div className="head">
                <label htmlFor="upload-input" className="avt_ctn">
                    <img src={avtlink ? avtlink : "https://static3.bigstockphoto.com/9/1/3/large1500/31903202.jpg"} alt="avt" />
                    <div className="upload_ctn">
                        <input
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            id="upload-input"
                            ref={inputRef}
                            onChange={async (e) => {

                                const file = e.target.files[0];
                                if (file) {
                                    const reader = new FileReader();
                                    reader.onloadend = () => {
                                        setRoomInfo(prevState => ({
                                            ...prevState,
                                            avt: reader.result
                                        }));


                                        dispatch(setChatRooms(chatRoom.map(room =>
                                            room.id === RoomInfo.id ? { ...room, avt: reader.result } : room)));



                                    };

                                    reader.readAsDataURL(file);
                                    const formData = new FormData();
                                    formData.append('avatar', file);
                                    formData.append('id', RoomInfo.id);
                                    await changeInfoGrAvt(formData);

                                }
                            }}
                        />
                    </div>
                </label>
                <div className="mail">@{RoomInfo.id}</div>
                <div className="nameEditor">
                    <input style={{ color: setEdit ? "gray" : "white" }} className="name" value={inputName} onChange={(e) => setInputName(e.target.value)} readOnly={!setEdit} />
                    <Button onClick={async () => {
                        setSetEdit(!setEdit)
                        if (setEdit) {
                            setRoomInfo(prevState => ({
                                ...prevState,
                                name: inputName
                            }));

                            dispatch(setChatRooms(chatRoom.map(room =>
                                room.id === RoomInfo.id ? { ...room, groupName: inputName } : room)));
                            const data = await changeInfoGrName({ name: inputName, id: RoomInfo.id });
                        }
                    }}
                        type={"text"} onlyIcon={true}
                        leftIcon={<FontAwesomeIcon icon={setEdit ? faFloppyDisk : faPenToSquare} />}
                        className="btn"></Button>
                </div>

            </div>
            <div className="media">
                {currroomInfo && currroomInfo.map((item, index) => (
                    <div className="img_ctn" key={index}>
                        <img src={item.image || "https://static3.bigstockphoto.com/9/1/3/large1500/31903202.jpg"} alt="img" />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default LeftSiedbar;