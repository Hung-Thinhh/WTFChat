import './ChatPage.scss';
import HeaderChatPage from './HeaderChatPage';
import MessageBubble from '../../card/MessageBubble';
import MessageInput from '../../card/MessageInput/MessageInput';
import React, { useContext, useEffect, useState, useRef } from 'react';
import ChatDataContext from 'lib/Context/ChatContext';
import getChat from 'services/getChat';
import { sendReport } from 'controller/report';
import { socket } from '../../../socket';
import Modal from 'react-modal';
import song from '../../../notify.mp3';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { currUserSelector, offsetSelector } from '../../../redux/selectors';
import { setOffset } from '../../layout/ChatLayout/LeftSidebar/sidebarSlide';
import { useDispatch, useSelector } from 'react-redux';
import { setNewMessage } from '../../../components/layout/ChatLayout/LeftSidebar/sidebarSlide';
Modal.setAppElement('#root');

const ChatPage = () => {
    const { ChatData, RoomInfo, setRoomInfo } = useContext(ChatDataContext);
    const notify = useSelector((state) => state.notify.notify.data);
    const [curChatData, setCurChatData] = useState([]);
    const [isSending, setIsSending] = useState(false);
    const [isReply, setIsReply] = useState('');
    const [room, setRoom] = useState('');
    const [report, setReport] = useState('');
    const [tempId, setTempId] = useState(null);
    const chatWindowRef = useRef(null);
    // const [offset, setOffset] = useState(0);
    const [audio] = useState(new Audio(song));
    const [modalIsOpen, setIsOpen] = useState(false);

    const dispatch = useDispatch();
    const state = useSelector(offsetSelector);
    const currUser = useSelector(currUserSelector);








    const fetchNewMessages = async () => {
        try {
            const response = await getChat({
                userId: currUser.id,
                roomId: ChatData,
                offset: state,
            });

            if (response && response.EC === 0) {
                socket.emit('join_room', ChatData);
                setRoom(ChatData);
                let data = response.DT;
                data.forEach((item) => {
                    if (item.traloi !== null) {
                        const replyMessage = data.find((msg) => msg.id === item.traloi);
                        if (replyMessage) {
                            item.traloi = replyMessage;
                        }
                    }
                });
                setCurChatData(data);
                dispatch(setOffset(state + 50));
            }
        } catch (error) {
            console.error('Error fetching new messages:', error);
        }
    };

    const lazyLoad = async () => {
        try {
            const response = await getChat({
                userId: currUser.id,
                roomId: ChatData,
                offset: state,
            });
            if (response && response.EC === 0) {
                let data = response.DT;
                data.forEach((item) => {
                    if (item.traloi !== null) {
                        const replyMessage = data.find((msg) => msg.id === item.traloi);
                        if (replyMessage) {
                            item.traloi = replyMessage;
                        }
                    }
                });
                setCurChatData((previous) => {
                    const newData = [...previous];
                    data.forEach((item) => {
                        if (!previous.some((msg) => msg.id === item.id)) {
                            newData.push(item);
                        }
                    });
                    newData.sort((a, b) => new Date(a.time) - new Date(b.time));
                    return newData;
                });
                dispatch(setOffset(state + 50));
            }
        } catch (error) {
            console.error('Error fetching new messages:', error);
        }
    };

    const handleDataReply = (data) => {
        setIsReply(data);
    };

    const handleReport = (data) => {
        const newData = { ...data, userId: currUser.id };
        setReport(newData);
        openModal();
    };

    const handleSendReport = async () => {
        const response = await sendReport(report);
        if (response && response.EC === 0) {
            closeModal();
            setReport('');
        }
    };

    const handleSetData = (message) => {
        if (isSending) return;
        setIsSending(true);

        const temp = Date.now();
        setTempId(temp);
        const messageData = {
            id: temp,
            content: message.content,
            senderid: currUser.id,
            roomid: ChatData,
            image: message.image,
            time: new Date().toISOString(),
            status: 'sending',
            traloi: isReply ? isReply.id : null,
        };

        setCurChatData((prevMessages) => [...prevMessages, messageData]);

        try {
            socket.emit('send_mess', messageData);
            setIsSending(false);
        } catch (error) {
            console.error('Error sending message:', error);
            setIsSending(false);
        }
    };

    useEffect(() => {
        if (RoomInfo) {
            fetchNewMessages();
        }
    }, [RoomInfo]);

    useEffect(() => {

        const handleNewChat = (data) => {
            const notification = notify.find((item) => item.idRoom === data.roomid);
            if (notification && notification.notify === 1) {
                audio.play();
            }
            setCurChatData((prevMessages) => {
                dispatch(setNewMessage(data));
                if (data.traloi) {
                    const replyMessage = prevMessages.find((msg) => msg.id === data.traloi);
                    if (replyMessage) {
                        data.traloi = replyMessage;
                    }
                }

                const index = prevMessages.findIndex((msg) => {
                    scrollToMessage(`message${data.id}`);
                    return msg.id === tempId 
                });

                if (index !== -1) {
                    const updatedMessages = [...prevMessages];
                    updatedMessages[index] = { ...updatedMessages[index], ...data, status: 'done' };
                    setTempId(null);
                    return updatedMessages;
                } else {
                    const index = prevMessages.findIndex((msg) => msg.id === data.id);
                    if (index !== -1) {
                        return prevMessages;
                    } else {
                        return [...prevMessages, { ...data, status: 'done' }];
                    }
                }
            });
        };

        socket.on('new_chat', handleNewChat);

        return () => {
            socket.off('new_chat', handleNewChat);
        };
    }, [ChatData, tempId]);

    useEffect(() => {
        const handleScroll = () => {
            if (chatWindowRef.current && chatWindowRef.current.scrollTop === 0) {
                lazyLoad();
            }
        };
        const chatWindow = chatWindowRef.current;
        if (chatWindow) {
            chatWindow.addEventListener('scroll', handleScroll);
        }
        return () => {
            if (chatWindow) {
                chatWindow.removeEventListener('scroll', handleScroll);
            }
        };
    }, [state]);

    useEffect(() => {
        if (chatWindowRef.current && state <= 50) {
            chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
        }
    }, [curChatData]);

    const scrollToMessage = (id) => {
        const messageElement = document.getElementById(`message${id}`);
        if (messageElement && chatWindowRef.current) {
            const chatWindowHeight = chatWindowRef.current.clientHeight;
            const messageElementOffset = messageElement.offsetTop;
            chatWindowRef.current.scrollTop =
                messageElementOffset - chatWindowHeight / 2 + messageElement.clientHeight / 2 - 50;
        }
    };

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    useEffect(() => {
        socket.on('delete_res', (data) => {
            setCurChatData((prevMessages) => {
                const index = prevMessages.findIndex((msg) => msg.id === data.delete_mess.id);
                if (index !== -1) {
                    const updatedMessages = [...prevMessages];
                    updatedMessages.splice(index, 1);
                    return updatedMessages;
                }
                return prevMessages;
            });
        });

        return () => {
            socket.off('delete_res'); // Hủy đăng ký sự kiện khi component unmount
        };
    }, []);
    // socket.on('muted', (data) => {
    //    console.log(data);
    // })

    useEffect(() => {
        socket.on('return_res', (data) => {
            setCurChatData((prevMessages) => {
                return prevMessages.reduce((acc, msg) => {
                    if (msg.id > data.delete_mess.id) {
                        // Kiểm tra xem `data.delete_mess` đã có trong `acc` chưa
                        if (!acc.some((item) => item.id === data.delete_mess.id)) {
                            return [...acc, data.delete_mess, msg];
                        } else {
                            return [...acc, msg];
                        }
                    } else {
                        return [...acc, msg];
                    }
                }, []); // Khởi tạo mảng rỗng cho `acc`
            });
        });

        return () => {
            socket.off('return_res'); // Hủy đăng ký sự kiện khi component unmount
        };
    }, []);
    if (!currUser) return null;

    return (
        <>
            {RoomInfo ? (
                <div className="chatPage_container">
                    <HeaderChatPage RoomInfo={RoomInfo} />
                    <div className="ChatWindow" ref={chatWindowRef}>
                        {curChatData.length > 0 ? (
                            curChatData.map((item, index) => (
                                <MessageBubble
                                    key={index}
                                    id={item.id}
                                    data={{
                                        id: item.id,
                                        img: item.image ? item.image : '',
                                        avt: item.avt,
                                        content: item.content,
                                        time: item.time,
                                        user: item.senderid !== currUser.id ? 'other' : 'me',
                                        status: item.status ? item.status : 'done',
                                        sender: item.senderName,
                                        traloi: item.traloi ? item.traloi : null,
                                    }}
                                    onReply={handleDataReply}
                                    reportting={handleReport}
                                />
                            ))
                        ) : (
                            <h1>CHƯA CÓ TIN NHẮN NÀO</h1>
                        )}
                    </div>
                    <MessageInput
                        value={handleSetData}
                        isReply={isReply}
                        onReply={handleDataReply}
                    />
                    <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={closeModal}
                        contentLabel="Example Modal"
                        style={{
                            overlay: {
                                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                zIndex: 1000,
                            },
                            content: {
                                top: '50%',
                                left: '50%',
                                right: 'auto',
                                bottom: 'auto',
                                marginRight: '-50%',
                                transform: 'translate(-50%, -50%)',
                                backgroundColor: '#212121',
                                padding: '20px',
                                border: '1px solid #ccc',
                                borderRadius: '5px',
                            },
                        }}
                    >
                        <div>Bạn có chắc chắc muốn báo cáo tin nhắn này không?</div>
                        <div className="btn_modal">
                            <span onClick={closeModal}>Huỷ</span>
                            <span onClick={handleSendReport}>Xác nhận</span>
                        </div>
                    </Modal>

                    {chatWindowRef.current &&
                        chatWindowRef.current.scrollHeight - chatWindowRef.current.scrollTop !==
                            chatWindowRef.current.clientHeight && (
                            <button
                                className="go-down"
                                onClick={() => {
                                    if (chatWindowRef.current) {
                                        chatWindowRef.current.scrollTop =
                                            chatWindowRef.current.scrollHeight;
                                    }
                                }}
                            >
                                <FontAwesomeIcon icon={faChevronDown} />
                            </button>
                        )}
                </div>
            ) : (
                <h1>CHỌN MỘT CUỘC TRÒ TRUYỆN ĐỂ BẮT ĐẦU</h1>
            )}
        </>
    );
};

export default ChatPage;
